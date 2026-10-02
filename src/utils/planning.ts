export function compoundGrowth(principal: number, monthly: number, years: number, rate: number) {
  let balance = principal;
  const rows = [{ year: 0, balance, contributions: principal }];
  for (let month = 1; month <= years * 12; month++) {
    balance = balance * (1 + rate / 1200) + monthly;
    if (month % 12 === 0) rows.push({ year: month / 12, balance, contributions: principal + monthly * month });
  }
  return rows;
}
export function incomeGap(expenses: number, pension: number, social: number, other: number) {
  const income = pension + social + other;
  return { income, gap: Math.max(0, expenses - income), surplus: Math.max(0, income - expenses) };
}
export function simulate(balance: number, exposed: number, decline: number, withdrawal: number, growth: number, inflation: number, crashYear: number, years = 25) {
  const rows = [{ year: 0, balance, withdrawal: 0, shortfall: 0 }];
  for (let year = 1; year <= years; year++) {
    // One-time loss replaces normal return in the shock year; withdrawals follow returns.
    balance *= year === crashYear ? 1 - exposed / 100 * decline / 100 : 1 + growth / 100;
    const requested = withdrawal * Math.pow(1 + inflation / 100, year - 1);
    const paid = Math.min(balance, requested);
    balance = Math.max(0, balance - paid);
    rows.push({year, balance, withdrawal: paid, shortfall: requested - paid});
  }
  return rows;
}

export function cdValue(deposit:number,apy:number,months:number){ const balance=deposit*Math.pow(1+apy/100,months/12); return {balance,interest:balance-deposit}; }
