import { InlineWidget } from 'react-calendly';
import { CALENDLY_URL } from '../../../config/site';
import styles from './CalendlyEmbed.module.css';

export default function CalendlyEmbed() {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.kicker}>Schedule a Consultation</div>
        <h3 className={styles.title}>Pick a time that works for you</h3>
        <p className={styles.sub}>
          Book a complimentary 30-minute consultation directly on our calendar — no phone tag,
          no back-and-forth. Available in person at our San Diego office or via secure video call.
        </p>
      </div>

      <div className={styles.calendar}>
        <InlineWidget
          url={CALENDLY_URL}
          styles={{ height: '720px', width: '100%' }}
          pageSettings={{
            backgroundColor: 'faf9f5',
            primaryColor: '1a1a18',
            textColor: '1a1a18',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            hideGdprBanner: true,
          }}
        />
      </div>
    </div>
  );
}
