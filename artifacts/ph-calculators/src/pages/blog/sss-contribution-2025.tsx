import { useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar } from "lucide-react";

export default function SSSContribution2025() {
  useEffect(() => {
    setPageSEO(
      "How to Compute Your SSS Contribution in 2025 | PH Calculators",
      "Step-by-step guide to computing your SSS contribution in 2025. Includes the new 15% rate, updated MSC table, examples for employees and self-employed, and a free calculator."
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
          <span>6 min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          How to Compute Your SSS Contribution in 2025
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg text-muted-foreground">
            Starting January 2025, the SSS contribution rate increased to 15% — up from 14% in 2024. This guide walks you through the exact computation method, the updated Monthly Salary Credit (MSC) table, and real examples for employees, employers, and self-employed members.
          </p>

          <h2>What Changed in 2025?</h2>
          <p>
            Under Republic Act No. 11199 (Social Security Act of 2018), SSS contribution rates are scheduled to increase gradually each year until they reach 15% in 2025. The phased increase ensures that the SSS fund remains solvent and able to pay benefits to millions of Filipino workers.
          </p>
          <p>Here is the rate progression:</p>
          <div className="not-prose my-4 rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Total Rate</TableHead>
                  <TableHead className="text-right">Employee Share</TableHead>
                  <TableHead className="text-right">Employer Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023</TableCell>
                  <TableCell className="text-right">13%</TableCell>
                  <TableCell className="text-right">4.5%</TableCell>
                  <TableCell className="text-right">8.5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024</TableCell>
                  <TableCell className="text-right">14%</TableCell>
                  <TableCell className="text-right">4.5%</TableCell>
                  <TableCell className="text-right">9.5%</TableCell>
                </TableRow>
                <TableRow className="bg-primary/5 font-semibold">
                  <TableCell>2025 (Current)</TableCell>
                  <TableCell className="text-right text-primary">15%</TableCell>
                  <TableCell className="text-right text-primary">5.0%</TableCell>
                  <TableCell className="text-right text-primary">10.0%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h2>Step 1: Understand the Monthly Salary Credit (MSC) System</h2>
          <p>
            SSS does not apply the contribution rate directly to your exact salary. Instead, your salary is mapped to a standardized <strong>Monthly Salary Credit (MSC)</strong> bracket. The MSC is always a round number, and the contribution is calculated based on that number.
          </p>
          <p>
            The MSC brackets work in increments of ₱500. For example, if you earn ₱22,250 per month, your salary falls between the ₱22,000 and ₱22,500 brackets. SSS rounds up, so your MSC would be ₱22,500.
          </p>
          <p>
            In 2025, the MSC range is:
          </p>
          <ul>
            <li><strong>Minimum MSC:</strong> ₱5,000</li>
            <li><strong>Maximum MSC:</strong> ₱35,000</li>
          </ul>
          <p>
            No matter how much you earn above ₱35,000, your contribution will always be computed on the ₱35,000 MSC cap.
          </p>

          <h2>Step 2: The Contribution Formula</h2>
          <p>The formula is simple once you know your MSC:</p>
          <ul>
            <li><strong>Employee Share (5.0%)</strong> = MSC × 0.05</li>
            <li><strong>Employer Share (10.0%)</strong> = MSC × 0.10</li>
            <li><strong>Total Monthly Contribution</strong> = MSC × 0.15</li>
          </ul>

          <h2>Step 3: Worked Examples</h2>

          <h3>Example 1 — Regular Employee earning ₱30,000/month</h3>
          <p>
            Since ₱30,000 is already divisible by ₱500, the MSC is exactly ₱30,000.
          </p>
          <ul>
            <li>Employee deduction: ₱30,000 × 5.0% = <strong>₱1,500.00</strong></li>
            <li>Employer counterpart: ₱30,000 × 10.0% = <strong>₱3,000.00</strong></li>
            <li>Total remittance: <strong>₱4,500.00</strong></li>
          </ul>

          <h3>Example 2 — Employee earning ₱18,750/month</h3>
          <p>
            ₱18,750 ÷ ₱500 = 37.5 → rounds up to 38 → MSC = 38 × ₱500 = <strong>₱19,000</strong>
          </p>
          <ul>
            <li>Employee deduction: ₱19,000 × 5.0% = <strong>₱950.00</strong></li>
            <li>Employer counterpart: ₱19,000 × 10.0% = <strong>₱1,900.00</strong></li>
            <li>Total remittance: <strong>₱2,850.00</strong></li>
          </ul>

          <h3>Example 3 — High earner at ₱80,000/month</h3>
          <p>
            ₱80,000 exceeds the ₱35,000 MSC cap. The MSC is capped at ₱35,000.
          </p>
          <ul>
            <li>Employee deduction: ₱35,000 × 5.0% = <strong>₱1,750.00</strong></li>
            <li>Employer counterpart: ₱35,000 × 10.0% = <strong>₱3,500.00</strong></li>
            <li>Total remittance: <strong>₱5,250.00</strong></li>
          </ul>

          <h3>Example 4 — Self-Employed / Voluntary Member earning ₱25,000/month</h3>
          <p>
            Self-employed and voluntary members pay the full 15% themselves (no employer to share the cost). MSC = ₱25,000.
          </p>
          <ul>
            <li>Full contribution: ₱25,000 × 15% = <strong>₱3,750.00</strong></li>
          </ul>

          <h2>Key Reminders for 2025</h2>
          <ul>
            <li><strong>Employers must remit on time.</strong> Late payments incur a penalty of 2% per month on the amount due. Employees should check their SSS contributions online to ensure their employer is remitting properly.</li>
            <li><strong>Check your contributions online.</strong> Visit the My.SSS portal at my.sss.gov.ph or use the SSS mobile app to verify that all posted contributions are correct.</li>
            <li><strong>Minimum MSC increase.</strong> The 2025 minimum MSC is ₱5,000 (up from ₱4,000 in 2024). Workers earning below ₱5,000 per month will have their contribution computed on the ₱5,000 floor.</li>
            <li><strong>OFW members:</strong> Overseas Filipino Workers who are registered as OFW members have a minimum MSC of ₱8,000 and must pay the full 15% rate.</li>
          </ul>

          <h2>Use Our Free SSS Calculator</h2>
          <p>
            Instead of computing manually, you can use our <Link href="/sss" className="text-primary hover:underline">SSS Contribution Calculator</Link> to instantly get your 2024 and 2025 contribution amounts side by side. Just enter your monthly basic salary and get the full breakdown in seconds.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Republic Act No. 11199 (Social Security Act of 2018); SSS Circular No. 2022-033; official announcements from sss.gov.ph. This article is for informational purposes only and reflects rates as of January 2025.
          </div>
        </div>
      </div>
    </Layout>
  );
}
