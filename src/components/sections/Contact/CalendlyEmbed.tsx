import { useState } from 'react';
import { CALENDLY_URL } from '../../../config/site';
import styles from './CalendlyEmbed.module.css';

export default function CalendlyEmbed() {
  const [open, setOpen] = useState(false);
  return <div className={styles.wrap}>
    <div className={styles.header}>
      <div className={styles.kicker}>Free 30-minute phone consultation</div>
      <h3 className={styles.title}>Choose a time to talk with us</h3>
      <p className={styles.sub}>For an in-person or video meeting, contact our office. Appointments outside office hours require prior approval.</p>
    </div>
    {open ? <div className={styles.calendar}>
      <iframe title="Schedule your free consultation" src={`${CALENDLY_URL}?embed_type=Inline&embed_domain=${window.location.hostname}&background_color=faf9f5&primary_color=1a1a18&text_color=1a1a18`} width="100%" height="720" style={{border:0,display:'block'}} />
    </div> : <button type="button" className={styles.loadButton} onClick={() => setOpen(true)}>Choose an appointment time</button>}
    <p className={styles.sub}><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Open calendar in a new tab →</a></p>
  </div>;
}
