import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { computeSalary, SalaryComputation } from "@/lib/calculator";
import { formatPHP, UPDATED_DATE } from "@/data/rates";
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SalaryCalculator() {
  useEffect(() => {
    setPageSEO(
      "Salary Calculator Philippines 2025 — Net Pay After Deductions | PH Calculators",
      "Compute your net take-home pay after SSS, PhilHealth, Pag-IBIG, and BIR income tax deductions. Free Philippine salary calculator updated for 2025."
    );
  }, []);
  const [basicSalary, setBasicSalary] = useState<string>("30000");
  const [allowances, setAllowances] = useState<string>("0");
  const [employmentType, setEmploymentType] = useState<"employee" | "self-employed">("employee");
  const [result, setResult] = useState<SalaryComputation | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(basicSalary) || 0;
    const allows = parseFloat(allowances) || 0;
    
    const computed = computeSalary(salary, allows, employmentType);
    setResult(computed);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Salary Computation:
Gross Pay: ${formatPHP(result.grossPay)}
SSS: ${formatPHP(result.sssContribution)}
PhilHealth: ${formatPHP(result.philhealthContribution)}
Pag-IBIG: ${formatPHP(result.pagibigContribution)}
Income Tax: ${formatPHP(result.incomeTax)}
Total Deductions: ${formatPHP(result.totalDeductions)}
Net Take-Home Pay: ${formatPHP(result.netPay)}
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
        <h1 className="text-3xl font-bold mb-2">Net Pay / Salary Calculator</h1>
        <p className="text-muted-foreground mb-8">Calculate your monthly take-home pay after mandated government deductions and taxes.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Input Details</CardTitle>
                <CardDescription>Enter your monthly compensation details.</CardDescription>
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
                    <Label htmlFor="allowances">Additional Allowances (PHP) <span className="text-xs text-muted-foreground font-normal">(Taxable)</span></Label>
                    <Input 
                      id="allowances" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={allowances}
                      onChange={(e) => setAllowances(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Employment Type</Label>
                    <RadioGroup 
                      value={employmentType} 
                      onValueChange={(val) => setEmploymentType(val as any)}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="employee" id="employee" />
                        <Label htmlFor="employee" className="font-normal">Private Employee</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="self-employed" id="self-employed" />
                        <Label htmlFor="self-employed" className="font-normal">Self-Employed / Freelancer</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full">Calculate Net Pay</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-7">
            {result ? (
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b border-border pb-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Computation Results</CardTitle>
                    <CardDescription>Your estimated monthly breakdown</CardDescription>
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
                        <TableRow className="bg-muted/50 font-medium">
                          <TableCell>Gross Pay</TableCell>
                          <TableCell className="text-right text-lg">{formatPHP(result.grossPay)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground pl-6">Basic Salary</TableCell>
                          <TableCell className="text-right text-muted-foreground">{formatPHP(result.basicSalary)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground pl-6">Allowances</TableCell>
                          <TableCell className="text-right text-muted-foreground">{formatPHP(result.allowances)}</TableCell>
                        </TableRow>
                        
                        <TableRow className="bg-muted/50 font-medium">
                          <TableCell>Less: Government Contributions</TableCell>
                          <TableCell className="text-right text-destructive">{formatPHP(result.totalContributions)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground pl-6">SSS Contribution</TableCell>
                          <TableCell className="text-right text-muted-foreground">{formatPHP(result.sssContribution)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground pl-6">PhilHealth Contribution</TableCell>
                          <TableCell className="text-right text-muted-foreground">{formatPHP(result.philhealthContribution)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground pl-6">Pag-IBIG Contribution</TableCell>
                          <TableCell className="text-right text-muted-foreground">{formatPHP(result.pagibigContribution)}</TableCell>
                        </TableRow>

                        <TableRow className="bg-muted/50 font-medium">
                          <TableCell>Taxable Income</TableCell>
                          <TableCell className="text-right">{formatPHP(result.taxableIncome)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-muted-foreground pl-6">Less: Income Tax (TRAIN Law)</TableCell>
                          <TableCell className="text-right text-destructive">{formatPHP(result.incomeTax)}</TableCell>
                        </TableRow>

                        <TableRow className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <TableCell className="font-bold text-lg rounded-bl-lg">Net Take-Home Pay</TableCell>
                          <TableCell className="text-right font-bold text-xl rounded-br-lg">{formatPHP(result.netPay)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Last updated: {UPDATED_DATE} | Sources: SSS, PhilHealth, Pag-IBIG, BIR<br/>
                    Disclaimer: For informational use only. Always verify with official government sources and your HR department.
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground">
                Enter your details and click calculate to see your salary breakdown.
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the Philippine Salary Calculator</h2>
          <p>
            Understanding your payslip shouldn't require a degree in accounting. Our Philippine Salary Calculator is designed to help employees, freelancers, and HR professionals quickly determine net take-home pay based on the latest government regulations. It automatically deducts mandated contributions for SSS, PhilHealth, Pag-IBIG, and computes the appropriate withholding tax under the BIR TRAIN Law.
          </p>

          <h3>How to Use the Calculator</h3>
          <p>
            Using the tool is straightforward:
          </p>
          <ul>
            <li><strong>Basic Salary:</strong> Enter your gross monthly basic pay before any deductions.</li>
            <li><strong>Allowances:</strong> Input any taxable allowances or additional recurring pay. (Note: Non-taxable de minimis benefits should be excluded if you want a precise tax computation).</li>
            <li><strong>Employment Type:</strong> Select "Private Employee" if you work for a company. Select "Self-Employed" if you are a freelancer or business owner paying the full share of contributions yourself.</li>
          </ul>

          <h3>Understanding Your Deductions</h3>
          <p>
            In the Philippines, employees are subject to statutory deductions. Here's what they mean:
          </p>
          <ul>
            <li><strong>SSS (Social Security System):</strong> Provides a safety net for private employees in times of sickness, maternity, disability, retirement, or death. The employee share is currently 4.5% of the Monthly Salary Credit.</li>
            <li><strong>PhilHealth:</strong> The national health insurance program. The current premium rate is 5%, divided equally between employer and employee (2.5% each).</li>
            <li><strong>Pag-IBIG (Home Development Mutual Fund):</strong> A national savings program that provides affordable housing financing. Standard contribution is 2% for the employee.</li>
            <li><strong>Income Tax:</strong> Computed based on the BIR TRAIN Law brackets, which significantly lowered personal income tax rates for most wage earners.</li>
          </ul>

          <h3>Frequently Asked Questions (FAQ)</h3>
          
          <h4>Are 13th-month pay and bonuses taxable?</h4>
          <p>
            Under current Philippine law, 13th-month pay and other benefits are tax-exempt up to a maximum of ₱90,000. Any amount exceeding this threshold becomes part of your taxable income for the year.
          </p>

          <h4>What is the difference between Employee and Self-Employed calculations?</h4>
          <p>
            For regular employees, the burden of SSS, PhilHealth, and Pag-IBIG contributions is shared with the employer. If you are self-employed or a voluntary paying member, you shoulder the entire contribution amount (e.g., the full 14-15% for SSS instead of just 4.5%).
          </p>

          <h4>How accurate is this calculator?</h4>
          <p>
            This calculator uses the exact formulas and tables provided by Philippine government agencies. However, actual payroll systems may have slight discrepancies due to rounding off, specific company policies, or the inclusion of non-taxable de minimis benefits. Always treat this as a highly accurate estimate rather than an official document.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Computations are based on Republic Act No. 10963 (TRAIN Law), SSS Circular No. 2022-033, PhilHealth Circular No. 2024-0001, and Pag-IBIG Fund Circular No. 274.
          </div>
        </div>
      </div>
    </Layout>
  );
}
