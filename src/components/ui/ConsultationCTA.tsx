import { CALENDLY_URL } from '../../config/site';
export default function ConsultationCTA({label}:{label:string}) {return <div className="consultation-cta"><a href={CALENDLY_URL}>{label} →</a><small>Free 30-minute phone consultation with Rene Broussard.</small></div>;}
