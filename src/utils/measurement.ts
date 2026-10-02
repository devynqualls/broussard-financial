// Dispatches named events locally; AnalyticsConsent controls external transmission.
// Event payloads contain no calculator values or contact-form fields.
export function measure(name:'booking_click'|'phone_click'|'inquiry_success'|'booking_complete'){
 window.dispatchEvent(new CustomEvent('bfs:measurement',{detail:{event:name}}));
}
