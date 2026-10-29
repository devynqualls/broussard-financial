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
  bonusPercent: 15, bonusVestingYears: 10, bonusIndexReturn: 13, bonusMultiplier: 0.45,
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
const zeroCredit = calculateCDReplacement({ ...input,
  simpleIndexReturn: 7, simpleMultiplier: 0, bonusIndexReturn: 7, bonusMultiplier: 0,
  bonusInBasis: false,
});
assert.equal(zeroCredit.simpleCredit, 0);
assert.equal(zeroCredit.bonusCredit, 0);
assert.equal(rounded(zeroCredit.end.simpleFia), 100000);
assert.equal(rounded(zeroCredit.end.bonusFia), 111400);
const earlyExit = calculateCDReplacement({ ...input, years: 5, bonusPercent: 18,
  bonusIndexReturn: 7, bonusMultiplier: 0, bonusInBasis: false });
assert.equal(earlyExit.rows[4].bonusVestedPercent, 0.5);
assert.equal(rounded(earlyExit.rows[4].bonusFia), 118000);
assert.equal(rounded(earlyExit.rows[4].bonusFiaVested), 109000);
assert.equal(rounded(earlyExit.end.bonusFia), 106840);
console.log('18 CD replacement checks passed: reference outputs, zero-multiplier case, bonus vesting, tax-basis alternatives, and rate comparison.');
