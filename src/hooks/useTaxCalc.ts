import { useMemo } from 'react';
import { calculateTax, type TaxCalcInput } from '../utils/calculateTax';
export function useTaxCalc(input: TaxCalcInput) {
  const { grossIncome, filingStatus, additionalDeductions, otherIncome } = input;
  return useMemo(() => calculateTax({ grossIncome, filingStatus, additionalDeductions, otherIncome }), [grossIncome, filingStatus, additionalDeductions, otherIncome]);
}
