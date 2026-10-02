import { useState } from 'react';
import styles from './TaxRates.module.css';
import { TAX_BRACKETS_2026, TABLE_LABELS, STANDARD_DEDUCTIONS_2026 } from '../../../data/taxBrackets';
import { useTaxCalc } from '../../../hooks/useTaxCalc';
import { formatCurrency, formatPercent } from '../../../utils/formatCurrency';
import type { FilingStatus } from '../../../types';

const deductionLimits = [
  { label: 'Standard deduction (Single)', value: formatCurrency(STANDARD_DEDUCTIONS_2026.single) },
  { label: 'Standard deduction (MFJ)', value: formatCurrency(STANDARD_DEDUCTIONS_2026.married) },
  { label: '401(k) contribution limit', value: '$24,500' },
  { label: '401(k) catch-up (50+)', value: '+$8,000' },
  { label: 'IRA contribution limit', value: '$7,500' },
  { label: 'HSA limit (family)', value: '$8,850' },
];

export default function TaxRates() {
  const [activeStatus, setActiveStatus] = useState<FilingStatus>('single');

  const [calcInputs, setCalcInputs] = useState({
    grossIncome: '',
    filingStatus: 'single' as FilingStatus,
    additionalDeductions: '',
    otherIncome: '',
  });

  const calcResult = useTaxCalc({
    grossIncome: parseFloat(calcInputs.grossIncome) || 0,
    filingStatus: calcInputs.filingStatus,
    additionalDeductions: parseFloat(calcInputs.additionalDeductions) || 0,
    otherIncome: parseFloat(calcInputs.otherIncome) || 0,
  });

  const handleCalcChange = (field: keyof typeof calcInputs) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCalcInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const brackets = TAX_BRACKETS_2026[activeStatus];

  return (
    <section className={styles.section} id="resources" aria-labelledby="tax-heading">
      <div className={styles.intro}>
        <div>
          <div className={styles.eyebrow}>2026 Federal Tax Reference</div>
          <h2 className={styles.title} id="tax-heading">
            Current federal <em>tax rates</em> &amp; brackets
          </h2>
          <p className={styles.introPara}>
            Understanding your tax bracket is the first step toward smarter retirement
            planning. Use these IRS-published 2026 rates as a reference — then let us show
            you how to legally reduce what you owe.
          </p>
          <div className={styles.toggle} role="group" aria-label="Filing status">
            {(['single', 'married', 'hoh'] as FilingStatus[]).map((status) => (
              <button
                key={status}
                className={`${styles.toggleBtn} ${activeStatus === status ? styles.toggleActive : ''}`}
                onClick={() => setActiveStatus(status)}
                aria-pressed={activeStatus === status}
              >
                {status === 'single' ? 'Single' : status === 'married' ? 'Married Filing Jointly' : 'Head of Household'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={styles.deductionsLabel}>Key 2026 deductions &amp; limits:</p>
          <div className={styles.deductionsList}>
            {deductionLimits.map((item) => (
              <div key={item.label} className={styles.deductionRow}>
                <span className={styles.deductionName}>{item.label}</span>
                <span className={styles.deductionVal}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.tables}>
        <div className={styles.tableWrap}>
          <div className={styles.tableHead}>
            <div className={styles.tableTitle}>{TABLE_LABELS[activeStatus]}</div>
            <div className={styles.tableYear}>IRS Tax Year 2026</div>
          </div>
          <div className={styles.tableBody}>
            <table>
              <thead>
                <tr>
                  <th>Rate</th>
                  <th>Taxable Income Range</th>
                  <th>Tax Owed</th>
                </tr>
              </thead>
              <tbody>
                {brackets.map((bracket, i) => {
                  const min = bracket.min > 0 ? formatCurrency(bracket.min) : '$0';
                  const max =
                    bracket.max === Infinity
                      ? `Over ${formatCurrency(brackets[i - 1]?.max ?? 0)}`
                      : `Up to ${formatCurrency(bracket.max)}`;
                  const owed =
                    bracket.rate === 10
                      ? `${bracket.rate}% of taxable income`
                      : `Flat ${formatCurrency(bracket.base, 2)} + ${bracket.rate}% of amount over ${formatCurrency(bracket.min)}`;
                  return (
                    <tr key={bracket.rate}>
                      <td>
                        <span className={styles.rateBadge}>{bracket.rate}%</span>
                      </td>
                      <td>
                        {bracket.max === Infinity ? max : bracket.min === 0 ? max : `Over ${min} – ${max}`}
                      </td>
                      <td className={styles.owedCell}>{owed}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.sideCards}>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Capital Gains Rates (2026)</div>
            {[
              { label: '0% rate (Single, up to)', value: '$49,450' },
              { label: '15% rate (Single)', value: 'Over $49,450–$545,500' },
              { label: '20% rate (Single, above)', value: '$545,500' },
              { label: 'Net Investment Income Tax (Single MAGI)', value: '3.8% (above $200K)' },
              { label: 'Qualified Dividends', value: 'Same as LT Cap Gains' },
            ].map((row) => (
              <div key={row.label} className={styles.sideRow}>
                <span>{row.label}</span>
                <span className={styles.sideVal}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Social Security &amp; Medicare (FICA)</div>
            {[
              { label: 'Social Security (employee)', value: '6.2%' },
              { label: 'Social Security wage base', value: '$184,500' },
              { label: 'Medicare (employee)', value: '1.45%' },
              { label: 'Additional Medicare (Single wages above $200K)', value: '+0.9%' },
            ].map((row) => (
              <div key={row.label} className={styles.sideRow}>
                <span>{row.label}</span>
                <span className={styles.sideVal}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.calculator} aria-labelledby="calc-heading">
        <div className={styles.calcHead}>
          <div className={styles.calcTitle} id="calc-heading">Quick Tax Estimator — 2026</div>
          <div className={styles.calcSubtitle}>Estimate your federal income tax liability</div>
        </div>
        <div className={styles.calcBody}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="grossIncome">
              Gross Annual Income <span>(before deductions)</span>
            </label>
            <input
              type="number"
              id="grossIncome"
              className={styles.input}
              placeholder="e.g. 150000"
              min="0"
              value={calcInputs.grossIncome}
              onChange={handleCalcChange('grossIncome')}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="calcFilingStatus">
              Filing Status
            </label>
            <select
              id="calcFilingStatus"
              className={styles.select}
              value={calcInputs.filingStatus}
              onChange={handleCalcChange('filingStatus')}
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="additionalDeductions">
              Eligible Adjustments <span>(not already excluded from income)</span>
            </label>
            <input
              type="number"
              id="additionalDeductions"
              className={styles.input}
              placeholder="e.g. 23500"
              min="0"
              value={calcInputs.additionalDeductions}
              onChange={handleCalcChange('additionalDeductions')}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="otherIncome">
              Other Ordinary Income <span>(taxable pension, rental, etc.)</span>
            </label>
            <input
              type="number"
              id="otherIncome"
              className={styles.input}
              placeholder="e.g. 0"
              min="0"
              value={calcInputs.otherIncome}
              onChange={handleCalcChange('otherIncome')}
            />
          </div>
          <div className={styles.result}>
            <div className={styles.resultItem}>
              <div className={styles.resultLabel}>Taxable Income</div>
              <div className={styles.resultVal}>
                {calcResult ? formatCurrency(calcResult.taxableIncome) : '—'}
              </div>
            </div>
            <div className={styles.resultItem}>
              <div className={styles.resultLabel}>Est. Federal Tax</div>
              <div className={styles.resultVal}>
                {calcResult ? formatCurrency(calcResult.federalTax) : '—'}
              </div>
            </div>
            <div className={styles.resultItem}>
              <div className={styles.resultLabel}>Effective Rate</div>
              <div className={styles.resultVal}>
                {calcResult ? formatPercent(calcResult.effectiveRate) : '—'}
              </div>
            </div>
            <div className={styles.resultItem}>
              <div className={styles.resultLabel}>Marginal Rate</div>
              <div className={styles.resultVal}>
                {calcResult ? `${calcResult.marginalRate}%` : '—'}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.calcCta}>
          <span>
            Simplified ordinary-income estimate using the basic standard deduction. Excludes credits, additional age/blindness and senior deductions, capital gains, qualified dividends, AMT, payroll and state taxes. Do not subtract contributions already excluded from your income. Negative amounts are not supported.
          </span>
          <a href="/#contact" className={styles.calcCtaLink}>
            Schedule a Tax Planning Consultation →
          </a>
        </div>
      </div>

      <p className={styles.taxNote}>
        Tax rates shown are for Tax Year 2026 (returns filed in 2027), per IRS Revenue
        Procedure 2025-32. Last reviewed October 2, 2026.  This information is for educational reference only and does not
        constitute tax advice. Consult a qualified tax professional for guidance specific to
        your situation. Broussard Financial Services does not prepare tax returns. {' '}
        <a href="https://www.irs.gov/irb/2025-45_IRB">IRS 2026 tax tables</a> · {' '}
        <a href="https://www.ssa.gov/oact/COLA/cbb.html">SSA wage base</a>
      </p>
    </section>
  );
}
