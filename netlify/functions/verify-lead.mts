import { Resolver } from 'node:dns/promises';
const resolver = new Resolver({timeout: 1500, tries: 1});
const dns = {mx: resolver.resolveMx.bind(resolver), a: resolver.resolve4.bind(resolver), aaaa: resolver.resolve6.bind(resolver)};
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from 'libphonenumber-js';

/**
 * Contact-lead verification gate.
 *
 * Called by the contact form BEFORE it submits to Netlify Forms. It confirms
 * the email and phone are real enough to be worth a callback:
 *
 *   FREE (default, no accounts): email address is well-formed AND its domain
 *   can actually receive mail (DNS MX lookup); phone parses to a valid number.
 *
 *   PAID (optional, enabled by setting the env vars below): mailbox-level
 *   deliverability (ZeroBounce) and live line/carrier lookup (Twilio Lookup).
 *
 * Note: Netlify Forms captures any matching POST to the site at the edge, so a
 * bot posting directly to "/" bypasses this check — those still fall to the
 * form's honeypot + Netlify spam filtering. This gate covers real submissions
 * made through the form.
 */

const DEFAULT_REGION = 'US';
const env = (name: string) => (globalThis as typeof globalThis & {Netlify?: {env: {get(key: string): string | undefined}}}).Netlify?.env.get(name);

type Errors = { email?: string; phone?: string };

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...(status === 405 ? {Allow: 'POST'} : {}) },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Domain can receive mail if it has MX records, or (per RFC 5321 fallback) an A/AAAA record.
export async function domainAcceptsMail(domain: string, lookup = dns): Promise<boolean> {
  try {
    const mx = await lookup.mx(domain);
    // A null MX explicitly states the domain does not accept email.
    if (mx.length > 0) return mx.some(record => record.exchange !== '.' && record.exchange !== '');
  } catch (error) {
    const code = (error as {code?: string}).code;
    if (code === 'ENOTFOUND') return false;
    if (code !== 'ENODATA') return true; // Transient DNS failures must not reject a real lead.
  }
  const addresses = await Promise.allSettled([lookup.a(domain), lookup.aaaa(domain)]);
  if (addresses.some(result => result.status === 'fulfilled' && result.value.length > 0)) return true;
  return addresses.some(result => result.status === 'rejected' && !['ENODATA','ENOTFOUND'].includes(result.reason?.code));
}

// Optional: ZeroBounce mailbox-level deliverability. Fails the email only on a
// definitive "invalid" verdict; provider/network errors fail open (don't block).
async function zeroBounceInvalid(email: string, apiKey: string): Promise<boolean> {
  try {
    const url = `https://api.zerobounce.net/v2/validate?api_key=${encodeURIComponent(
      apiKey
    )}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, {signal: AbortSignal.timeout(4000)});
    if (!res.ok) return false;
    const data = (await res.json()) as { status?: string };
    return data.status === 'invalid';
  } catch {
    return false;
  }
}

// Optional: Twilio Lookup v2. Returns true only on a definitive "not valid".
async function twilioInvalid(
  e164: string,
  sid: string,
  token: string
): Promise<boolean> {
  try {
    const url = `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(e164)}`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(4000),
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
      },
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { valid?: boolean };
    return data.valid === false;
  } catch {
    return false;
  }
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' });
  }

  let email = '';
  let phone = '';
  try {
    const raw = await req.text();
    if (raw.length > 4096) return json(413, {ok: false, error: 'Request too large'});
    const body = JSON.parse(raw) as {email?: unknown; phone?: unknown};
    if (!body || typeof body.email !== 'string' || typeof body.phone !== 'string') return json(400, {ok:false, error:'Email and phone must be strings'});
    email = body.email.trim();
    phone = body.phone.trim();
    if (email.length > 254 || phone.length > 40) return json(400, {ok:false, error:'Input too long'});
  } catch {
    return json(400, { ok: false, error: 'Invalid request body' });
  }

  const errors: Errors = {};

  // --- Email ---
  if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  } else {
    const domain = email.slice(email.lastIndexOf('@') + 1).toLowerCase();
    if (!(await domainAcceptsMail(domain))) {
      errors.email = "That email domain can't receive mail — please double-check it.";
    } else {
      const zbKey = env('ZEROBOUNCE_API_KEY');
      if (zbKey && (await zeroBounceInvalid(email, zbKey))) {
        errors.email = "That email address doesn't appear to be deliverable.";
      }
    }
  }

  // --- Phone ---
  if (!phone || !isValidPhoneNumber(phone, DEFAULT_REGION)) {
    errors.phone = 'Please enter a valid phone number.';
  } else {
    const sid = env('TWILIO_ACCOUNT_SID');
    const token = env('TWILIO_AUTH_TOKEN');
    if (sid && token) {
      const e164 = parsePhoneNumberFromString(phone, DEFAULT_REGION)?.number;
      if (e164 && (await twilioInvalid(e164, sid, token))) {
        errors.phone = "That phone number doesn't appear to be a working number.";
      }
    }
  }

  if (errors.email || errors.phone) {
    return json(422, { ok: false, errors });
  }
  return json(200, { ok: true });
};
