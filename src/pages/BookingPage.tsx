import { Helmet } from 'react-helmet-async';
import AppointmentRequest from '../components/ui/AppointmentRequest';
import styles from './BookingPage.module.css';

export default function BookingPage() {
  return <>
    <Helmet>
      <title>Request a Free Consultation | Broussard Financial Services</title>
      <meta name="description" content="Request a preferred date and time for a free 30-minute consultation. Our team will confirm availability and assign a consultant." />
      <meta name="robots" content="noindex,follow" />
      <link rel="canonical" href="https://www.broussardfinancialservices.com/book" />
    </Helmet>
    <section className={styles.page} aria-labelledby="booking-heading">
      <div className={styles.intro}>
        <span className={styles.eyebrow}>Your free consultation</span>
        <h1 id="booking-heading">Request a time to talk with us.</h1>
        <p>Choose any preferred date and time. We’ll check our consultants’ availability and contact you to confirm who you’ll meet with. No appointment is booked until we confirm it.</p>
      </div>
      <AppointmentRequest />
      <p className={styles.help}>Prefer to talk with our office? Call <a href="tel:+16195810010">(619) 581-0010</a> or email <a href="mailto:info@broussardfinancialservices.com">info@broussardfinancialservices.com</a>.</p>
    </section>
  </>;
}
