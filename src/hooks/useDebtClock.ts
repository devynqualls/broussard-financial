import { useState, useEffect } from 'react';

const BASE_DEBT = 36_200_000_000_000;
const DEBT_PER_SECOND = 100_000;
const BASE_TIME = new Date('2025-05-01T00:00:00Z').getTime();
const US_POPULATION = 335_000_000;
const US_TAXPAYERS = 150_000_000;

export interface DebtClockData {
  totalDebt: number;
  perCitizen: number;
  perTaxpayer: number;
}

export function useDebtClock(): DebtClockData {
  const [data, setData] = useState<DebtClockData>(() => computeDebt());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(computeDebt());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return data;
}

function computeDebt(): DebtClockData {
  const elapsed = (Date.now() - BASE_TIME) / 1000;
  const totalDebt = BASE_DEBT + elapsed * DEBT_PER_SECOND;
  return {
    totalDebt,
    perCitizen: Math.round(totalDebt / US_POPULATION),
    perTaxpayer: Math.round(totalDebt / US_TAXPAYERS),
  };
}
