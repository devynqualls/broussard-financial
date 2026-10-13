import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import './AnalyticsConsent.css';
import { safeCampaignValue } from '../../utils/leadAttribution';
const ID='G-YGZZWJMF6F';
const permittedEvents=new Set(['booking_click','phone_click','consultation_start','inquiry_success','generate_lead']);
const trackedPaths=new Set(['/','/book','/team','/privacy','/planning-tools','/cd-replacement','/federal-planning','/federal-resources','/military-retirement','/tax-planning','/estate-planning-checklist','/annuity-education','/learning-library','/services/trust-reviews','/services/annuities','/services/life-insurance','/services/real-estate','/services/retirement-income','/services/federal-retirement','/services/tsp-planning']);
function measurementLocation(pathname:string){
 const path=trackedPaths.has(pathname)?pathname:'/404';
 const params=new URLSearchParams(window.location.search);
 const safe=new URLSearchParams();
 for(const key of ['utm_source','utm_medium','utm_campaign']){
  const value=safeCampaignValue(key as 'utm_source'|'utm_medium'|'utm_campaign',params.get(key)||'');
  if(value)safe.set(key,value);
 }
 return 'https://www.broussardfinancialservices.com'+path+(safe.size?'?'+safe.toString():'');
}
type AnalyticsWindow=Window & {dataLayer?:unknown[];gtag?:(...args:unknown[])=>void};
export default function AnalyticsConsent(){
 const [choice,setChoice]=useState<'unset'|'yes'|'no'>('unset');
 const [settings,setSettings]=useState(false);
 const {pathname}=useLocation();
 useEffect(()=>{
  if(choice!=='yes'||!['www.broussardfinancialservices.com','broussardfinancialservices.com'].includes(window.location.hostname))return;
  const w=window as AnalyticsWindow;
  w.dataLayer=w.dataLayer||[];
  w.gtag=w.gtag||((...args:unknown[])=>{w.dataLayer!.push(args)});
  if(!document.getElementById('bfs-google-analytics')){
   w.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
   w.gtag('js',new Date());
   const script=document.createElement('script');script.id='bfs-google-analytics';script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${ID}`;document.head.appendChild(script);
  }
  const pageLocation=measurementLocation(pathname);
  w.gtag('config',ID,{send_page_view:false,page_location:pageLocation,allow_google_signals:false,allow_ad_personalization_signals:false});
  w.gtag('event','page_view',{page_location:pageLocation});
  const track=(event:Event)=>{const name=(event as CustomEvent<{event:string}>).detail?.event;if(permittedEvents.has(name))w.gtag?.('event',name,{page_location:pageLocation});};
  window.addEventListener('bfs:measurement',track);return()=>window.removeEventListener('bfs:measurement',track);
 },[choice,pathname]);
 function choose(next:'yes'|'no'){
  if(next==='no'&&choice==='yes'){
   (window as AnalyticsWindow).gtag?.('consent','update',{analytics_storage:'denied'});
   // Reload removes the loaded Google script and ends tracking immediately.
   window.location.reload();return;
  }
  setChoice(next);setSettings(false);
 }
 return <div className="analytics-preferences">{choice==='unset'||settings?<section aria-label="Optional analytics" className="analytics-choice"><p>May we use Google Analytics to understand visits and consultation activity? Our custom events do not include calculator amounts or contact-form contents. Google Analytics uses cookies. Your choice applies while this page stays open.</p><div><button onClick={()=>choose('no')}>Decline</button><button onClick={()=>choose('yes')}>Accept analytics</button><a href="https://policies.google.com/privacy">Google privacy information</a></div></section>:<button onClick={()=>setSettings(true)}>Analytics preferences</button>}</div>;
}
