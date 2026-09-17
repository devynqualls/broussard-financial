import { useMemo } from 'react';
import { TAX_BRACKETS_2025, STANDARD_DEDUCTIONS_2025 } from '../data/taxBrackets';
import type { FilingStatus, TaxCalcResult } from '../types';

interface TaxCalcInput {
  grossIncome: number;
  filingStatus: FilingStatus;
  additionalDeductions: number;
  otherIncome: number;
}

export function useTaxCalc(input: TaxCalcInput): TaxCalcResult | null {
  const { grossIncome, filingStatus, additionalDeductions, otherIncome } = input;

  return useMemo(() => {
    if (grossIncome <= 0) return null;

    const totalIncome = grossIncome + otherIncome;
    const stdDeduction = STANDARD_DEDUCTIONS_2025[filingStatus] ?? 0;
    const taxableIncome = Math.max(0, totalIncome - stdDeduction - additionalDeductions);
    const brackets = TAX_BRACKETS_2025[filingStatus];

    let federalTax = 0;
    let marginalRate = 10;

    for (const bracket of brackets) {
      if (taxableIncome <= bracket.min) break;
      const upper = bracket.max === Infinity ? taxableIncome : Math.min(taxableIncome, bracket.max);
      federalTax += (upper - bracket.min) * (bracket.rate / 100);
      marginalRate = bracket.rate;
    }

    const effectiveRate = totalIncome > 0 ? (federalTax / totalIncome) * 100 : 0;

    return { taxableIncome, federalTax, effectiveRate, marginalRate };
  }, [grossIncome, filingStatus, additionalDeductions, otherIncome]);
}
