import {measure} from '../../../utils/measurement';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import styles from './Contact.module.css';
import { sanitizeFormField } from '../../../utils/sanitize';
import CalendlyEmbed from './CalendlyEmbed';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().trim().max(254).email('Please enter a valid email address'),
  phone: z
    .string()
    .trim().max(40)
    .min(1, 'Phone number is required')
    .refine((v) => isValidPhoneNumber(v, 'US'), 'Please enter a valid phone number'),
  topic: z.string(),
  message: z.string().min(10, 'Please tell us a bit about your situation').max(2000),
  honeypot: z.string().max(0, 'Bot detected'),
});

type ContactFields = z.infer<typeof contactSchema>;

const topics = [
  'Retirement Income Planning',
  'Tax Planning & Reduction',
  'Social Security Planning',
  'TSP / Federal Benefits',
  'Free Trust / Trust Account Review',
  'Trust Updates / New Trust Setup',
  'Existing Annuity Review',
  'New Annuity / Income Planning',
  'Legacy Planning',
  'Life Insurance',
  'Real Estate — Buying a Home',
  'Real Estate — Selling a Property',
  'Real Estate — Investment Properties',
  'LTC Planning',
  'General Consultation',
  'Upcoming Seminar',
];

const contactDetails = [
  { label: 'Office Address', value: '1420 Kettner Blvd, Suite 321\nSan Diego, CA 92101' },
  { label: 'Phone', value: '(619) 581-0010' },
  { label: 'Office Hours', value: 'Monday – Friday: 9:00 AM – 5:00 PM PT\nSaturday & Sunday: Closed\nAppointments outside office hours require prior approval.' },
  { label: 'Serving', value: 'Clients nationwide\nIn-person & virtual consultations available' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: topics[0], honeypot: '' },
  });

  const onSubmit = async (data: ContactFields) => {
    setSubmitError(null);
    if (['localhost','127.0.0.1'].includes(window.location.hostname)) {
      setSubmitError('This preview does not send messages. Please use the live website or call (619) 581-0010.');
      return;
    }
    try {
      // Server-side gate: confirm the email domain can receive mail and the
      // phone is a real number before recording the lead. A 422 means one of
      // them is definitively invalid; any other failure fails open so a
      // function/network hiccup never blocks a genuine submission.
      try {
        const verify = await fetch('/.netlify/functions/verify-lead', {
          method: 'POST',
          signal: AbortSignal.timeout(10000),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, phone: data.phone }),
        });
        if (verify.status === 422) {
          const { errors: fieldErrors } = (await verify.json()) as {
            errors?: { email?: string; phone?: string };
          };
          if (fieldErrors?.email) setError('email', { message: fieldErrors.email });
          if (fieldErrors?.phone) setError('phone', { message: fieldErrors.phone });
          return;
        }
      } catch (verifyErr) {
        console.warn('Lead verification unavailable, submitting anyway:', verifyErr);
      }

      const body = new URLSearchParams();
      body.append('form-name', 'contact');
      body.append('firstName', data.firstName);
      body.append('lastName', data.lastName);
      body.append('email', data.email);
      body.append('phone', data.phone);
      body.append('topic', data.topic);
      body.append('message', data.message);
      body.append('honeypot', '');

      const res = await fetch('/', {
        method: 'POST',
        signal: AbortSignal.timeout(15000),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) {
        throw new Error(`Submit failed: ${res.status}`);
      }

      setSubmitted(true);
      measure('inquiry_success');
    } catch (err) {
      console.error(err);
      setSubmitError(
        'Sorry — something went wrong sending your message. Please email us directly at rene@broussardfinancialservices.com or call (619) 581-0010.'
      );
    }
  };

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
      <div className="consultation-explainer"><h2>Your free consultation</h2><p>Bring your questions. No document upload is needed to book.</p></div>
      <CalendlyEmbed />

      <div className={styles.divider} aria-hidden="true">
        <span>or send us a message</span>
      </div>

      <div className={styles.grid}>
      <div className={styles.left}>
        <div className={styles.kicker}>Get in Touch</div>
        <h2 className={styles.leftTitle} id="contact-heading">
          Let's start a conversation about your financial future
        </h2>
        <div className={styles.details}>
          {contactDetails.map((item) => (
            <div key={item.label} className={styles.detailItem}>
              <div className={styles.detailLabel}>{item.label}</div>
              <div className={styles.detailVal}>
                {item.value.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < item.value.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <h3 className={styles.formTitle}>Send us a message</h3>
        <p className={styles.formSub}>
          Fill out the form below and we'll get back to you within one business day. Please do not include account numbers, Social Security numbers, or sensitive financial documents.
        </p>

        {submitted ? (
          <div className={styles.success} role="status">
            Thank you! We'll be in touch within one business day. If you need to reach us
            sooner, email <a href="mailto:rene@broussardfinancialservices.com">rene@broussardfinancialservices.com</a> or call (619) 581-0010.
          </div>
        ) : (
          <form
            className={styles.form}
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="honeypot"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Contact form"
          >
            <input type="hidden" name="form-name" value="contact" />

            {/* Honeypot — hidden from real users, bots fill it in */}
            <input
              type="text"
              tabIndex={-1}
              aria-hidden="true"
              className={styles.honeypot}
              {...register('honeypot')}
              autoComplete="off"
            />

            {submitError && (
              <div className={styles.submitError} role="alert">
                {submitError}
              </div>
            )}

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  placeholder="First name"
                  autoComplete="given-name"
                  maxLength={50}
                  {...register('firstName', { setValueAs: (v) => sanitizeFormField(v) })}
                />
                {errors.firstName && <span id="firstName-error" role="alert" className={styles.error}>{errors.firstName.message}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  placeholder="Last name"
                  autoComplete="family-name"
                  maxLength={50}
                  {...register('lastName', { setValueAs: (v) => sanitizeFormField(v) })}
                />
                {errors.lastName && <span id="lastName-error" role="alert" className={styles.error}>{errors.lastName.message}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="your@email.com"
                autoComplete="email"
                {...register('email')}
              />
              {errors.email && <span id="email-error" role="alert" className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="(619) 000-0000"
                autoComplete="tel"
                {...register('phone')}
              />
              {errors.phone && <span id="phone-error" role="alert" className={styles.error}>{errors.phone.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="topic">I'm interested in…</label>
              <select
                id="topic"
                className={styles.input}
                {...register('topic')}
              >
                {topics.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                className={`${styles.input} ${errors.message ? styles.inputError : ''}`}
                rows={4}
                placeholder="Tell us a bit about your situation and what you're looking to accomplish…"
                maxLength={2000}
                {...register('message', { setValueAs: (v) => sanitizeFormField(v, 2000) })}
              />
              {errors.message && <span id="message-error" role="alert" className={styles.error}>{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        )}
      </div>
      </div>
    </section>
  );
}
