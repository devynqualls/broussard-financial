import assert from 'node:assert/strict';
import { getLeadAttribution } from '../src/utils/leadAttribution.ts';

const saved = new Map();
globalThis.window = {
  location: { pathname: '/federal-planning', search: '?utm_source=google&utm_medium=organic&utm_campaign=fers_review' },
  sessionStorage: {
    getItem: key => saved.get(key) || null,
    setItem: (key, value) => saved.set(key, value),
  },
};

const first = getLeadAttribution();
assert.deepEqual(first, {
  leadSourcePath: '/federal-planning', utmSource: 'google', utmMedium: 'organic', utmCampaign: 'fers_review',
});
window.location.pathname = '/book';
window.location.search = '';
assert.deepEqual(getLeadAttribution(), first, 'the first visit remains attributed after navigation');
assert.equal(JSON.stringify(first).includes('<'), false, 'unsafe campaign characters are removed');

saved.clear();
window.location.search = '?utm_source=jane%40example.com&utm_medium=organic&utm_campaign=jane_smith';
assert.deepEqual(getLeadAttribution(), {
  leadSourcePath: '/book', utmSource: '', utmMedium: 'organic', utmCampaign: '',
}, 'unapproved source and campaign values are not recorded');

delete globalThis.window;
assert.equal(getLeadAttribution().leadSourcePath, '/', 'server rendering does not access the browser');
console.log('Lead attribution checks passed.');
