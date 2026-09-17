import styles from './Seminars.module.css';
import { initialSeminars } from '../../../data/seminars';
import type { Seminar } from '../../../types';
import { Button } from '../../ui/Button/Button';

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
        <p className={styles.desc}>
          Join us for live educational events — free to attend, no obligation.
        </p>
      </div>

      <div className={styles.grid}>
        {seminars.length > 0 ? (
          <div className={styles.list} aria-label="Seminar list">
            {seminars.map((seminar) => (
              <SeminarCard key={seminar.id} seminar={seminar} />
            ))}
          </div>
        ) : (
          <div className={styles.empty} role="status">
            <div className={styles.emptyTitle}>No upcoming events scheduled</div>
            <p className={styles.emptyBody}>
              New seminars and webinars will be posted here as they're announced. In the
              meantime, reach out and we'll let you know about the next one.
            </p>
            <Button href="/#contact" variant="outline">Get Notified</Button>
          </div>
        )}

        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Can't attend live?</div>
            <p className={styles.sideCardBody}>
              Schedule a private one-on-one consultation at a time that works for you — in
              person at our office or via video call from anywhere.
            </p>
            <Button href="/#contact" variant="primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
              Schedule Private Consultation
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
