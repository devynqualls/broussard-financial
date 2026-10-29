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
          Retirement income, tax-aware planning, estate and trust services, annuities, insurance, and real estate. Every service starts with a free consultation.
        </p>
      </div>

      <div className={styles.grid}>
        {services.filter(svc=>['financial-planning','lifetime-income','living-trust','benefit-analysis'].includes(svc.id)).map((svc, index) => (
          <a
            key={svc.id}
            href={({ 'financial-planning':'/services/financial-planning', 'tax-planning':'/services/tax-planning', 'benefit-analysis':'/services/federal-retirement', 'tsp-education':'/services/tsp-planning', 'living-trust':'/services/trust-reviews', 'lifetime-income':'/services/annuities', 'life-insurance':'/services/life-insurance', 'real-estate':'/services/real-estate' } as Record<string,string>)[svc.id] || '#contact'}
            className={styles.card}
          >
            <div className={styles.num}>{String(index + 1).padStart(2, '0')}</div>
            <h3 className={styles.name}>{svc.name}</h3>
            <p className={styles.cardDesc}>{svc.description}</p>
            <div className={styles.link} aria-hidden="true">Explore service →</div>
          </a>
        ))}
      </div>
      <p className={styles.additional}>More ways we can help: <a href="/services/tax-planning">tax planning</a>, <a href="/services/life-insurance">life insurance</a>, <a href="/services/real-estate">real estate</a>, and <a href="/services/tsp-planning">TSP education</a>.</p><p className={styles.note}>Trust reviews and consultations are complimentary. Annuity guarantees depend on the issuing insurer’s financial strength and claims-paying ability and are subject to contract terms.</p>
    </section>
  );
}
