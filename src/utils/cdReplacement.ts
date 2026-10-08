export type CDReplacementInputs = {
  deposit: number;
  cdRate: number;
  mygaRate: number;
  taxRate: number;
  years: number;
  simpleIndexReturn: number;
  simpleMultiplier: number;
  bonusPercent: number;
  bonusIndexReturn: number;
  bonusMultiplier: number;
  bonusInBasis: boolean;
};

export type CDReplacementYear = {
  year: number;
  cdAfterTax: number;
  myga: number;
  simpleFia: number;
  bonusFia: number;
};

export function calculateCDReplacement(input: CDReplacementInputs) {
  const tax = input.taxRate / 100;
  const bonus = input.deposit * input.bonusPercent / 100;
  const bonusStartingValue = input.deposit * (1 + input.bonusPercent / 100);
  const bonusBasis = input.bonusInBasis ? bonusStartingValue : input.deposit;
  const simpleCredit = input.simpleIndexReturn / 100 * input.simpleMultiplier;
  const bonusCredit = input.bonusIndexReturn / 100 * input.bonusMultiplier;
  const afterTax = (gross: number, basis: number) => gross - Math.max(0, gross - basis) * tax;
  const rows: CDReplacementYear[] = Array.from({ length: input.years }, (_, index) => {
    const year = index + 1;
    return {
      year,
      cdAfterTax: input.deposit * (1 + input.cdRate / 100 * (1 - tax)) ** year,
      myga: input.deposit * (1 + input.mygaRate / 100) ** year,
      simpleFia: input.deposit * (1 + simpleCredit) ** year,
      bonusFia: bonusStartingValue * (1 + bonusCredit) ** year,
    };
  });
  const last = rows.at(-1)!;
  const end = {
    cd: last.cdAfterTax,
    myga: afterTax(last.myga, input.deposit),
    simpleFia: afterTax(last.simpleFia, input.deposit),
    bonusFia: afterTax(last.bonusFia, bonusBasis),
  };
  const equivalentCDRate = (amount: number) => tax === 1 || input.deposit === 0
    ? null
    : ((amount / input.deposit) ** (1 / input.years) - 1) / (1 - tax) * 100;
  return {
    rows,
    end,
    bonus,
    bonusBasis,
    simpleCredit,
    bonusCredit,
    simpleEquivalentCDRate: equivalentCDRate(end.simpleFia),
    bonusEquivalentCDRate: equivalentCDRate(end.bonusFia),
    bonusAfterTaxWithOriginalBasis: afterTax(last.bonusFia, input.deposit),
  };
}
