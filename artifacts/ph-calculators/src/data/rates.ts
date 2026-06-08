// Government Contribution and Tax Rates (Updated for 2024/2025)

export const UPDATED_DATE = "January 2025";

// BIR TRAIN Law Tax Brackets (Annual)
export const TAX_BRACKETS_2024 = [
  { min: 0, max: 250000, base: 0, rate: 0 },
  { min: 250000, max: 400000, base: 0, rate: 0.20 },
  { min: 400000, max: 800000, base: 30000, rate: 0.25 },
  { min: 800000, max: 2000000, base: 130000, rate: 0.30 },
  { min: 2000000, max: 8000000, base: 490000, rate: 0.32 },
  { min: 8000000, max: Infinity, base: 2410000, rate: 0.35 }
];

// SSS Contribution Rates
export const SSS_RATES = {
  2024: {
    employeeShare: 0.045, // 4.5%
    employerShare: 0.095, // 9.5%
    totalRate: 0.14,      // 14%
    minMSC: 4000,
    maxMSC: 35000
  },
  2025: {
    employeeShare: 0.05,  // 5.0%
    employerShare: 0.10,  // 10.0%
    totalRate: 0.15,      // 15%
    minMSC: 5000,
    maxMSC: 35000 // Subject to change based on actual 2025 final circulars, keeping 35k for now
  }
};

// PhilHealth Contribution Rates
export const PHILHEALTH_RATES = {
  rate: 0.05, // 5% total (2.5% EE, 2.5% ER)
  minSalary: 10000, // 500 min premium
  maxSalary: 100000, // 5000 max premium
};

// Pag-IBIG (HDMF) Contribution Rates
export const PAGIBIG_RATES = {
  maxCompensation: 5000, // Max max compensation basis
  employeeRateLow: 0.01, // 1% if <= 1500
  employeeRateHigh: 0.02, // 2% if > 1500
  employerRate: 0.02, // 2% across the board
  maxEmployeeContribution: 100, // Based on 5000 * 2% = 100. Note: Expected to increase soon but keeping standard 100
  maxEmployerContribution: 100,
};

export const formatPHP = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
