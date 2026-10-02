import {useEffect} from 'react';
import {measure} from '../../utils/measurement';
export default function Measurement(){useEffect(()=>{
 const click=(event:MouseEvent)=>{const a=event.target instanceof Element?event.target.closest('a'):null;if(!a)return;if(a.protocol==='tel:')measure('phone_click');else if(a.hostname==='calendly.com')measure('booking_click');};
 const message=(event:MessageEvent)=>{if(event.origin!=='https://calendly.com'||event.data?.event!=='calendly.event_scheduled')return;const frames=Array.from(document.querySelectorAll('iframe'));if(frames.some(f=>f.contentWindow===event.source&&f.src.startsWith('https://calendly.com/')))measure('booking_complete');};
 document.addEventListener('click',click);window.addEventListener('message',message);
 return()=>{document.removeEventListener('click',click);window.removeEventListener('message',message)};
 },[]);return null;}
