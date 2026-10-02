import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
export default function NotFound() {
 return <section style={{padding:'160px 24px 100px', maxWidth:900, margin:'0 auto'}}>
 <Helmet><title>Page not found | Broussard Financial Services</title><meta name="robots" content="noindex" /></Helmet>
 <h1>We couldn’t find that page.</h1><p>Let’s get you back to retirement planning.</p><Link to="/">Return to the homepage →</Link>
 </section>;
}
