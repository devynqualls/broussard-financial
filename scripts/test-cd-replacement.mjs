import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';

const js = ts.transpileModule(fs.readFileSync('src/utils/cdReplacement.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { calculateCDReplacement } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
const input = {
  deposit: 100000, cdRate: 3.5, mygaRate: 6.3, taxRate: 24, years: 10,
  simpleIndexReturn: 4, simpleMultiplier: 2.45,
  bonusPercent: 15, bonusIndexReturn: 13, bonusMultiplier: 0.45,
  bonusInBasis: true,
};
const result = calculateCDReplacement(input);
const rounded = value => Math.round(value);
assert.deepEqual(Object.values(result.end).map(rounded), [130021, 164006, 217570, 181919]);
assert.equal(rounded(result.rows[0].cdAfterTax), 102660);
assert.equal(rounded(result.rows[0].bonusFia), 121727);
assert.equal(result.rows.length, 10);
assert.equal(rounded(result.bonus), 15000);
assert.equal(result.simpleEquivalentCDRate.toFixed(2), '10.64');
assert.equal(result.bonusEquivalentCDRate.toFixed(2), '8.11');
assert.equal(rounded(result.bonusAfterTaxWithOriginalBasis), 178319);
assert.equal(rounded(calculateCDReplacement({ ...input, bonusInBasis: false }).end.bonusFia), 178319);
assert.equal(calculateCDReplacement({ ...input, cdRate: 0 }).end.cd, input.deposit);
assert.equal(calculateCDReplacement({ ...input, taxRate: 100 }).simpleEquivalentCDRate, null);
console.log('10 CD replacement checks passed: reference outputs, yearly growth, tax-basis alternatives, and rate comparison.');
