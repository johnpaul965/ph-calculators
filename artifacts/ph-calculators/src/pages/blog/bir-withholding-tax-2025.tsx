import { useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BIRWithholdingTax2025() {
  useEffect(() => {
    setPageSEO(
      "BIR Withholding Tax 2025: How Much Income Tax Do I Pay in the Philippines? | PH Calculators",
      "Complete guide to Philippine withholding tax in 2025. Includes the TRAIN Law tax table, step-by-step computation, examples for different salary levels, and a free BIR tax calculator."
    );
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> January 2025</span>
          <span>9 min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          BIR Withholding Tax 2025: How Much Income Tax Do You Actually Pay?
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg text-muted-foreground">
            Every December, millions of Filipino employees look at their payslips and ask: "Why is my take-home pay lower this month?" A big part of the answer is withholding tax — the income tax your employer deducts on behalf of the BIR. This guide explains how the tax is computed in 2025, shows you the exact tax table, and walks through real examples at common salary levels.
          </p>

          <h2>What Is Withholding Tax?</h2>
          <p>
            Withholding tax on compensation is the amount of income tax your employer deducts from your salary every payroll period and remits directly to the Bureau of Internal Revenue (BIR). It is not a separate tax — it is a prepayment of your annual income tax obligation, collected at the source so you do not need to wait until year-end to pay a large lump sum.
          </p>
          <p>
            At the end of the year, your employer files a BIR Form 2316 that summarizes all the tax withheld from your salary throughout the year. If your employer correctly computes the withholding each month, your tax obligation is fully settled and you are not required to file your own income tax return (ITR) — a significant simplification for most rank-and-file employees.
          </p>

          <h2>The TRAIN Law: The Legal Basis for Current Tax Rates</h2>
          <p>
            The current income tax rates are governed by <strong>Republic Act No. 10963</strong>, more commonly known as the <strong>Tax Reform for Acceleration and Inclusion (TRAIN) Law</strong>, which took effect on January 1, 2018. The TRAIN Law significantly reduced income taxes for most Filipino workers — especially those in the lower and middle income brackets.
          </p>
          <p>
            One of the most impactful provisions: employees earning ₱250,000 or below per year — that's roughly ₱20,833 per month — pay <strong>zero income tax</strong>.
          </p>

          <h2>The 2025 Annual Income Tax Table</h2>
          <p>
            The TRAIN Law tax table (which has been in effect since 2023 under the second set of reduced rates) applies to taxable income as follows:
          </p>
          <div className="not-prose my-4 rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Annual Taxable Income</TableHead>
                  <TableHead className="text-right">Tax Rate</TableHead>
                  <TableHead className="text-right">Base Tax</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>₱0 – ₱250,000</TableCell>
                  <TableCell className="text-right font-semibold text-green-600 dark:text-green-400">0%</TableCell>
                  <TableCell className="text-right">₱0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱250,001 – ₱400,000</TableCell>
                  <TableCell className="text-right">15%</TableCell>
                  <TableCell className="text-right">₱0 + 15% of excess over ₱250,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱400,001 – ₱800,000</TableCell>
                  <TableCell className="text-right">20%</TableCell>
                  <TableCell className="text-right">₱22,500 + 20% of excess over ₱400,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱800,001 – ₱2,000,000</TableCell>
                  <TableCell className="text-right">25%</TableCell>
                  <TableCell className="text-right">₱102,500 + 25% of excess over ₱800,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱2,000,001 – ₱8,000,000</TableCell>
                  <TableCell className="text-right">30%</TableCell>
                  <TableCell className="text-right">₱402,500 + 30% of excess over ₱2,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Over ₱8,000,000</TableCell>
                  <TableCell className="text-right">35%</TableCell>
                  <TableCell className="text-right">₱2,202,500 + 35% of excess over ₱8,000,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h2>Step-by-Step: How to Compute Your Monthly Withholding Tax</h2>
          <p>
            Employers compute your withholding tax using a <strong>monthly tax table</strong> published by the BIR (RR 11-2018). Here is the manual method to understand the logic:
          </p>

          <h3>Step 1 — Determine Gross Monthly Compensation</h3>
          <p>Start with your total gross pay for the month, including basic salary and any taxable allowances or bonuses.</p>

          <h3>Step 2 — Subtract Mandatory Government Contributions</h3>
          <p>Deduct your SSS, PhilHealth, and Pag-IBIG employee shares. These are not subject to income tax.</p>
          <ul>
            <li>SSS (Employee Share): 5.0% of MSC (max ₱1,750/month for 2025)</li>
            <li>PhilHealth (Employee Share): 2.5% of basic salary (max ₱2,500/month)</li>
            <li>Pag-IBIG (Employee Share): 2% of salary basis, max ₱100/month</li>
          </ul>

          <h3>Step 3 — Subtract the Monthly Personal Exemption</h3>
          <p>
            The TRAIN Law provides a personal exemption equivalent to ₱250,000 per year. Divided across 12 months, this is <strong>₱20,833.33 per month</strong> that is tax-free.
          </p>

          <h3>Step 4 — Apply the Tax Table</h3>
          <p>
            The result after steps 2 and 3 is your <strong>monthly taxable income</strong>. Apply the monthly equivalent of the tax table above to compute your tax due.
          </p>

          <div className="not-prose my-4 p-4 bg-muted rounded-lg text-sm">
            <p className="font-semibold mb-2">Monthly Taxable Income Formula:</p>
            <p className="font-mono">Taxable Income = Gross Pay − SSS − PhilHealth − Pag-IBIG − ₱20,833.33</p>
          </div>

          <h2>Worked Examples at Common Salary Levels</h2>

          <h3>Example 1 — Minimum Wage Earner (₱16,000/month)</h3>
          <p>
            Note: Statutory minimum wage earners are completely exempt from income tax under the TRAIN Law — no computation required. Their withholding tax is ₱0.
          </p>
          <p>
            For a non-minimum wage earner earning ₱16,000/month:
          </p>
          <div className="not-prose my-3 rounded-lg border overflow-hidden">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross Monthly Pay</TableCell><TableCell className="text-right">₱16,000.00</TableCell></TableRow>
                <TableRow><TableCell>Less: SSS (₱16,000 → MSC ₱16,000 × 5%)</TableCell><TableCell className="text-right">−₱800.00</TableCell></TableRow>
                <TableRow><TableCell>Less: PhilHealth (₱16,000 × 2.5%)</TableCell><TableCell className="text-right">−₱400.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Pag-IBIG</TableCell><TableCell className="text-right">−₱100.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Monthly Personal Exemption</TableCell><TableCell className="text-right">−₱20,833.33</TableCell></TableRow>
                <TableRow className="bg-muted/50 font-semibold"><TableCell>Monthly Taxable Income</TableCell><TableCell className="text-right text-green-600 dark:text-green-400">₱0 (negative → no tax)</TableCell></TableRow>
                <TableRow className="font-bold"><TableCell>Withholding Tax</TableCell><TableCell className="text-right text-green-600 dark:text-green-400">₱0.00</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>
          <p>Employees earning around ₱22,000/month or below typically pay zero income tax after deductions.</p>

          <h3>Example 2 — Mid-Level Employee (₱35,000/month)</h3>
          <div className="not-prose my-3 rounded-lg border overflow-hidden">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross Monthly Pay</TableCell><TableCell className="text-right">₱35,000.00</TableCell></TableRow>
                <TableRow><TableCell>Less: SSS (MSC ₱35,000 × 5%)</TableCell><TableCell className="text-right">−₱1,750.00</TableCell></TableRow>
                <TableRow><TableCell>Less: PhilHealth (₱35,000 × 2.5%)</TableCell><TableCell className="text-right">−₱875.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Pag-IBIG</TableCell><TableCell className="text-right">−₱100.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Monthly Personal Exemption</TableCell><TableCell className="text-right">−₱20,833.33</TableCell></TableRow>
                <TableRow className="bg-muted/50 font-semibold"><TableCell>Monthly Taxable Income</TableCell><TableCell className="text-right">₱11,441.67</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>
          <p>Annual taxable income = ₱11,441.67 × 12 = ₱137,300. This falls under the 0% bracket (below ₱250,000).</p>
          <p><strong>Monthly Withholding Tax: ₱0.00</strong></p>

          <h3>Example 3 — Senior Professional (₱60,000/month)</h3>
          <div className="not-prose my-3 rounded-lg border overflow-hidden">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross Monthly Pay</TableCell><TableCell className="text-right">₱60,000.00</TableCell></TableRow>
                <TableRow><TableCell>Less: SSS (capped at MSC ₱35,000 × 5%)</TableCell><TableCell className="text-right">−₱1,750.00</TableCell></TableRow>
                <TableRow><TableCell>Less: PhilHealth (₱60,000 × 2.5%)</TableCell><TableCell className="text-right">−₱1,500.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Pag-IBIG</TableCell><TableCell className="text-right">−₱100.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Monthly Personal Exemption</TableCell><TableCell className="text-right">−₱20,833.33</TableCell></TableRow>
                <TableRow className="bg-muted/50 font-semibold"><TableCell>Monthly Taxable Income</TableCell><TableCell className="text-right">₱35,816.67</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>
          <p>Annual taxable income = ₱35,816.67 × 12 = ₱429,800. Falls in the ₱400,001–₱800,000 bracket (20% rate).</p>
          <p>Annual tax = ₱22,500 + (₱429,800 − ₱400,000) × 20% = ₱22,500 + ₱5,960 = ₱28,460</p>
          <p><strong>Monthly Withholding Tax: ₱28,460 ÷ 12 = ₱2,371.67</strong></p>

          <h3>Example 4 — Manager (₱120,000/month)</h3>
          <div className="not-prose my-3 rounded-lg border overflow-hidden">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross Monthly Pay</TableCell><TableCell className="text-right">₱120,000.00</TableCell></TableRow>
                <TableRow><TableCell>Less: SSS (capped, MSC ₱35,000 × 5%)</TableCell><TableCell className="text-right">−₱1,750.00</TableCell></TableRow>
                <TableRow><TableCell>Less: PhilHealth (capped, ₱100,000 × 2.5%)</TableCell><TableCell className="text-right">−₱2,500.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Pag-IBIG</TableCell><TableCell className="text-right">−₱100.00</TableCell></TableRow>
                <TableRow><TableCell>Less: Monthly Personal Exemption</TableCell><TableCell className="text-right">−₱20,833.33</TableCell></TableRow>
                <TableRow className="bg-muted/50 font-semibold"><TableCell>Monthly Taxable Income</TableCell><TableCell className="text-right">₱94,816.67</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>
          <p>Annual taxable income = ₱94,816.67 × 12 = ₱1,137,800. Falls in the ₱800,001–₱2,000,000 bracket (25% rate).</p>
          <p>Annual tax = ₱102,500 + (₱1,137,800 − ₱800,000) × 25% = ₱102,500 + ₱84,450 = ₱186,950</p>
          <p><strong>Monthly Withholding Tax: ₱186,950 ÷ 12 = ₱15,579.17</strong></p>

          <h2>Quick Reference: Approximate Withholding Tax by Salary</h2>
          <div className="not-prose my-4 rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Monthly Basic Salary</TableHead>
                  <TableHead className="text-right">Approx. Monthly Tax</TableHead>
                  <TableHead className="text-right">Effective Tax Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>₱20,000</TableCell>
                  <TableCell className="text-right text-green-600 dark:text-green-400">₱0</TableCell>
                  <TableCell className="text-right">0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱30,000</TableCell>
                  <TableCell className="text-right">~₱1,317</TableCell>
                  <TableCell className="text-right">4.4%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱40,000</TableCell>
                  <TableCell className="text-right">~₱3,150</TableCell>
                  <TableCell className="text-right">7.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱50,000</TableCell>
                  <TableCell className="text-right">~₱5,317</TableCell>
                  <TableCell className="text-right">10.6%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱80,000</TableCell>
                  <TableCell className="text-right">~₱10,317</TableCell>
                  <TableCell className="text-right">12.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱100,000</TableCell>
                  <TableCell className="text-right">~₱14,983</TableCell>
                  <TableCell className="text-right">15.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>₱150,000</TableCell>
                  <TableCell className="text-right">~₱27,483</TableCell>
                  <TableCell className="text-right">18.3%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: These are approximations for employees with a consistent monthly salary, no other deductions, and no 13th month or bonus included in the computation.
          </p>

          <h2>Tax-Exempt Benefits You Should Know About</h2>
          <p>
            Not everything on your payslip is taxable. Under the TRAIN Law, the following are excluded from your taxable income:
          </p>
          <ul>
            <li><strong>13th Month Pay and other bonuses</strong> — exempt up to ₱90,000 per year</li>
            <li><strong>De minimis benefits</strong> — small perks like rice allowance (up to ₱2,000/month), clothing allowance (up to ₱6,000/year), medical cash allowance (up to ₱1,500/semester), and similar benefits within BIR-prescribed limits</li>
            <li><strong>SSS, PhilHealth, and Pag-IBIG contributions</strong> — fully deductible from gross income before tax</li>
            <li><strong>Minimum wage earners' compensation</strong> — fully exempt, including overtime, holiday pay, and night differential</li>
          </ul>

          <h2>Frequently Asked Questions</h2>

          <h3>Why does my December payslip show much higher tax?</h3>
          <p>
            In December, employers perform an <strong>annual tax reconciliation</strong>. They compute your total taxable income for the whole year and compare it against the total tax withheld in months 1–11. If the monthly withholdings were slightly low (which is common when bonuses or pay increases are involved), your employer withholds the shortfall in December to ensure your full year's tax is settled before filing the BIR Form 2316.
          </p>

          <h3>Do I still need to file an income tax return (ITR)?</h3>
          <p>
            Most employees with a single employer do not need to file their own ITR. Your employer files on your behalf through BIR Form 2316 and the annual alphalist. However, you must file your own ITR (BIR Form 1700) if you have income from multiple employers during the year, income from business or freelancing, or other taxable income not subject to final withholding tax.
          </p>

          <h3>I received a salary increase mid-year. Will my tax go up?</h3>
          <p>
            Yes. Your employer should recompute your withholding tax starting the month your salary increases, based on the annualized new salary. There may also be a catch-up adjustment in December to account for the transition period.
          </p>

          <h2>Use Our Free Tax Calculators</h2>
          <p>
            Skip the manual math. Our free tools compute your exact tax and take-home pay instantly:
          </p>
          <ul>
            <li><Link href="/bir-tax" className="text-primary hover:underline">BIR Income Tax Calculator</Link> — enter your annual income and get your exact tax bracket and amount</li>
            <li><Link href="/salary" className="text-primary hover:underline">Net Pay / Salary Calculator</Link> — see your complete take-home pay after all deductions including withholding tax</li>
          </ul>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Republic Act No. 10963 (TRAIN Law); BIR Revenue Regulations No. 8-2018, 11-2018; BIR Revenue Memorandum Circular No. 1-2023. This article reflects the tax rules effective January 2023 onwards (second tranche of TRAIN Law rate reductions) and is for informational purposes only. Consult a licensed tax professional for specific advice.
          </div>
        </div>
      </div>
    </Layout>
  );
}
