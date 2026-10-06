# Broussard Financial Services

React/Vite website with prerendered public pages, educational calculators, Netlify Forms, and a Netlify lead-verification function.

## Deploy

Use Node 24. The repository includes the build command, publish directory, function directory, security headers, and asset caching in `netlify.toml`.

1. Upload/commit this source to the repository connected to the **existing** Netlify project serving www.broussardfinancialservices.com.
2. Deploy that project. Build: `npm run build`; publish: `dist`; functions: `netlify/functions`.

For a CLI deployment, link this source to the correct existing project, then run `npx netlify deploy --build --prod`. Do not deploy just the `dist` directory through a static-only uploader: that omits the verification function.

No new environment variables are required for the default email-domain and phone-format checks. Optional provider keys are not included. The calendar and opt-in Analytics property are already configured in source.

Netlify Forms must be enabled in the destination account, with notifications routed to info@broussardfinancialservices.com. These account settings and receipt of an actual inquiry cannot be proved by a local build. After publication, verify one controlled inquiry, calendar operation, Analytics events, Search Console ownership and sitemap submission.

## Local verification

```
npm ci
npm run verify
npm run preview
```

`verify` runs 132 calculation/backend checks, lint, frontend and backend type checking, production builds, prerendering, and generated-page checks. Native fonts and optimized logo assets are built locally. Original cleaned logo artwork remains in public/images.

`npm run dev` starts the editing preview. Localhost contact forms intentionally do not send inquiries or claim successful delivery. Analytics only loads on the production hostnames after consent. Scheduling loads only after a visitor chooses to open it.

## Release notes

- Shortened homepage copy while retaining all services and detailed service pages.
- Self-hosted fonts; removed duplicate font requests and automatic calendar loading.
- Optimized logo delivery assets and prioritized the hero photograph.
- Corrected contrast, mobile menu behavior, form error associations, mobile chat spacing and footer service links.
- Suite 321; Monday-Friday 9 a.m.-5 p.m. Pacific; later appointments require approval.
- Ten public prerendered pages, sitemap, canonical metadata and 404 page.
- Verification requests use bounded timeouts; DNS errors do not unnecessarily block leads.

No new testimonials, professional credentials or license numbers have been invented. Existing credentials and the provider responsible for trust legal work remain subject to the owner's confirmation.
