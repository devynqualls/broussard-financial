import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { sanitizeFormField } from '../../utils/sanitize';
import { measure } from '../../utils/measurement';
import styles from './AppointmentRequest.module.css';

const pad = (value: number) => String(value).padStart(2, '0');
const localDay = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const subscribeToDate = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
};
const getToday = () => localDay(new Date());
const getServerToday = () => '';
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function monthFor(today: string, offset: number) {
  const [year, month] = today.split('-').map(Number);
  return new Date(year, month - 1 + offset, 1);
}

export default function AppointmentRequest() {
  const today = useSyncExternalStore(subscribeToDate, getToday, getServerToday);
  const [monthOffset, setMonthOffset] = useState(0);
  const [preferredDate, setPreferredDate] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const month = today ? monthFor(today, monthOffset) : null;
  const monthLabel = month?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const leadingDays = month?.getDay() ?? 0;
  const daysInMonth = month ? new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() : 0;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const preferredTime = String(values.get('preferredTime') ?? '');
    if (!today || !preferredDate || preferredDate < today || !preferredTime) {
      setError('Choose a future date and a preferred time.');
      return;
    }
    const firstName = sanitizeFormField(String(values.get('firstName') ?? ''), 50);
    const lastName = sanitizeFormField(String(values.get('lastName') ?? ''), 50);
    const email = String(values.get('email') ?? '').trim();
    const phone = String(values.get('phone') ?? '').trim();
    if (!firstName || !lastName || !isValidPhoneNumber(phone, 'US')) {
      setError('Enter your name and a valid phone number so we can confirm your request.');
      return;
    }
    if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      setError('This preview does not send requests. The form will work on the hosted site after deployment.');
      return;
    }
    setStatus('sending');
    try {
      try {
        const verify = await fetch('/.netlify/functions/verify-lead', {
          method: 'POST',
          signal: AbortSignal.timeout(10_000),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, phone }),
        });
        if (verify.status === 422) {
          setError('Please check your email address and phone number, then try again.');
          setStatus('idle');
          return;
        }
      } catch {
        // Keep the request available if lead verification is temporarily down.
      }

      const appointmentDay = new Date(`${preferredDate}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      });
      const topic = sanitizeFormField(String(values.get('interest') ?? 'General consultation'), 80);
      const format = sanitizeFormField(String(values.get('format') ?? 'Phone call'), 40);
      const zone = sanitizeFormField(String(values.get('timeZone') ?? 'Pacific Time'), 60);
      const notes = sanitizeFormField(String(values.get('notes') ?? ''), 800);
      const body = new URLSearchParams({
        'form-name': 'contact',
        firstName,
        lastName,
        email,
        phone,
        topic: `Appointment request: ${topic}`,
        message: `CONSULTATION REQUEST — NOT YET CONFIRMED\nPreferred: ${appointmentDay} at ${preferredTime} (${zone})\nMeeting format: ${format}\nInterest: ${topic}${notes ? `\nNotes: ${notes}` : ''}\nPlease assign an available consultant and confirm the appointment with the client.`,
        honeypot: String(values.get('honeypot') ?? ''),
      });
      const response = await fetch('/__forms.html', {
        method: 'POST',
        signal: AbortSignal.timeout(15_000),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('sent');
      measure('inquiry_success');
    } catch {
      setError('We could not send your request. Please call (619) 581-0010 or email info@broussardfinancialservices.com.');
      setStatus('idle');
    }
  }

  if (status === 'sent') return <div className={styles.success} role="status">
    <h2>We received your request.</h2>
    <p>Your appointment is not confirmed yet. Our team will review advisor availability and contact you to confirm the date, time, and consultant.</p>
  </div>;

  return <form className={styles.wrap} name="contact" method="POST" data-netlify="true" data-netlify-honeypot="honeypot" onSubmit={submit} aria-label="Consultation request form">
    <input type="hidden" name="form-name" value="contact" />
    <input type="text" name="honeypot" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className={styles.calendar} aria-label="Choose a preferred date">
      <div className={styles.calendarTop}>
        <div><span className={styles.step}>01 / Preferred day</span><h2>Choose any date</h2></div>
        {month && <div className={styles.monthControls}>
          <button type="button" onClick={() => setMonthOffset(value => Math.max(0, value - 1))} disabled={monthOffset === 0} aria-label="Previous month">‹</button>
          <strong aria-live="polite">{monthLabel}</strong>
          <button type="button" onClick={() => setMonthOffset(value => value + 1)} aria-label="Next month">›</button>
        </div>}
      </div>
      {month ? <div className={styles.grid}>
        {days.map(day => <span className={styles.weekday} key={day}>{day}</span>)}
        {Array.from({ length: leadingDays }, (_, index) => <span aria-hidden="true" key={`blank-${index}`} />)}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
          const dateKey = localDay(date);
          return <button key={dateKey} type="button" className={`${styles.day} ${preferredDate === dateKey ? styles.selected : ''}`} disabled={dateKey < today} aria-pressed={preferredDate === dateKey} aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} onClick={() => { setPreferredDate(dateKey); setError(''); }}>{index + 1}</button>;
        })}
      </div> : <p>Loading calendar…</p>}
      <p className={styles.calendarNote}>Every future day is open for requests. Your preferred time is subject to advisor availability and confirmation.</p>
    </div>
    <div className={styles.details}>
      <span className={styles.step}>02 / Your request</span>
      <h2>Tell us what works for you</h2>
      <p className={styles.selectedDate}>{preferredDate ? new Date(`${preferredDate}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a day on the calendar'}</p>
      <div className={styles.row}>
        <label>Preferred time<input type="time" name="preferredTime" required /></label>
        <label>Time zone<select name="timeZone" defaultValue="Pacific Time"><option>Pacific Time</option><option>Mountain Time</option><option>Central Time</option><option>Eastern Time</option><option>Alaska Time</option><option>Hawaii Time</option><option>Other (explain in notes)</option></select></label>
      </div>
      <label>Meeting format<select name="format" defaultValue="Phone call"><option>Phone call</option><option>Video call</option><option>In person in San Diego</option></select></label>
      <div className={styles.row}>
        <label>First name<input name="firstName" autoComplete="given-name" maxLength={50} required /></label>
        <label>Last name<input name="lastName" autoComplete="family-name" maxLength={50} required /></label>
      </div>
      <div className={styles.row}>
        <label>Email<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
        <label>Phone<input type="tel" name="phone" autoComplete="tel" maxLength={40} required /></label>
      </div>
      <label>What would you like to discuss?<select name="interest" defaultValue="General consultation"><option>General consultation</option><option>Federal retirement and TSP</option><option>Retirement income and annuities</option><option>Estate planning and trusts</option><option>Life insurance</option><option>Real estate</option><option>Other</option></select></label>
      <label>Other times or details (optional)<textarea name="notes" rows={3} maxLength={800} placeholder="Share another time that could work. Please do not include account numbers or sensitive financial information." /></label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.submit} type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending request…' : 'Request a consultation'}</button>
      <p className={styles.disclaimer}>Submitting a request does not book an appointment. We’ll contact you to confirm the time and assign an available consultant. The initial 30-minute consultation is free.</p>
    </div>
  </form>;
}
