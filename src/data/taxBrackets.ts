import type { TaxBracketMap } from '../types';

// 2026 tax brackets per IRS Revenue Procedure 2025-28
export const TAX_BRACKETS_2026: TaxBracketMap = {
  single: [
    { rate: 10, min: 0, max: 12300, base: 0 },
    { rate: 12, min: 12300, max: 49925, base: 1230.0 },
    { rate: 22, min: 49925, max: 106575, base: 5742.0 },
    { rate: 24, min: 106575, max: 203350, base: 18005.0 },
    { rate: 32, min: 203350, max: 258050, base: 41248.0 },
    { rate: 35, min: 258050, max: 645850, base: 58752.0 },
    { rate: 37, min: 645850, max: Infinity, base: 194632.0 },
  ],
  married: [
    { rate: 10, min: 0, max: 24600, base: 0 },
    { rate: 12, min: 24600, max: 99850, base: 2460.0 },
    { rate: 22, min: 99850, max: 213150, base: 11484.0 },
    { rate: 24, min: 213150, max: 406700, base: 36416.0 },
    { rate: 32, min: 406700, max: 516100, base: 82899.0 },
    { rate: 35, min: 516100, max: 775250, base: 117862.0 },
    { rate: 37, min: 775250, max: Infinity, base: 208624.0 },
  ],
  hoh: [
    { rate: 10, min: 0, max: 17500, base: 0 },
    { rate: 12, min: 17500, max: 66850, base: 1750.0 },
    { rate: 22, min: 66850, max: 106575, base: 7672.0 },
    { rate: 24, min: 106575, max: 203350, base: 16411.0 },
    { rate: 32, min: 203350, max: 258025, base: 39634.0 },
    { rate: 35, min: 258025, max: 645850, base: 57133.0 },
    { rate: 37, min: 645850, max: Infinity, base: 192902.0 },
  ],
};

// Keep 2025 export alias so nothing else breaks if referenced
export const TAX_BRACKETS_2025 = TAX_BRACKETS_2026;

export const STANDARD_DEDUCTIONS_2026: Record<string, number> = {
  single: 15750,
  married: 31500,
  hoh: 23625,
};

export const STANDARD_DEDUCTIONS_2025 = STANDARD_DEDUCTIONS_2026;

export const TABLE_LABELS: Record<string, string> = {
  single: 'Single Filers — 2026',
  married: 'Married Filing Jointly — 2026',
  hoh: 'Head of Household — 2026',
};
