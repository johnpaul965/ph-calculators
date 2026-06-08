import {
  TAX_BRACKETS_2024,
  SSS_RATES,
  PHILHEALTH_RATES,
  PAGIBIG_RATES,
} from "../data/rates";

export interface SalaryComputation {
  basicSalary: number;
  allowances: number;
  grossPay: number;
  sssContribution: number;
  philhealthContribution: number;
  pagibigContribution: number;
  totalContributions: number;
  taxableIncome: number;
  incomeTax: number;
  totalDeductions: number;
  netPay: number;
}

export function computeSalary(
  monthlySalary: number,
  allowances: number = 0,
  employmentType: "employee" | "self-employed" = "employee"
): SalaryComputation {
  const grossPay = monthlySalary + allowances;

  // SSS Computation
  let sssContribution = 0;
  if (monthlySalary > 0) {
    // Determine MSC (Monthly Salary Credit)
    // MSC is capped at min and max
    const msc = Math.min(
      Math.max(
        Math.ceil(monthlySalary / 500) * 500, // Simplification of SSS table
        SSS_RATES[2024].minMSC
      ),
      SSS_RATES[2024].maxMSC
    );
    sssContribution = msc * SSS_RATES[2024].employeeShare;
    if (employmentType === "self-employed") {
      sssContribution = msc * SSS_RATES[2024].totalRate;
    }
  }

  // PhilHealth Computation
  let philhealthContribution = 0;
  if (monthlySalary > 0) {
    const basis = Math.min(
      Math.max(monthlySalary, PHILHEALTH_RATES.minSalary),
      PHILHEALTH_RATES.maxSalary
    );
    // Employee share is half of the total rate, unless self-employed where they pay full
    const rate = employmentType === "employee" ? PHILHEALTH_RATES.rate / 2 : PHILHEALTH_RATES.rate;
    philhealthContribution = basis * rate;
  }

  // Pag-IBIG Computation
  let pagibigContribution = 0;
  if (monthlySalary > 0) {
    const basis = Math.min(monthlySalary, PAGIBIG_RATES.maxCompensation);
    const rate =
      basis > 1500
        ? PAGIBIG_RATES.employeeRateHigh
        : PAGIBIG_RATES.employeeRateLow;
    pagibigContribution = basis * rate;
    
    if (employmentType === "self-employed") {
      pagibigContribution += basis * PAGIBIG_RATES.employerRate;
    }
    
    // Hard cap for employee
    if (employmentType === "employee") {
      pagibigContribution = Math.min(pagibigContribution, PAGIBIG_RATES.maxEmployeeContribution);
    } else {
      pagibigContribution = Math.min(pagibigContribution, PAGIBIG_RATES.maxEmployeeContribution + PAGIBIG_RATES.maxEmployerContribution);
    }
  }

  const totalContributions =
    sssContribution + philhealthContribution + pagibigContribution;

  // Taxable Income (Allowances might be non-taxable de minimis, but for simplicity we assume taxable unless specified. We will assume they are taxable here.)
  const taxableIncome = grossPay - totalContributions;

  // Compute Income Tax (Annualize, apply brackets, de-annualize)
  const annualTaxableIncome = taxableIncome * 12;
  let annualTax = 0;

  for (let i = TAX_BRACKETS_2024.length - 1; i >= 0; i--) {
    const bracket = TAX_BRACKETS_2024[i];
    if (annualTaxableIncome > bracket.min) {
      const excess = annualTaxableIncome - bracket.min;
      annualTax = bracket.base + excess * bracket.rate;
      break;
    }
  }

  const incomeTax = annualTax / 12;

  const totalDeductions = totalContributions + incomeTax;
  const netPay = grossPay - totalDeductions;

  return {
    basicSalary: monthlySalary,
    allowances,
    grossPay,
    sssContribution,
    philhealthContribution,
    pagibigContribution,
    totalContributions,
    taxableIncome,
    incomeTax,
    totalDeductions,
    netPay,
  };
}

export function calculateLoanAmortization(
  principal: number,
  annualInterestRate: number,
  months: number
) {
  const monthlyRate = annualInterestRate / 100 / 12;
  
  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / months;
  } else {
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  let balance = principal;
  const schedule = [];
  let totalInterest = 0;

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    let principalPayment = monthlyPayment - interest;
    
    if (i === months) {
      principalPayment = balance;
      monthlyPayment = principalPayment + interest;
    }
    
    balance -= principalPayment;
    totalInterest += interest;

    schedule.push({
      month: i,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interest,
      balance: Math.max(0, balance)
    });
  }

  return {
    monthlyPayment,
    totalInterest,
    totalPayment: principal + totalInterest,
    schedule
  };
}
