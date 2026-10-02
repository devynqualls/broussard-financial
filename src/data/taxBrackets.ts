import type { TaxBracketMap, FilingStatus } from '../types';

// IRS Revenue Procedure 2025-32, section 4.01. Reviewed October 2, 2026.
export const TAX_BRACKETS_2026: TaxBracketMap = {
  single: [
    { rate: 10, min: 0, max: 12400, base: 0 },
    { rate: 12, min: 12400, max: 50400, base: 1240 },
    { rate: 22, min: 50400, max: 105700, base: 5800 },
    { rate: 24, min: 105700, max: 201775, base: 17966 },
    { rate: 32, min: 201775, max: 256225, base: 41024 },
    { rate: 35, min: 256225, max: 640600, base: 58448 },
    { rate: 37, min: 640600, max: Infinity, base: 192979.25 },
  ],
  married: [
    { rate: 10, min: 0, max: 24800, base: 0 },
    { rate: 12, min: 24800, max: 100800, base: 2480 },
    { rate: 22, min: 100800, max: 211400, base: 11600 },
    { rate: 24, min: 211400, max: 403550, base: 35932 },
    { rate: 32, min: 403550, max: 512450, base: 82048 },
    { rate: 35, min: 512450, max: 768700, base: 116896 },
    { rate: 37, min: 768700, max: Infinity, base: 206583.5 },
  ],
  hoh: [
    { rate: 10, min: 0, max: 17700, base: 0 },
    { rate: 12, min: 17700, max: 67450, base: 1770 },
    { rate: 22, min: 67450, max: 105700, base: 7740 },
    { rate: 24, min: 105700, max: 201750, base: 16155 },
    { rate: 32, min: 201750, max: 256200, base: 39207 },
    { rate: 35, min: 256200, max: 640600, base: 56631 },
    { rate: 37, min: 640600, max: Infinity, base: 191171 },
  ],
};

export const STANDARD_DEDUCTIONS_2026: Record<FilingStatus, number> = { single: 16100, married: 32200, hoh: 24150 };
export const TABLE_LABELS: Record<FilingStatus, string> = { single: 'Single Filers — 2026', married: 'Married Filing Jointly — 2026', hoh: 'Head of Household — 2026' };
