import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PHILHEALTH_RATES, formatPHP, UPDATED_DATE } from "@/data/rates";
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PhilHealthCalculator() {
  useEffect(() => {
    setPageSEO(
      "PhilHealth Contribution Calculator Philippines 2025 | PH Calculators",
      "Calculate your monthly PhilHealth premium contribution. Based on the current 5% rate under the Universal Health Care Act. Updated for 2025."
    );
  }, []);
  const [monthlySalary, setMonthlySalary] = useState<string>("30000");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(monthlySalary) || 0;
    
    const basis = Math.min(
      Math.max(salary, PHILHEALTH_RATES.minSalary),
      PHILHEALTH_RATES.maxSalary
    );
    
    const totalPremium = basis * PHILHEALTH_RATES.rate;
    const employeeShare = totalPremium / 2;
    const employerShare = totalPremium / 2;

    setResult({
      salary,
      basis,
      employeeShare,
      employerShare,
      totalPremium
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `PhilHealth Contribution:
Monthly Salary: ${formatPHP(result.salary)}
Total Premium (5%): ${formatPHP(result.totalPremium)}
Employee Share: ${formatPHP(result.employeeShare)}
Employer Share: ${formatPHP(result.employerShare)}
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
        <h1 className="text-3xl font-bold mb-2">PhilHealth Contribution Calculator</h1>
        <p className="text-muted-foreground mb-8">Calculate your monthly PhilHealth premium based on the current 5% rate.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Details</CardTitle>
                <CardDescription>Enter your basic monthly salary.</CardDescription>
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
                  <Button type="submit" className="w-full">Calculate Premium</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            {result ? (
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b border-border pb-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Premium Breakdown</CardTitle>
                    <CardDescription>Based on the current 5.0% contribution rate</CardDescription>
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
                          <TableCell className="font-medium text-muted-foreground">Basic Salary</TableCell>
                          <TableCell className="text-right">{formatPHP(result.salary)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Employee Share (2.5%)</TableCell>
                          <TableCell className="text-right font-bold text-destructive">
                            {formatPHP(result.employeeShare)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Employer Share (2.5%)</TableCell>
                          <TableCell className="text-right text-primary">
                            {formatPHP(result.employerShare)}
                          </TableCell>
                        </TableRow>
                        <TableRow className="bg-muted/50 font-bold">
                          <TableCell>Total Monthly Premium</TableCell>
                          <TableCell className="text-right">{formatPHP(result.totalPremium)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {result.salary < PHILHEALTH_RATES.minSalary && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-lg border border-blue-200 dark:border-blue-800">
                      <strong>Note:</strong> Your salary is below the minimum threshold of ₱10,000. Your premium is computed based on the ₱10,000 minimum floor.
                    </div>
                  )}

                  {result.salary > PHILHEALTH_RATES.maxSalary && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-lg border border-blue-200 dark:border-blue-800">
                      <strong>Note:</strong> Your salary is above the maximum ceiling of ₱100,000. Your premium is capped at the maximum limit.
                    </div>
                  )}

                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Last updated: {UPDATED_DATE} | Source: Philippine Health Insurance Corporation (philhealth.gov.ph)
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[300px]">
                Enter your monthly salary to view your PhilHealth premium breakdown.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the PhilHealth Contribution Calculator</h2>
          <p>
            The Philippine Health Insurance Corporation (PhilHealth) is the national health insurance program of the Philippines, aiming to provide affordable and accessible healthcare for all citizens. Our PhilHealth Contribution Calculator helps you determine exactly how much you need to pay for your monthly health insurance premiums based on the Universal Health Care (UHC) Law.
          </p>

          <h3>How PhilHealth Contributions Work</h3>
          <p>
            Under the Universal Health Care (UHC) Law, PhilHealth premium rates are structured as a direct percentage of your basic monthly salary. As of 2024, the total premium rate is set at 5.0%.
          </p>
          <p>
            For formally employed individuals in the private and government sectors, this 5.0% burden is shared equally between the employee and the employer. Therefore, 2.5% is deducted from your monthly payslip, and your employer contributes the matching 2.5%.
          </p>

          <h3>Salary Floors and Ceilings</h3>
          <p>
            To keep contributions equitable, PhilHealth imposes a minimum floor and a maximum ceiling on the salary basis used for computation:
          </p>
          <ul>
            <li><strong>Minimum Salary Floor (₱10,000):</strong> If you earn less than ₱10,000 per month, your premium will still be calculated as if you earn exactly ₱10,000. This means the minimum total monthly premium is ₱500 (or ₱250 for the employee share).</li>
            <li><strong>Maximum Salary Ceiling (₱100,000):</strong> If you earn more than ₱100,000 per month, your premium calculation is capped at ₱100,000. Therefore, the maximum total monthly premium is ₱5,000 (or ₱2,500 for the employee share).</li>
          </ul>

          <h3>Frequently Asked Questions (FAQ)</h3>
          
          <h4>What happens if I am a Direct Contributor (Self-Employed, Freelancer, or OFW)?</h4>
          <p>
            If you do not have an employer, you are classified as a Direct Contributor. You will need to shoulder the entire 5.0% premium rate yourself, subject to the same minimum floors and maximum ceilings.
          </p>

          <h4>Is PhilHealth deduction based on gross or basic pay?</h4>
          <p>
            PhilHealth premiums are calculated based on your Basic Monthly Salary. It does not include overtime pay, holiday pay, night differential, bonuses, or other non-taxable allowances unless specifically integrated into your basic pay.
          </p>

          <h4>Why did my PhilHealth deduction increase recently?</h4>
          <p>
            The Universal Health Care (UHC) Law mandated a gradual increase in PhilHealth premium rates to fund expanded health benefits for Filipinos. The rate gradually increased from 2.75% in 2019 up to the scheduled 5.0% in 2024.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Republic Act No. 11223 (Universal Health Care Act); PhilHealth Circular No. 2024-0001. Disclaimer: This calculator is provided for informational and estimation purposes only. Please verify your exact dues with your employer or directly with PhilHealth.
          </div>
        </div>
      </div>
    </Layout>
  );
}
