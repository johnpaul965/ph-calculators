import { useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar } from "lucide-react";

export default function HowToReadYourPayslip() {
  useEffect(() => {
    setPageSEO(
      "How to Read Your Philippine Payslip: All Deductions Explained | PH Calculators",
      "A complete plain-language guide to understanding every line on a Filipino payslip — SSS, PhilHealth, Pag-IBIG, withholding tax, and how your net take-home pay is computed."
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
          <span>8 min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          How to Read Your Philippine Payslip: All Deductions Explained
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg text-muted-foreground">
            If you've ever looked at your payslip and wondered why there is such a big gap between your gross salary and your take-home pay, you're not alone. This guide explains every deduction on a standard Filipino payslip in plain language — no accounting degree required.
          </p>

          <h2>The Anatomy of a Philippine Payslip</h2>
          <p>
            A typical payslip in the Philippines has two main sections: <strong>Earnings</strong> (what you are paid) and <strong>Deductions</strong> (what is taken out before you receive your money). Your <strong>Net Pay</strong> is the result of subtracting total deductions from total earnings.
          </p>
          <p className="font-semibold text-center bg-muted rounded-lg not-prose px-4 py-3 my-4">
            Net Pay = Gross Pay − Government Deductions − Tax Withholding − Other Deductions
          </p>

          <h2>Section 1: Earnings (Your Gross Pay)</h2>
          <p>
            Your gross pay is the total amount you earned before any deductions. It typically includes:
          </p>
          <div className="not-prose my-4 rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Payslip Line</TableHead>
                  <TableHead>What It Means</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Basic Salary</TableCell>
                  <TableCell>Your contractual monthly pay. This is the base used for all government deduction calculations.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Overtime Pay</TableCell>
                  <TableCell>Additional pay for hours worked beyond 8 hours/day. Rate depends on the day type (see our <Link href="/overtime" className="text-primary hover:underline">Overtime Calculator</Link>).</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Holiday Pay</TableCell>
                  <TableCell>Extra compensation for working on a regular or special holiday.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Night Differential</TableCell>
                  <TableCell>10% premium for hours worked between 10:00 PM and 6:00 AM.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Allowances</TableCell>
                  <TableCell>Transportation, meal, housing allowances — often non-taxable if within DOLE/BIR limits.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h2>Section 2: Government Mandatory Deductions</h2>
          <p>
            Every private-sector employee must contribute to three government agencies. These deductions are not optional — they are required by law. The good news: your employer also contributes a counterpart amount on your behalf that does not come out of your pay.
          </p>

          <h3>1. SSS (Social Security System)</h3>
          <p>
            SSS provides protection against sickness, disability, maternity, retirement, and death. Your monthly contribution depends on your monthly salary bracket.
          </p>
          <ul>
            <li><strong>2025 Employee Share:</strong> 5.0% of your Monthly Salary Credit (MSC)</li>
            <li><strong>2025 Employer Share:</strong> 10.0% of your MSC (paid by your company, not deducted from you)</li>
            <li><strong>MSC Cap:</strong> ₱35,000 (contributions don't increase above this salary level)</li>
          </ul>
          <p>
            Example: If you earn ₱30,000/month, your SSS deduction is ₱30,000 × 5% = <strong>₱1,500</strong>. Use our <Link href="/sss" className="text-primary hover:underline">SSS Calculator</Link> to get your exact amount.
          </p>

          <h3>2. PhilHealth (Philippine Health Insurance Corporation)</h3>
          <p>
            PhilHealth covers hospitalization and outpatient medical expenses for you and your dependents.
          </p>
          <ul>
            <li><strong>Total Premium Rate (2025):</strong> 5.0% of basic monthly salary</li>
            <li><strong>Employee Share:</strong> 2.5% (deducted from your pay)</li>
            <li><strong>Employer Share:</strong> 2.5% (paid by your company)</li>
            <li><strong>Salary Floor:</strong> ₱10,000 (minimum premium basis)</li>
            <li><strong>Salary Ceiling:</strong> ₱100,000 (maximum premium basis)</li>
          </ul>
          <p>
            Example: If you earn ₱30,000/month, your PhilHealth deduction is ₱30,000 × 2.5% = <strong>₱750</strong>. Use our <Link href="/philhealth" className="text-primary hover:underline">PhilHealth Calculator</Link>.
          </p>

          <h3>3. Pag-IBIG (HDMF — Home Development Mutual Fund)</h3>
          <p>
            Pag-IBIG provides a national savings program and housing loan financing.
          </p>
          <ul>
            <li><strong>Employee Rate:</strong> 1% if salary ≤ ₱1,500; 2% if salary &gt; ₱1,500</li>
            <li><strong>Employer Rate:</strong> 2% of your salary (up to ₱5,000 basis)</li>
            <li><strong>Maximum employee contribution:</strong> ₱100/month (based on ₱5,000 cap)</li>
          </ul>
          <p>
            For most employees earning above ₱5,000/month, the Pag-IBIG deduction is a flat <strong>₱100</strong>. Use our <Link href="/pagibig" className="text-primary hover:underline">Pag-IBIG Calculator</Link> to verify.
          </p>

          <h2>Section 3: Withholding Tax (BIR)</h2>
          <p>
            Withholding tax is the income tax your employer withholds from your monthly salary on behalf of the Bureau of Internal Revenue (BIR). It is computed based on the <strong>TRAIN Law tax table</strong> using your taxable income.
          </p>
          <p>
            Your <strong>taxable income</strong> is computed as:
          </p>
          <p className="font-semibold text-center bg-muted rounded-lg not-prose px-4 py-3 my-4">
            Taxable Income = Gross Pay − SSS − PhilHealth − Pag-IBIG − ₱25,000 personal exemption*
          </p>
          <p className="text-sm text-muted-foreground">
            *The monthly personal exemption is 1/12 of the annual ₱250,000 exempt threshold.
          </p>
          <p>
            Employees earning a gross annual income of ₱250,000 or below (roughly ₱20,833/month) pay <strong>zero income tax</strong> under the TRAIN Law.
          </p>

          <h2>A Real Payslip Example</h2>
          <p>Let's walk through a complete example for an employee earning ₱30,000/month basic salary:</p>
          <div className="not-prose my-4 rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead colSpan={2}>EARNINGS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell className="text-right">₱30,000.00</TableCell>
                </TableRow>
                <TableRow className="bg-muted/30 font-semibold">
                  <TableCell>Gross Pay</TableCell>
                  <TableCell className="text-right">₱30,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="pt-4 font-semibold text-muted-foreground">DEDUCTIONS</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SSS Contribution</TableCell>
                  <TableCell className="text-right text-destructive">−₱1,500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PhilHealth Premium</TableCell>
                  <TableCell className="text-right text-destructive">−₱750.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pag-IBIG Contribution</TableCell>
                  <TableCell className="text-right text-destructive">−₱100.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Withholding Tax (BIR)</TableCell>
                  <TableCell className="text-right text-destructive">−₱1,316.67</TableCell>
                </TableRow>
                <TableRow className="bg-muted/30 font-semibold">
                  <TableCell>Total Deductions</TableCell>
                  <TableCell className="text-right">−₱3,666.67</TableCell>
                </TableRow>
                <TableRow className="bg-primary/10 font-bold text-lg">
                  <TableCell className="text-primary">NET PAY (Take-Home)</TableCell>
                  <TableCell className="text-right text-primary">₱26,333.33</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h2>Verify Your Own Payslip</h2>
          <p>
            Use our suite of free calculators to verify every line on your payslip independently:
          </p>
          <ul>
            <li><Link href="/salary" className="text-primary hover:underline">Net Pay / Salary Calculator</Link> — complete take-home pay computation in one step</li>
            <li><Link href="/bir-tax" className="text-primary hover:underline">BIR Income Tax Calculator</Link> — verify your withholding tax amount</li>
            <li><Link href="/sss" className="text-primary hover:underline">SSS Calculator</Link> — check your SSS deduction</li>
            <li><Link href="/philhealth" className="text-primary hover:underline">PhilHealth Calculator</Link> — verify your premium</li>
            <li><Link href="/pagibig" className="text-primary hover:underline">Pag-IBIG Calculator</Link> — confirm your HDMF contribution</li>
          </ul>

          <h2>What To Do If Your Payslip Looks Wrong</h2>
          <p>
            If your deductions appear higher or lower than expected after using our calculators:
          </p>
          <ol>
            <li><strong>Talk to your HR or payroll department first.</strong> There may be loan repayments, salary advances, or other deductions you've forgotten about.</li>
            <li><strong>Check your SSS online.</strong> Log in to my.sss.gov.ph to verify that your employer is posting your declared contributions correctly.</li>
            <li><strong>Verify your PhilHealth.</strong> Check the PhilHealth Member Portal to confirm posted contributions.</li>
            <li><strong>If you suspect underpayment of wages,</strong> you may file a complaint with your nearest DOLE regional office or use the SEnA (Single Entry Approach) process.</li>
          </ol>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Bureau of Internal Revenue (BIR); Republic Act No. 10963 (TRAIN Law); Social Security System (SSS); Philippine Health Insurance Corporation (PhilHealth); Home Development Mutual Fund (Pag-IBIG). This article is for general informational purposes only.
          </div>
        </div>
      </div>
    </Layout>
  );
}
