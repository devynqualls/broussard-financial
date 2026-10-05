import styles from './Hero.module.css';
import { Button } from '../../ui/Button/Button';
import { Link } from 'react-router-dom';
export default function Hero() {
 return <><section className={styles.hero} id="hero" aria-label="Retirement planning">
 <div className={styles.left}><div className={styles.eyebrow}>Your next chapter starts here</div><h1 className={styles.h1}>Your retirement.<br/>A clearer path forward.</h1><p className={styles.sub}>Plan your income, understand your benefits, and protect what matters. Personalized guidance for federal employees, retirees, and families.</p><div className={styles.btns}><Button href="#contact" variant="primary">Schedule a free consultation</Button><Link className={styles.toolsLink} to="/planning-tools">Explore planning tools →</Link></div></div>
 <div className={styles.right}><img className={styles.heroImage} src="/images/downtown.avif" alt="San Diego waterfront and downtown skyline" width="1280" height="800" fetchPriority="high" decoding="async"/><span className={styles.caption}>San Diego roots. Nationwide guidance.</span></div>
 </section><nav className={styles.pathways} aria-label="Explore retirement services">{[['01','Federal retirement','Make sense of your pension, TSP and benefits.','/federal-planning'],['02','Retirement income','Build a plan for the life you want.','/services/retirement-income'],['03','Estate & trust planning','Free trust reviews, updates, and new trust setup.','/services/trust-reviews']].map(([number,title,copy,url])=><Link to={url} key={title}><span>{number}</span><h2>{title}</h2><p>{copy}</p><strong>Explore →</strong></Link>)}</nav></>;
}
