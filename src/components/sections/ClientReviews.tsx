import styles from './ClientReviews.module.css';

const reviews = [
  {
    name: 'Jessica Arnett',
    quote: 'As a first-time client, I couldn’t have asked for a better advising experience.',
    url: 'https://www.google.com/maps/contrib/112763427887855700243/reviews',
  },
  {
    name: 'Athanison Monroe',
    quote: 'He has far exceeded our expectations.',
    url: 'https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s117831446900274392622!2s0x80d9551bbaace6cf:0x392cbd2e45ec63a2',
  },
];

export default function ClientReviews() {
  return <section id="client-reviews" className={styles.section} aria-labelledby="client-reviews-heading">
    <span className={styles.eyebrow}>CLIENT PERSPECTIVES</span>
    <h2 id="client-reviews-heading">In their own words.</h2>
    <div className={styles.grid}>{reviews.map(review => <figure className={styles.card} key={review.name}>
      <blockquote><p>“{review.quote}”</p></blockquote>
      <figcaption><strong>{review.name}</strong><span>Google review · Selected excerpt</span></figcaption>
      <a href={review.url} target="_blank" rel="noopener noreferrer">Read on Google <span className={styles.srOnly}>(opens in a new tab)</span>↗</a>
    </figure>)}</div>
    <p className={styles.note}>Selected excerpts from public Google reviews. Individual experiences vary; these comments do not guarantee future results.</p>
  </section>;
}
