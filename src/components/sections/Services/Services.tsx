import { services } from '../../../data/services';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.header}>
        <h2 className={styles.title} id="services-heading">
          Plan for your <em>next chapter</em>
        </h2>
        <p className={styles.desc}>
          Retirement income, trusts, annuities, life insurance, and real estate — with a free consultation for every service.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((svc) => (
          <a
            key={svc.id}
            href={({ 'financial-planning':'/services/retirement-income', 'benefit-analysis':'/services/federal-retirement', 'tsp-education':'/services/tsp-planning', 'living-trust':'/services/trust-reviews', 'lifetime-income':'/services/annuities', 'life-insurance':'/services/life-insurance', 'real-estate':'/services/real-estate' } as Record<string,string>)[svc.id] || '#contact'}
            className={styles.card}
          >
            <div className={styles.num}>{svc.num}</div>
            <div className={styles.name}>{svc.name}</div>
            <p className={styles.cardDesc}>{svc.description}</p>
            <div className={styles.link} aria-hidden="true">Learn More →</div>
          </a>
        ))}
      </div>
      <p className={styles.desc}>Trust reviews and consultations are complimentary. Annuity guarantees depend on the issuing insurer’s financial strength and claims-paying ability and are subject to contract terms.</p>
    </section>
  );
}
