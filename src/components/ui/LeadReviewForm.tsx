import { useState, type FormEvent } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { leadAttributionFields } from '../../utils/leadAttribution';
import { measure } from '../../utils/measurement';
import { sanitizeFormField } from '../../utils/sanitize';
import './LeadReviewForm.css';

type ReviewTopic = 'Federal retirement review' | 'Retirement income review' | 'Trust and estate review';

const copy: Record<ReviewTopic, { title: string; detail: string; button: string }> = {
  'Federal retirement review': {
    title: 'Request a free federal retirement review',
    detail: 'Bring your questions about FERS, TSP, Social Security, and survivor choices. We will contact you to arrange a time with a consultant.',
    button: 'Request my federal review',
  },
  'Retirement income review': {
    title: 'Request a free retirement income review',
    detail: 'Discuss your income needs and any annuity you already own. We will contact you to arrange a time with a consultant.',
    button: 'Request my income review',
  },
  'Trust and estate review': {
    title: 'Request a free trust review',
    detail: 'Discuss your current trust, trust accounts, updates, or new trust questions. We will contact you to arrange a time with a consultant.',
    button: 'Request my trust review',
  },
};

export default function LeadReviewForm({ topic }: { topic: ReviewTopic }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const content = copy[topic];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || status === 'sending') return;
    const data = new FormData(form);
    if (data.get('honeypot')) return;
    const firstName = sanitizeFormField(String(data.get('firstName') || ''), 50);
    const lastName = sanitizeFormField(String(data.get('lastName') || ''), 50);
    const email = String(data.get('email') || '').trim().slice(0, 254);
    const phone = String(data.get('phone') || '').trim().slice(0, 40);
    if (!firstName || !lastName || !isValidPhoneNumber(phone, 'US')) {
      setError('Enter your name and a valid phone number so we can follow up.');
      return;
    }
    if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      setError('The preview does not send requests. Please use the hosted website to submit.');
      return;
    }
    setStatus('sending');
    setError('');
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
        // A temporary verification outage should not prevent a real inquiry.
      }
      const details = sanitizeFormField(String(data.get('question') || ''), 400);
      const body = new URLSearchParams({
        'form-name': 'contact', firstName, lastName, email, phone,
        topic,
        message: `${topic.toUpperCase()} REQUEST\nQuestion: ${details || 'No question supplied.'}\nPlease contact the visitor to arrange a free consultation. No appointment has been confirmed.`,
        honeypot: '',
        inquiryPage: window.location.pathname,
        marketingConsent: data.get('marketingConsent') === 'yes' ? 'Yes - email me Broussard educational updates' : 'No',
      });
      for (const [key, value] of leadAttributionFields()) body.set(key, value);
      const response = await fetch('/__forms.html', {
        method: 'POST',
        signal: AbortSignal.timeout(15_000),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      setStatus('sent');
      measure('generate_lead');
    } catch {
      setError('We could not save your request. Call (619) 581-0010 or email info@broussardfinancialservices.com.');
      setStatus('idle');
    }
  }

  return <section className="lead-review" aria-label={content.title}>
    <h2>{content.title}</h2>
    <p>{content.detail}</p>
    {status === 'sent' ? <p role="status" className="lead-review-success">We received your request. We will contact you to arrange a time; no appointment is confirmed yet.</p> :
      <form name="contact" method="POST" onSubmit={submit}>
        <input type="hidden" name="form-name" value="contact" />
        <input name="honeypot" className="lead-review-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="lead-review-fields">
          <label>First name<input name="firstName" autoComplete="given-name" required maxLength={50} /></label>
          <label>Last name<input name="lastName" autoComplete="family-name" required maxLength={50} /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
        </div>
        <label>What would you like to discuss? (optional)<textarea name="question" maxLength={400} rows={2} placeholder="A brief question is enough. Please do not include account numbers or sensitive details." /></label>
        <label className="lead-review-consent"><input type="checkbox" name="marketingConsent" value="yes" />Email me occasional Broussard educational updates. I can unsubscribe at any time.</label>
        <p className="lead-review-note">We will use your contact details to respond to this request. Checking the box is optional and is not required for a review. We will not send text-message marketing. <a href="/privacy">Website privacy notice</a>.</p>
        {error && <p role="alert" className="lead-review-error">{error}</p>}
        <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : content.button}</button>
      </form>}
  </section>;
}
