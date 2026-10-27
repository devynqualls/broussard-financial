import assert from 'node:assert/strict';
import {irmaaEstimate, irmaaTier} from '../src/utils/irmaa.ts';

for (const [income, expected] of [[109000,0],[109000.01,1],[137000,1],[137000.01,2],[171000,2],[171000.01,3],[205000,3],[205000.01,4],[499999.99,4],[500000,5]]) {
  assert.equal(irmaaTier(income,'single'),expected,`single: ${income}`);
}
for (const [income, expected] of [[218000,0],[218000.01,1],[274000,1],[274000.01,2],[342000,2],[342000.01,3],[410000,3],[410000.01,4],[749999.99,4],[750000,5]]) {
  assert.equal(irmaaTier(income,'joint'),expected,`joint: ${income}`);
}
for (const [income, expected] of [[109000,0],[109000.01,4],[390999.99,4],[391000,5]]) {
  assert.equal(irmaaTier(income,'separate'),expected,`separate: ${income}`);
}
assert.deepEqual(irmaaEstimate(218001,'joint',2,2),{
  tier:1,monthlyPartB:568.2,monthlyPartDAdjustment:29,monthlyKnownCost:597.2,annualKnownCost:7166.4,
});
assert.equal(irmaaEstimate(200000,'joint',1,0).monthlyKnownCost,202.9);
console.log('IRMAA 2026 boundaries and premiums checked.');
