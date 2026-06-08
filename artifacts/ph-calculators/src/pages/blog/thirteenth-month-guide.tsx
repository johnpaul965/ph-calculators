import { useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar } from "lucide-react";

export default function ThirteenthMonthGuide() {
  useEffect(() => {
    setPageSEO(
      "13th Month Pay Philippines: Complete Guide 2025 | PH Calculators",
      "Complete guide to 13th month pay in the Philippines. Learn who is entitled, how to compute it, when it must be released, whether it is taxable, and what happens when you resign."
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
          <span>7 min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          13th Month Pay in the Philippines: Complete Guide for 2025
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg text-muted-foreground">
            The 13th month pay is one of the most important mandatory benefits for Filipino workers. Yet many employees don't fully understand how it's computed, whether they qualify, or what happens if they resign before December. This complete guide answers every common question.
          </p>

          <h2>What Is the 13th Month Pay?</h2>
          <p>
            The 13th month pay is an additional compensation mandated by <strong>Presidential Decree No. 851</strong>, signed by President Ferdinand Marcos Sr. on December 16, 1975. It requires all private-sector employers to pay their rank-and-file employees an amount equivalent to at least one-twelfth (1/12) of their total basic salary earned within the calendar year.
          </p>
          <p>
            In plain terms: if you work the full year with a consistent salary, your 13th month pay equals one full month's basic pay. If you joined mid-year or resigned before December, you receive a proportional (pro-rated) amount.
          </p>

          <h2>Who Is Entitled to 13th Month Pay?</h2>
          <p>All rank-and-file employees in the private sector are entitled to 13th month pay, provided they have worked at least one (1) month during the calendar year. This includes:</p>
          <ul>
            <li>Regular full-time employees</li>
            <li>Part-time employees (pro-rated based on actual days/hours worked)</li>
            <li>Employees who have resigned or been separated from the company, provided they worked at least one month</li>
            <li>Employees on maternity leave, paternity leave, or other government-mandated leaves (these periods are counted in the computation)</li>
            <li>Employees on probation</li>
          </ul>

          <h3>Who Is NOT Covered?</h3>
          <ul>
            <li>Government employees (they receive a separate Year-End Bonus under a different law)</li>
            <li>Managerial employees (those who have the power to hire/fire and exercise management discretion) — unless a company policy grants them this benefit voluntarily</li>
            <li>Household helpers (kasambahay) — they have their own benefit rules under RA 10361</li>
            <li>Workers paid on a purely commission, boundary, or task basis where no fixed salary exists</li>
          </ul>

          <h2>The Official Formula</h2>
          <p>
            Under DOLE's implementing rules for PD 851:
          </p>
          <p className="font-semibold text-center py-2 bg-muted rounded-lg not-prose px-4 py-3 my-4">
            13th Month Pay = Total Basic Salary Earned During the Calendar Year ÷ 12
          </p>
          <p>
            The key phrase here is <em>basic salary earned</em>. Only the basic pay is included — not overtime pay, premium pay, night shift differential, holiday pay, cost-of-living allowances, or other monetary benefits.
          </p>

          <h2>Worked Examples</h2>

          <h3>Example 1 — Full Year, Fixed Salary</h3>
          <p>Maria earns ₱25,000/month basic salary and worked the full calendar year (January–December).</p>
          <ul>
            <li>Total basic salary earned: ₱25,000 × 12 = ₱300,000</li>
            <li>13th Month Pay: ₱300,000 ÷ 12 = <strong>₱25,000.00</strong></li>
          </ul>

          <h3>Example 2 — Hired Mid-Year (Pro-rated)</h3>
          <p>Jose was hired on July 1 and worked until December 31 (6 months). His basic salary is ₱20,000/month.</p>
          <ul>
            <li>Total basic salary earned: ₱20,000 × 6 = ₱120,000</li>
            <li>13th Month Pay: ₱120,000 ÷ 12 = <strong>₱10,000.00</strong></li>
          </ul>

          <h3>Example 3 — Resigned Before December</h3>
          <p>Ana resigned on October 31 after working 10 months of the year. Her basic salary was ₱18,000/month.</p>
          <ul>
            <li>Total basic salary earned: ₱18,000 × 10 = ₱180,000</li>
            <li>13th Month Pay: ₱180,000 ÷ 12 = <strong>₱15,000.00</strong></li>
          </ul>
          <p>This must be included in her final pay upon separation.</p>

          <h3>Example 4 — Salary Changed Mid-Year</h3>
          <p>Carlos received a salary increase on July 1 — from ₱22,000 to ₱26,000.</p>
          <ul>
            <li>Jan–Jun: ₱22,000 × 6 = ₱132,000</li>
            <li>Jul–Dec: ₱26,000 × 6 = ₱156,000</li>
            <li>Total basic salary earned: ₱288,000</li>
            <li>13th Month Pay: ₱288,000 ÷ 12 = <strong>₱24,000.00</strong></li>
          </ul>

          <h2>When Must It Be Paid?</h2>
          <p>
            The law mandates that 13th month pay must be paid to employees <strong>on or before December 24</strong> of every year. Many employers opt to release it in two tranches as a matter of policy:
          </p>
          <div className="not-prose my-4 rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Release Schedule</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Basis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>June (Mid-Year)</TableCell>
                  <TableCell>50% of expected 13th month pay</TableCell>
                  <TableCell>Company policy (above the legal minimum)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>December (on or before Dec 24)</TableCell>
                  <TableCell>Remaining 50% (or 100% if not yet released)</TableCell>
                  <TableCell>Legally required under PD 851</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p>
            Note that releasing the 13th month pay in two tranches is a company practice, not a legal requirement. The only legal requirement is that the full amount be paid on or before December 24.
          </p>

          <h2>Is 13th Month Pay Taxable?</h2>
          <p>
            Under the <strong>TRAIN Law (Republic Act No. 10963)</strong>, the 13th month pay and other bonuses are <strong>tax-exempt up to ₱90,000</strong> in aggregate per calendar year. This means:
          </p>
          <ul>
            <li>If your 13th month pay + other bonuses ≤ ₱90,000 → <strong>fully tax-free</strong></li>
            <li>If your 13th month pay + other bonuses &gt; ₱90,000 → only the <strong>excess above ₱90,000</strong> is subject to withholding tax</li>
          </ul>
          <p>
            For most rank-and-file employees, the 13th month pay falls below the ₱90,000 threshold, so it is fully exempt from income tax.
          </p>

          <h2>What If Your Employer Doesn't Pay?</h2>
          <p>
            Failure to pay the 13th month pay is a violation of labor law. Employees may file a complaint with the <strong>Department of Labor and Employment (DOLE)</strong> through the Single Entry Approach (SEnA) program. Employers found to be in violation face fines and may be required to pay double the unpaid amount as damages.
          </p>

          <h2>Compute Yours Now</h2>
          <p>
            Use our free <Link href="/13th-month" className="text-primary hover:underline">13th Month Pay Calculator</Link> to instantly compute your exact entitlement — whether you worked the full year or just a few months.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Presidential Decree No. 851; DOLE Explanatory Bulletin on PD 851; Republic Act No. 10963 (TRAIN Law). This article is for informational purposes and reflects rules as of 2025.
          </div>
        </div>
      </div>
    </Layout>
  );
}
