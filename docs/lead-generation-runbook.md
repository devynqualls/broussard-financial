# Broussard-owned lead system

The website's three review offers are the core intake paths. Public calculators remain usable without an email address. A visitor can request a review after seeing a result or reading a service page.

| Offer | Primary page | Best initial promotion |
| --- | --- | --- |
| Federal retirement review | `/services/federal-retirement` | FERS/TSP educational articles and federal-employee webinars |
| Retirement income review | `/services/annuities` | Annuity education and income-gap tool |
| Trust and estate review | `/services/trust-reviews` | Estate checklist and San Diego local search |

## Lead handling

1. New requests use the existing Netlify `contact` form and its existing notification routing. A topic identifies the requested review. `leadSourcePath` records the first page visited during the browser session; `inquiryPage` records the submission page. `utmSource`, `utmMedium`, and `utmCampaign` are limited to plain text without arbitrary URL contents. The form does not submit calculator values or account numbers.
2. Assign an owner and reply within one business day, as the site promises. Offer a specific time, confirm whether the meeting is phone, video, or in person, and record the appointment status. A form submission is a request, not a booked meeting.
3. Record the outcome as new inquiry, contacted, consultation scheduled, consultation held, follow-up, or client. Review unassigned inquiries daily. Check Netlify Spam if an expected inquiry is missing.
4. The optional educational-email checkbox is separate from responding to an inquiry. Do not add unchecked contacts to a marketing list. Newsletter delivery needs a connected email platform and unsubscribe handling; the website alone does not send a campaign.
5. Never ask visitors to put Social Security numbers, account numbers, or financial documents into these forms. Use the advisor's approved secure document process after contact.

## Monthly campaign rhythm

**Week 1:** Publish one substantive question-and-answer article authored or reviewed by a named Broussard consultant. Start with federal retirement: “What should I check before submitting my FERS retirement paperwork?” Link to the federal review offer and official OPM/TSP sources.

**Week 2:** Promote a dated, approved educational webinar after the team has set its date, speaker, and registration capacity. Suggested first topic: “FERS, TSP, and Social Security: the decisions to review before retiring.” Do not display a fictional event date. Use the existing seminar-interest form until an event is scheduled.

**Week 3:** Publish one short video or graphic derived from the article, with the same review destination. Invite current clients to share the resource with someone who may benefit, without promising results or incentives.

**Week 4:** Review source-to-client outcomes. Improve the page or offer producing qualified consultations; avoid increasing ad spending based on clicks alone.

Use campaign links such as `https://www.broussardfinancialservices.com/services/federal-retirement?utm_source=facebook&utm_medium=organic&utm_campaign=fers_review`. Do not put names, emails, account information, or other private data in URLs.

The site currently recognizes these campaign codes: `fers_review`, `income_review`, `trust_review`, and `retirement_webinar`. Add new codes to the website's allowlist before using them, so arbitrary URL text cannot enter analytics or lead records.

## Launch checks

- Confirm the live Netlify site has form detection enabled and notifications for `contact` and `seminar-interest` delivered to the team's chosen inbox. After publishing, submit one controlled inquiry with a real team email and verify its source fields, notification, and follow-up. Do not rely on a local preview for delivery tests.
- Confirm `generate_lead` appears in GA4 after an approved test submission and mark it as a key event if appropriate. GA4 runs only after a visitor accepts analytics. Check that resource-page views retain their real paths, and that campaign URLs show their source.
- In Search Console, inspect the three service pages and their indexing status. In the Google Business Profile, keep the address, hours, and services accurate and add current office/team photos. Request reviews through the approved client process; do not offer incentives.
- Before distributing ads, testimonials, or product-specific claims, obtain the firm's applicable compliance review. Do not claim a guaranteed ranking or lead volume.

## Scoreboard

Report monthly by source and offer: visits, completed inquiries, qualified inquiries, consultations scheduled, consultations held, clients, and revenue. Calculate inquiry-to-consultation and consultation-to-client rates. For paid campaigns, track total spend and cost per *qualified consultation* before expanding budget.
