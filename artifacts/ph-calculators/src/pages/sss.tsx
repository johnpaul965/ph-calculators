import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SSS_RATES, formatPHP, UPDATED_DATE } from "@/data/rates";
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SSSCalculator() {
  useEffect(() => {
    setPageSEO(
      "SSS Contribution Calculator Philippines 2025 | PH Calculators",
      "Compute your monthly SSS contribution as an employee or employer. Updated for the 2025 SSS contribution rate of 15%. Free and accurate."
    );
  }, []);
  const [monthlySalary, setMonthlySalary] = useState<string>("30000");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(monthlySalary) || 0;
    
    // 2024 Computation
    const msc2024 = Math.min(
      Math.max(Math.ceil(salary / 500) * 500, SSS_RATES[2024].minMSC),
      SSS_RATES[2024].maxMSC
    );
    const ee2024 = msc2024 * SSS_RATES[2024].employeeShare;
    const er2024 = msc2024 * SSS_RATES[2024].employerShare;
    
    // 2025 Computation
    const msc2025 = Math.min(
      Math.max(Math.ceil(salary / 500) * 500, SSS_RATES[2025].minMSC),
      SSS_RATES[2025].maxMSC
    );
    const ee2025 = msc2025 * SSS_RATES[2025].employeeShare;
    const er2025 = msc2025 * SSS_RATES[2025].employerShare;

    setResult({
      salary,
      2024: {
        msc: msc2024,
        employee: ee2024,
        employer: er2024,
        total: ee2024 + er2024
      },
      2025: {
        msc: msc2025,
        employee: ee2025,
        employer: er2025,
        total: ee2025 + er2025
      }
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `SSS Contribution Computation:
Monthly Salary: ${formatPHP(result.salary)}

2024 Rates (14%):
Employee Share: ${formatPHP(result[2024].employee)}
Employer Share: ${formatPHP(result[2024].employer)}
Total: ${formatPHP(result[2024].total)}

2025 Rates (15%):
Employee Share: ${formatPHP(result[2025].employee)}
Employer Share: ${formatPHP(result[2025].employer)}
Total: ${formatPHP(result[2025].total)}

Computed via PH Calculators`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the results.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">SSS Contribution Calculator</h1>
        <p className="text-muted-foreground mb-8">Calculate your monthly Social Security System (SSS) contributions for both 2024 and 2025 rates.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Details</CardTitle>
                <CardDescription>Enter your monthly basic salary.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthlySalary">Monthly Salary (PHP)</Label>
                    <Input 
                      id="monthlySalary" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Calculate SSS</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            {result ? (
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b border-border pb-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Contribution Breakdown</CardTitle>
                    <CardDescription>Comparing 2024 and 2025 rates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead>Details</TableHead>
                          <TableHead className="text-right">2024 Rates (14%)</TableHead>
                          <TableHead className="text-right">2025 Rates (15%)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-muted-foreground">Monthly Salary Credit (MSC)</TableCell>
                          <TableCell className="text-right">{formatPHP(result[2024].msc)}</TableCell>
                          <TableCell className="text-right">{formatPHP(result[2025].msc)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Employee Share</TableCell>
                          <TableCell className="text-right font-bold text-destructive">
                            {formatPHP(result[2024].employee)} <span className="text-xs font-normal text-muted-foreground block">(4.5%)</span>
                          </TableCell>
                          <TableCell className="text-right font-bold text-destructive">
                            {formatPHP(result[2025].employee)} <span className="text-xs font-normal text-muted-foreground block">(5.0%)</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Employer Share</TableCell>
                          <TableCell className="text-right text-primary">
                            {formatPHP(result[2024].employer)} <span className="text-xs font-normal text-muted-foreground block">(9.5%)</span>
                          </TableCell>
                          <TableCell className="text-right text-primary">
                            {formatPHP(result[2025].employer)} <span className="text-xs font-normal text-muted-foreground block">(10.0%)</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>Total Monthly Contribution</TableCell>
                          <TableCell className="text-right">{formatPHP(result[2024].total)}</TableCell>
                          <TableCell className="text-right">{formatPHP(result[2025].total)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Last updated: {UPDATED_DATE} | Source: Social Security System (sss.gov.ph)
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[300px]">
                Enter your monthly salary to view your SSS contribution breakdown.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the SSS Contribution Calculator</h2>
          <p>
            The Social Security System (SSS) is a state-run social insurance program in the Philippines that provides protection against the hazards of disability, sickness, maternity, old age, death, and other contingencies. Our SSS Contribution Calculator helps private employees, employers, and voluntary members determine their exact monthly contributions based on their declared compensation.
          </p>

          <h3>How to Use the Calculator</h3>
          <p>
            Simply enter your basic monthly salary into the input field and click "Calculate SSS". The tool will instantly generate a breakdown of the employee's share (deducted from your payslip) and the employer's share (paid by your company). We provide side-by-side computations for 2024 and 2025 to help you prepare for the scheduled rate increases.
          </p>

          <h3>Understanding SSS Contribution Rates</h3>
          <p>
            The SSS uses a "Monthly Salary Credit" (MSC) system to determine your contribution bracket. Rather than taking a straight percentage of your exact salary, your salary falls into a specific bracket with an assigned MSC. The contribution percentage is then applied to this MSC.
          </p>
          <ul>
            <li><strong>2024 Rates:</strong> The total contribution rate is 14% of the MSC. For regular employees, this is split into 4.5% (Employee Share) and 9.5% (Employer Share).</li>
            <li><strong>2025 Scheduled Rates:</strong> Per Republic Act No. 11199 (Social Security Act of 2018), the total contribution rate is scheduled to increase to 15% starting January 2025. This will be split into 5.0% for the employee and 10.0% for the employer.</li>
          </ul>

          <h3>Frequently Asked Questions (FAQ)</h3>
          
          <h4>Is there a maximum cap on SSS contributions?</h4>
          <p>
            Yes. For 2024 and 2025, the Maximum Monthly Salary Credit (MSC) is capped at ₱35,000. If you earn ₱50,000, ₱100,000, or even ₱500,000 a month, your contribution will be computed based on the ₱35,000 MSC cap. Therefore, your deduction will not exceed the maximum limit for that bracket.
          </p>

          <h4>What if I am a self-employed or voluntary member?</h4>
          <p>
            If you are self-employed, an Overseas Filipino Worker (OFW), or a voluntary paying member, you do not have an employer to share the cost. You are responsible for paying the full total rate (14% in 2024, 15% in 2025) of your chosen Monthly Salary Credit.
          </p>

          <h4>Does my employer need to pay their share?</h4>
          <p>
            Yes, under the law, it is mandatory for employers to pay their share of the SSS contribution and to remit the total amount (employer + employee shares) to the SSS on time. Failure to do so can result in severe penalties for the employer.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Republic Act No. 11199 (Social Security Act of 2018), SSS Circular No. 2022-033, and official announcements from sss.gov.ph. Disclaimer: This tool is for estimation and informational purposes only.
          </div>
        </div>
      </div>
    </Layout>
  );
}
