import { Link } from 'react-router-dom';
export default function ConsultationCTA({label}:{label:string}) {return <div className="consultation-cta"><Link to="/book">{label} →</Link><small>Request a free 30-minute consultation. We’ll confirm a time and assign an available consultant.</small></div>;}
