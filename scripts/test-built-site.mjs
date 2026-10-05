import fs from 'node:fs';
import assert from 'node:assert/strict';
const routes=['/','/team','/planning-tools','/federal-planning','/federal-resources','/tax-planning','/estate-planning-checklist','/annuity-education','/learning-library',...['trust-reviews','annuities','life-insurance','real-estate','retirement-income','federal-retirement','tsp-planning'].map(s=>'/services/'+s)];
for(const route of routes){
 const html=fs.readFileSync('dist'+(route==='/'?'/index.html':route+'/index.html'),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route);
 assert.equal((html.match(/<title>/g)||[]).length,1,route);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,route);
 assert(!html.includes('Suite 100'),route);
 for(const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)){
  const target=match[1];
  if(target==='/'||routes.includes(target))continue;
  assert(fs.existsSync('dist'+target),route+' missing '+target);
 }
 for(const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(match[1]);
}
assert(fs.readFileSync('dist/404.html','utf8').includes('noindex'));
console.log('16 prerendered pages checked: headings, titles, canonicals, local links/assets, address and JSON-LD; 404 noindex checked.');
