import {useEffect} from 'react';
import {measure} from '../../utils/measurement';
import {getLeadAttribution} from '../../utils/leadAttribution';
export default function Measurement(){useEffect(()=>{
 getLeadAttribution();
 const click=(event:MouseEvent)=>{const a=event.target instanceof Element?event.target.closest('a'):null;if(!a)return;if(a.protocol==='tel:')measure('phone_click');else if(a.origin===window.location.origin&&a.pathname==='/book')measure('booking_click');};
 document.addEventListener('click',click);
 return()=>{document.removeEventListener('click',click)};
 },[]);return null;}
