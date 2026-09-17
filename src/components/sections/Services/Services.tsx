import { services } from '../../../data/services';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.header}>
        <h2 className={styles.title} id="services-heading">
          Comprehensive services for every stage of your <em>financial journey</em>
        </h2>
        <p className={styles.desc}>
          Eight core disciplines, one dedicated team, all working toward your retirement goals.
        </p>
      </div>

      <div className={styles.grid} role="list">
        {services.map((svc) => (
          <a
            key={svc.id}
            href="#contact"
            className={styles.card}
            role="listitem"
            aria-label={`${svc.name} — contact us to learn more`}
          >
            <div className={styles.num}>{svc.num}</div>
            <div className={styles.name}>{svc.name}</div>
            <p className={styles.cardDesc}>{svc.description}</p>
            <div className={styles.link} aria-hidden="true">Learn More →</div>
          </a>
        ))}
      </div>
    </section>
  );
}
