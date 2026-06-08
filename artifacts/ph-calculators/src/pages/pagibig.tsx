import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PAGIBIG_RATES, formatPHP, UPDATED_DATE } from "@/data/rates";
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PagIbigCalculator() {
  useEffect(() => {
    setPageSEO(
      "Pag-IBIG Contribution Calculator Philippines 2025 | PH Calculators",
      "Calculate your monthly Pag-IBIG (HDMF) contribution as an employee and employer. Updated for 2025 rates. Free and accurate."
    );
  }, []);

  const [monthlySalary, setMonthlySalary] = useState<string>("25000");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(monthlySalary) || 0;

    const basis = Math.min(salary, PAGIBIG_RATES.maxCompensation);
    const employeeRate = salary <= 1500 ? PAGIBIG_RATES.employeeRateLow : PAGIBIG_RATES.employeeRateHigh;
    const employeeContribution = Math.min(basis * employeeRate, PAGIBIG_RATES.maxEmployeeContribution);
    const employerContribution = Math.min(basis * PAGIBIG_RATES.employerRate, PAGIBIG_RATES.maxEmployerContribution);
    const totalContribution = employeeContribution + employerContribution;

    setResult({
      salary,
      basis,
      employeeRate,
      employeeContribution,
      employerContribution,
      totalContribution,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Pag-IBIG (HDMF) Contribution:
Monthly Salary: ${formatPHP(result.salary)}
Employee Share (${(result.employeeRate * 100).toFixed(0)}%): ${formatPHP(result.employeeContribution)}
Employer Share (2%): ${formatPHP(result.employerContribution)}
Total Monthly Contribution: ${formatPHP(result.totalContribution)}

Computed via PH Calculators`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard", description: "You can now paste the results." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Pag-IBIG Contribution Calculator</h1>
        <p className="text-muted-foreground mb-8">Calculate your monthly Pag-IBIG (HDMF) contribution for employees and employers.</p>

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
                    <Label htmlFor="monthlySalary">Monthly Basic Salary (PHP)</Label>
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
                  <Button type="submit" className="w-full">Calculate Pag-IBIG</Button>
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
                    <CardDescription>Based on HDMF contribution schedule</CardDescription>
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
                          <TableCell className="font-medium text-muted-foreground">Monthly Salary</TableCell>
                          <TableCell className="text-right">{formatPHP(result.salary)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-muted-foreground">
                            Compensation Basis
                            {result.salary > PAGIBIG_RATES.maxCompensation && (
                              <span className="block text-xs font-normal">Capped at ₱5,000</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{formatPHP(result.basis)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Employee Share ({(result.employeeRate * 100).toFixed(0)}%)
                          </TableCell>
                          <TableCell className="text-right font-bold text-destructive">
                            {formatPHP(result.employeeContribution)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Employer Share (2%)</TableCell>
                          <TableCell className="text-right text-primary">
                            {formatPHP(result.employerContribution)}
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>Total Monthly Contribution</TableCell>
                          <TableCell className="text-right">{formatPHP(result.totalContribution)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {result.salary > PAGIBIG_RATES.maxCompensation && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-lg border border-blue-200 dark:border-blue-800">
                      <strong>Note:</strong> Your salary exceeds the ₱5,000 maximum compensation basis. Contributions are capped at ₱100 per party (employee and employer).
                    </div>
                  )}

                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Last updated: {UPDATED_DATE} | Source: Home Development Mutual Fund (pagibigfund.gov.ph)
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[300px]">
                Enter your monthly salary to view your Pag-IBIG contribution breakdown.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the Pag-IBIG Contribution Calculator</h2>
          <p>
            The Home Development Mutual Fund (HDMF), more commonly known as Pag-IBIG Fund, is a government-owned and controlled corporation (GOCC) that provides Filipino workers with a national savings program and affordable housing financing. Our Pag-IBIG Contribution Calculator helps employees and employers compute the exact monthly contribution amount based on the current HDMF schedule.
          </p>

          <h3>How Pag-IBIG Contributions Are Computed</h3>
          <p>
            Pag-IBIG contributions are calculated based on a maximum compensation basis of ₱5,000. Even if you earn more than ₱5,000, the contribution is only computed on ₱5,000. The contribution rates are structured as follows:
          </p>
          <ul>
            <li><strong>Employees earning ₱1,500 or below:</strong> Employee Rate = 1% | Employer Rate = 2%</li>
            <li><strong>Employees earning above ₱1,500:</strong> Employee Rate = 2% | Employer Rate = 2%</li>
          </ul>
          <p>
            Since the contribution basis is capped at ₱5,000, the maximum employee deduction is ₱100 (2% × ₱5,000), and the maximum employer counterpart is also ₱100. However, members who wish to save more may opt to make voluntary contributions above this mandatory minimum.
          </p>

          <h3>Frequently Asked Questions (FAQ)</h3>

          <h4>Can I contribute more than the mandatory ₱100?</h4>
          <p>
            Yes. Pag-IBIG members are highly encouraged to make voluntary contributions above the mandatory amount. Your savings earn an annual dividend (which has historically ranged from 4% to over 7%), making it a tax-free savings vehicle. Voluntary contributions can be made directly through the Pag-IBIG Fund portal (Virtual Pag-IBIG) or through your employer.
          </p>

          <h4>What benefits does Pag-IBIG membership provide?</h4>
          <p>
            Active Pag-IBIG members are entitled to: housing loans (one of the most affordable mortgage programs in the Philippines), multi-purpose loans, calamity loans, and the return of total accumulated savings (TAV) including dividends upon reaching 240 monthly contributions, reaching age 60 (optional retirement) or 65 (mandatory), or upon permanent total disability or death.
          </p>

          <h4>Is Pag-IBIG contribution mandatory?</h4>
          <p>
            Yes. Under Republic Act No. 9679 (HDMF Law of 2009), membership and contribution to the Pag-IBIG Fund is mandatory for all employees covered by SSS and GSIS, as well as for employed OFWs. Employers who fail to remit contributions face administrative and criminal penalties.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Republic Act No. 9679 (Home Development Mutual Fund Law of 2009); HDMF Circular No. 274. Disclaimer: This calculator is for informational purposes only. Voluntary contribution options may vary.
          </div>
        </div>
      </div>
    </Layout>
  );
}
