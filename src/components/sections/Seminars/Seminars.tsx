import SeminarSignup from './SeminarSignup';
import styles from './Seminars.module.css';
import { initialSeminars } from '../../../data/seminars';
import type { Seminar } from '../../../types';
import { Button } from '../../ui/Button/Button';
import { Link } from 'react-router-dom';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function SeminarCard({ seminar }: { seminar: Seminar }) {
  const month = MONTHS[seminar.date.getMonth()];
  const day = seminar.date.getDate();
  const year = seminar.date.getFullYear();
  const details = [seminar.time, seminar.location, seminar.notes].filter(Boolean).join(' · ');

  return (
    <article className={styles.card} aria-label={seminar.title}>
      <div className={styles.dateBlock} aria-label={`${month} ${day}, ${year}`}>
        <div className={styles.month}>{month}</div>
        <div className={styles.day}>{day}</div>
        <div className={styles.year}>{year}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.type}>{seminar.type}</div>
        <div className={styles.cardTitle}>{seminar.title}</div>
        <div className={styles.details}>{details || 'Details to be announced'}</div>
      </div>
      <div className={styles.action}>
        <Button
          href="/#contact"
          variant="outline"
          className={seminar.featured ? styles.btnFill : ''}
        >
          {seminar.featured ? 'Register Now' : 'Register'}
        </Button>
      </div>
    </article>
  );
}

export default function Seminars() {
  const seminars = initialSeminars;

  return (
    <section className={styles.section} id="seminars" aria-labelledby="seminars-heading">
      <div className={styles.header}>
        <h2 className={styles.title} id="seminars-heading">
          Upcoming seminars <em>&amp; events</em>
        </h2>
        <p className={styles.desc}>Join us for free educational events. Get notified when the next date is announced.</p>
      </div>

      <div className={styles.grid}>
        {seminars.length > 0 ? (
          <div className={styles.list} aria-label="Seminar list">
            {seminars.map((seminar) => (
              <SeminarCard key={seminar.id} seminar={seminar} />
            ))}
          <SeminarSignup />
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.campaignLabel}>FEATURED SEMINAR · DATE TO BE ANNOUNCED</span>
            <h3 className={styles.emptyTitle}>From retirement savings to a retirement paycheck</h3>
            <p className={styles.emptyBody}>Rene Broussard will discuss retirement income choices for adults 59½ and older, including annuity income, account and rollover decisions, and beneficiary and trust coordination.</p>
            <Link className={styles.campaignLink} to="/retirement-income-seminar">See the seminar and get notified →</Link>
            <small className={styles.campaignNote}>The date is not set. This is an interest list, not a reservation.</small>
          </div>
        )}

        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Can't attend live?</div>
            <p className={styles.sideCardBody}>
              Request a private one-on-one consultation at a time that works for you — in
              person at our office or via video call from anywhere.
            </p>
            <Button href="/#contact" variant="primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
              Request Private Consultation
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
