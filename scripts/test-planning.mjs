import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const js=ts.transpileModule(fs.readFileSync('src/utils/planning.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {incomeGap,simulate,compoundGrowth,cdValue}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
assert.deepEqual(incomeGap(6000,2000,2500,0),{income:4500,gap:1500,surplus:0});
assert.equal(incomeGap(1000,2000,0,0).surplus,1000);
assert.ok(Math.abs(simulate(500000,60,30,24000,4,2,1)[1].balance-386000)<0.005);
assert.equal(simulate(100000,100,50,0,0,0,1)[25].balance,50000);
assert.equal(simulate(100000,0,50,0,0,0,1)[25].balance,100000);
assert.equal(simulate(100,100,100,50,4,0,1)[1].shortfall,50);
assert.equal(simulate(100,100,100,50,4,0,1)[25].balance,0);
assert.equal(simulate(100,0,0,200,0,0,0)[1].shortfall,100);
assert.ok(Math.abs(simulate(1000,0,0,100,0,10,0)[2].withdrawal-110)<0.005);
const a=simulate(500000,60,30,0,4,0,1),b=simulate(500000,60,30,0,4,0,10);
assert.ok(Math.abs(a[25].balance-b[25].balance)<0.0001);
assert.ok(simulate(500000,60,30,24000,4,2,1)[10].balance < simulate(500000,60,30,24000,4,2,10)[10].balance);
console.log('11 planning checks passed: gap, surplus, loss exposure, withdrawals, depletion, inflation, and return-order effects.');


assert.equal(compoundGrowth(1000,100,2,0)[2].balance,3400);
assert.ok(Math.abs(compoundGrowth(1000,0,1,12)[1].balance-1126.8250301319698)<0.000001);
assert.ok(Math.abs(compoundGrowth(0,100,1,12)[1].balance-1268.250301319698)<0.000001);
assert.equal(compoundGrowth(0,0,60,20)[60].balance,0);
assert.equal(compoundGrowth(10000,250,20,5)[20].contributions,70000);
console.log('5 compound-growth checks passed.');


assert.equal(cdValue(10000,5,12).balance,10500);
assert.ok(Math.abs(cdValue(10000,5,24).balance-11025)<0.00001);
assert.ok(Math.abs(cdValue(10000,5,6).balance-10246.950765959599)<0.00001);
assert.deepEqual(cdValue(1000,0,6),{balance:1000,interest:0});
assert.equal(cdValue(0,20,120).balance,0);
console.log('5 CD checks passed.');
