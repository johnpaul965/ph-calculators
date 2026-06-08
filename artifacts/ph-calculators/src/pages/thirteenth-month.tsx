import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatPHP, UPDATED_DATE } from "@/data/rates";
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ThirteenthMonthCalculator() {
  useEffect(() => {
    setPageSEO(
      "13th Month Pay Calculator Philippines 2025 | PH Calculators",
      "Compute your 13th month pay under Presidential Decree 851. Enter your basic salary and months worked to get your exact 13th month pay amount."
    );
  }, []);

  const [basicSalary, setBasicSalary] = useState<string>("25000");
  const [monthsWorked, setMonthsWorked] = useState<string>("12");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(basicSalary) || 0;
    const months = Math.min(Math.max(parseFloat(monthsWorked) || 0, 0), 12);

    const totalBasicSalaryEarned = salary * months;
    const thirteenthMonthPay = totalBasicSalaryEarned / 12;

    setResult({
      salary,
      months,
      totalBasicSalaryEarned,
      thirteenthMonthPay,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `13th Month Pay Computation:
Monthly Basic Salary: ${formatPHP(result.salary)}
Months Worked: ${result.months}
Total Basic Salary Earned: ${formatPHP(result.totalBasicSalaryEarned)}
13th Month Pay: ${formatPHP(result.thirteenthMonthPay)}

Computed via PH Calculators`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard", description: "You can now paste the results." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">13th Month Pay Calculator</h1>
        <p className="text-muted-foreground mb-8">Compute your 13th month pay under Presidential Decree No. 851.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Pay Details</CardTitle>
                <CardDescription>Enter your basic salary and months worked this calendar year.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary">Monthly Basic Salary (PHP)</Label>
                    <Input
                      id="basicSalary"
                      type="number"
                      min="0"
                      step="0.01"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthsWorked">Months Worked (1–12)</Label>
                    <Input
                      id="monthsWorked"
                      type="number"
                      min="1"
                      max="12"
                      step="0.5"
                      value={monthsWorked}
                      onChange={(e) => setMonthsWorked(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Use decimals for partial months (e.g. 11.5)</p>
                  </div>
                  <Button type="submit" className="w-full">Calculate 13th Month Pay</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            {result ? (
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b border-border pb-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">13th Month Pay Breakdown</CardTitle>
                    <CardDescription>Based on PD 851 formula: Total Basic Salary ÷ 12</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-muted-foreground">Monthly Basic Salary</TableCell>
                          <TableCell className="text-right">{formatPHP(result.salary)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-muted-foreground">Months Worked</TableCell>
                          <TableCell className="text-right">{result.months} month{result.months !== 1 ? "s" : ""}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Total Basic Salary Earned</TableCell>
                          <TableCell className="text-right">{formatPHP(result.totalBasicSalaryEarned)}</TableCell>
                        </TableRow>
                        <TableRow className="bg-primary/10 font-bold">
                          <TableCell className="text-primary">13th Month Pay</TableCell>
                          <TableCell className="text-right text-primary text-lg">{formatPHP(result.thirteenthMonthPay)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {result.months < 12 && (
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm rounded-lg border border-amber-200 dark:border-amber-800">
                      <strong>Partial Year:</strong> You worked {result.months} out of 12 months. Employees who have worked at least one (1) month during the calendar year are entitled to a pro-rated 13th month pay.
                    </div>
                  )}

                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Last updated: {UPDATED_DATE} | Source: Presidential Decree No. 851
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[300px]">
                Enter your salary details to compute your 13th month pay.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the 13th Month Pay Calculator</h2>
          <p>
            The 13th Month Pay is a mandatory government-mandated employee benefit in the Philippines, governed by Presidential Decree No. 851. It requires all employers to provide rank-and-file employees with a minimum of one-twelfth (1/12) of their total basic salary earned within the calendar year. Our calculator makes it simple to determine your exact entitlement whether you worked the full year or just a portion of it.
          </p>

          <h3>The Official Formula</h3>
          <p>
            The formula under PD 851 is straightforward:
          </p>
          <p>
            <strong>13th Month Pay = Total Basic Salary Earned During the Year ÷ 12</strong>
          </p>
          <p>
            If you worked the entire year and your monthly basic salary is consistent, the result is simply equal to one month's basic pay. For employees who joined mid-year or have varying salary periods, only the actual basic salary received is counted.
          </p>

          <h3>Who Is Entitled to 13th Month Pay?</h3>
          <ul>
            <li>All rank-and-file employees in the private sector who have worked for at least one (1) month during the calendar year.</li>
            <li>Part-time employees who render services for at least one month.</li>
            <li>Employees who have resigned or were separated from work before the payout date, provided they worked for at least one month.</li>
          </ul>
          <p>
            Government employees are generally not covered by PD 851 as they receive their own version of the benefit (often called a "Year-End Bonus") under a separate law.
          </p>

          <h3>Frequently Asked Questions (FAQ)</h3>

          <h4>What is not included in the computation of basic salary?</h4>
          <p>
            The 13th month pay is based on basic salary only. Allowances (transportation, housing, meal), overtime pay, holiday pay, night differential, and other monetary benefits that are not part of your contractual basic rate are excluded from the computation. However, if these items have been integrated into your basic pay, they may be counted.
          </p>

          <h4>When must the 13th month pay be released?</h4>
          <p>
            Under the law, the 13th month pay must be paid to employees on or before December 24 of every year. Some employers opt to release it in two tranches — one in June (mid-year) and one in December — as a matter of company policy, which is a practice above and beyond the legal minimum.
          </p>

          <h4>Is 13th month pay taxable?</h4>
          <p>
            Under the TRAIN Law (Republic Act No. 10963), the 13th month pay and other benefits are tax-exempt up to ₱90,000 in aggregate per year. If the total of your 13th month pay and other bonuses/incentives exceeds ₱90,000, only the amount above the threshold is subject to income tax.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Presidential Decree No. 851 (13th Month Pay Law); DOLE Explanatory Bulletin; Republic Act No. 10963 (TRAIN Law). Disclaimer: This calculator is provided for informational purposes only.
          </div>
        </div>
      </div>
    </Layout>
  );
}
