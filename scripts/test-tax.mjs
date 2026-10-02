import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const compile = s => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(s, {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64');
const dataUrl = compile(fs.readFileSync('src/data/taxBrackets.ts','utf8'));
const source = fs.readFileSync('src/utils/calculateTax.ts','utf8').replace('../data/taxBrackets',dataUrl);
const {calculateTax} = await import(compile(source));
// Independent IRS Rev. Proc. 2025-32 table fixtures: threshold and tax at threshold.
const fixtures = {
 single: { deduction:16100, rows:[[12400,1240],[50400,5800],[105700,17966],[201775,41024],[256225,58448],[640600,192979.25]] },
 married: { deduction:32200, rows:[[24800,2480],[100800,11600],[211400,35932],[403550,82048],[512450,116896],[768700,206583.5]] },
 hoh: { deduction:24150, rows:[[17700,1770],[67450,7740],[105700,16155],[201750,39207],[256200,56631],[640600,191171]] }
};
let checks=0;
for(const [filingStatus, fixture] of Object.entries(fixtures)) {
 const calc = grossIncome => calculateTax({grossIncome,filingStatus,additionalDeductions:0,otherIncome:0});
 assert.equal(calc(fixture.deduction).federalTax,0); checks++;
 fixture.rows.forEach(([income,tax],i)=>{
  for(const [offset,expected] of [[0,tax],[-1,tax-[10,12,22,24,32,35][i]/100],[1,tax+[12,22,24,32,35,37][i]/100]]) {
   assert.equal(calc(income+fixture.deduction+offset).federalTax,Math.round(expected*100)/100); checks++;
  }
 });
}
const calc = (extra={}) => calculateTax({grossIncome:100000,filingStatus:'single',additionalDeductions:0,otherIncome:0,...extra});
assert.equal(calc().federalTax,13170); checks++;
assert.equal(calc({grossIncome:0,otherIncome:100000}).federalTax,13170); checks++;
assert.equal(calc({additionalDeductions:100000}).federalTax,0); checks++;
for(const extra of [{grossIncome:-1},{otherIncome:-1},{additionalDeductions:-1},{grossIncome:Infinity},{grossIncome:NaN},{grossIncome:0}]) {assert.equal(calc(extra),null);checks++;}
console.log(`${checks} tax checks passed (all filing statuses, boundaries, ordinary-income example, and invalid inputs).`);
