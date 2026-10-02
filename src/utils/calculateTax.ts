import { TAX_BRACKETS_2026, STANDARD_DEDUCTIONS_2026 } from '../data/taxBrackets';
import type { FilingStatus, TaxCalcResult } from '../types';
export interface TaxCalcInput { grossIncome: number; filingStatus: FilingStatus; additionalDeductions: number; otherIncome: number }
export function calculateTax({grossIncome, filingStatus, additionalDeductions, otherIncome}: TaxCalcInput): TaxCalcResult | null {
  if (![grossIncome, additionalDeductions, otherIncome].every(v => Number.isFinite(v) && v >= 0)) return null;
  const totalIncome = grossIncome + otherIncome;
  if (totalIncome <= 0) return null;
  const taxableIncome = Math.max(0, totalIncome - STANDARD_DEDUCTIONS_2026[filingStatus] - additionalDeductions);
  let federalTax = 0;
  let marginalRate = 0;
  for (const bracket of TAX_BRACKETS_2026[filingStatus]) {
    if (taxableIncome <= bracket.min) break;
    federalTax += (Math.min(taxableIncome, bracket.max) - bracket.min) * bracket.rate / 100;
    marginalRate = bracket.rate;
  }
  federalTax = Math.round(federalTax * 100) / 100;
  return { taxableIncome, federalTax, marginalRate, effectiveRate: federalTax / totalIncome * 100 };
}
