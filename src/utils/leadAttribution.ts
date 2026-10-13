type LeadAttribution = {
  leadSourcePath: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

const key = 'bfs-first-visit';
const clean = (value: string, length = 80) => value.replace(/[^a-zA-Z0-9 _.-]/g, '').trim().slice(0, length);
const safePath = (value: string) => /^\/[a-z0-9/-]*$/i.test(value) ? value.slice(0, 100) : '/';
const sources = new Set(['google', 'facebook', 'instagram', 'youtube', 'linkedin', 'newsletter', 'gbp', 'email', 'event', 'print', 'partner']);
const media = new Set(['organic', 'cpc', 'paid', 'email', 'social', 'referral', 'print']);
const campaigns = new Set(['fers_review', 'income_review', 'trust_review', 'retirement_webinar']);
export function safeCampaignValue(key: 'utm_source' | 'utm_medium' | 'utm_campaign', raw: string) {
  const value = clean(raw).toLowerCase();
  return (key === 'utm_source' ? sources : key === 'utm_medium' ? media : campaigns).has(value) ? value : '';
}

export function getLeadAttribution(): LeadAttribution {
  const fallback: LeadAttribution = { leadSourcePath: '/', utmSource: '', utmMedium: '', utmCampaign: '' };
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = window.sessionStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<LeadAttribution>;
      return {
        leadSourcePath: safePath(parsed.leadSourcePath || '/'),
        utmSource: safeCampaignValue('utm_source', parsed.utmSource || ''),
        utmMedium: safeCampaignValue('utm_medium', parsed.utmMedium || ''),
        utmCampaign: safeCampaignValue('utm_campaign', parsed.utmCampaign || ''),
      };
    }
    const params = new URLSearchParams(window.location.search);
    const attribution = {
      leadSourcePath: safePath(window.location.pathname),
      utmSource: safeCampaignValue('utm_source', params.get('utm_source') || ''),
      utmMedium: safeCampaignValue('utm_medium', params.get('utm_medium') || ''),
      utmCampaign: safeCampaignValue('utm_campaign', params.get('utm_campaign') || ''),
    };
    window.sessionStorage.setItem(key, JSON.stringify(attribution));
    return attribution;
  } catch {
    return { ...fallback, leadSourcePath: safePath(window.location.pathname) };
  }
}

export function leadAttributionFields() {
  return Object.entries(getLeadAttribution());
}
