export type FilingStatus = 'single' | 'joint' | 'separate';

// CMS 2026 full Part B premiums and Part D income-related adjustments.
// Source: https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
const partB = [202.9, 284.1, 405.8, 527.5, 649.2, 689.9];
const partD = [0, 14.5, 37.5, 60.4, 83.3, 91];

export function irmaaTier(magi: number, status: FilingStatus): number {
  if (status === 'separate') {
    if (magi <= 109000) return 0;
    return magi < 391000 ? 4 : 5;
  }
  const limits = status === 'joint'
    ? [218000, 274000, 342000, 410000]
    : [109000, 137000, 171000, 205000];
  for (let index = 0; index < limits.length; index++) {
    if (magi <= limits[index]) return index;
  }
  return magi < (status === 'joint' ? 750000 : 500000) ? 4 : 5;
}

export function irmaaEstimate(magi: number, status: FilingStatus, partBPeople: number, partDPeople: number) {
  const tier = irmaaTier(magi, status);
  const partBCents = Math.round(partB[tier] * 100) * partBPeople;
  const partDCents = Math.round(partD[tier] * 100) * partDPeople;
  const monthlyPartB = partBCents / 100;
  const monthlyPartDAdjustment = partDCents / 100;
  return {
    tier,
    monthlyPartB,
    monthlyPartDAdjustment,
    monthlyKnownCost: (partBCents + partDCents) / 100,
    annualKnownCost: (partBCents + partDCents) * 12 / 100,
  };
}
