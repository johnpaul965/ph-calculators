import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { TAX_BRACKETS_2024, formatPHP, UPDATED_DATE } from "@/data/rates";
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BirTaxCalculator() {
  useEffect(() => {
    setPageSEO(
      "BIR Income Tax Calculator Philippines 2025 (TRAIN Law) | PH Calculators",
      "Calculate your BIR income tax in the Philippines using the TRAIN Law tax brackets. Accurate 2025 withholding tax computation for employees and self-employed."
    );
  }, []);
  const [monthlyIncome, setMonthlyIncome] = useState<string>("50000");
  const [bonus, setBonus] = useState<string>("50000");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseFloat(monthlyIncome) || 0;
    const bonuses = parseFloat(bonus) || 0;
    
    // Tax exempt bonus up to 90,000
    const taxableBonus = Math.max(0, bonuses - 90000);
    
    const annualIncome = (income * 12) + taxableBonus;
    
    let annualTax = 0;
    let applicableBracket = null;

    for (let i = TAX_BRACKETS_2024.length - 1; i >= 0; i--) {
      const bracket = TAX_BRACKETS_2024[i];
      if (annualIncome > bracket.min) {
        applicableBracket = bracket;
        const excess = annualIncome - bracket.min;
        annualTax = bracket.base + (excess * bracket.rate);
        break;
      }
    }

    setResult({
      monthlyIncome: income,
      annualIncome,
      taxableBonus,
      annualTax,
      monthlyTax: annualTax / 12,
      effectiveRate: annualIncome > 0 ? (annualTax / annualIncome) * 100 : 0,
      bracket: applicableBracket
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `BIR Tax Computation:
Annual Taxable Income: ${formatPHP(result.annualIncome)}
Annual Income Tax: ${formatPHP(result.annualTax)}
Estimated Monthly Tax: ${formatPHP(result.monthlyTax)}
Effective Tax Rate: ${result.effectiveRate.toFixed(2)}%
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
        <h1 className="text-3xl font-bold mb-2">BIR Income Tax Calculator</h1>
        <p className="text-muted-foreground mb-8">Compute your annual and monthly income tax based on the TRAIN Law.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Income Details</CardTitle>
                <CardDescription>Enter your gross income before deductions.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Gross Income (PHP)</Label>
                    <Input 
                      id="monthlyIncome" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bonus">13th Month & Bonuses (PHP)</Label>
                    <Input 
                      id="bonus" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={bonus}
                      onChange={(e) => setBonus(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Up to ₱90,000 is tax-exempt.</p>
                  </div>

                  <Button type="submit" className="w-full">Calculate Tax</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            {result ? (
              <Card className="border-primary/20 shadow-md h-full">
                <CardHeader className="bg-primary/5 border-b border-border pb-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Tax Computation</CardTitle>
                    <CardDescription>Based on TRAIN Law revised rates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted p-4 rounded-lg text-center border">
                      <div className="text-sm text-muted-foreground mb-1">Annual Taxable Income</div>
                      <div className="text-xl font-bold text-foreground">{formatPHP(result.annualIncome)}</div>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg text-center border border-primary/20">
                      <div className="text-sm text-primary-foreground/70 text-primary mb-1">Annual Tax Due</div>
                      <div className="text-xl font-bold text-primary">{formatPHP(result.annualTax)}</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center border">
                      <div className="text-sm text-muted-foreground mb-1">Monthly Tax Est.</div>
                      <div className="text-xl font-bold text-foreground">{formatPHP(result.monthlyTax)}</div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Tax Bracket Applied:</strong> Income between {formatPHP(result.bracket.min)} and {result.bracket.max === Infinity ? "above" : formatPHP(result.bracket.max)}
                    <br/>
                    <strong>Formula:</strong> {formatPHP(result.bracket.base)} + {(result.bracket.rate * 100)}% of excess over {formatPHP(result.bracket.min)}
                    <br/>
                    <strong>Effective Tax Rate:</strong> {result.effectiveRate.toFixed(2)}%
                  </div>

                  <h3 className="font-semibold mb-3 mt-6">TRAIN Law Tax Table (Annual)</h3>
                  <div className="rounded-lg border overflow-hidden text-sm">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead>Income Range</TableHead>
                          <TableHead>Tax Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {TAX_BRACKETS_2024.map((b, i) => (
                          <TableRow key={i} className={result.bracket.min === b.min ? "bg-primary/10 font-medium" : ""}>
                            <TableCell>
                              Over {formatPHP(b.min)} {b.max !== Infinity ? `up to ${formatPHP(b.max)}` : 'and above'}
                            </TableCell>
                            <TableCell>
                              {b.base > 0 ? `${formatPHP(b.base)} + ` : ''} {b.rate * 100}% of excess
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Last updated: {UPDATED_DATE} | Source: Bureau of Internal Revenue (BIR)
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[400px]">
                Enter your monthly income to see your tax bracket and dues.
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the BIR Income Tax Calculator</h2>
          <p>
            Navigating Philippine taxes can be complex. The BIR Income Tax Calculator simplifies the process by estimating your annual and monthly income tax liabilities based on the latest guidelines from the Bureau of Internal Revenue (BIR). The tool uses the updated tax tables implemented under the Tax Reform for Acceleration and Inclusion (TRAIN) Law, which took full effect and was revised downwards on January 1, 2023.
          </p>

          <h3>How Does the TRAIN Law Affect My Tax?</h3>
          <p>
            The TRAIN Law restructured the personal income tax brackets to provide relief to lower and middle-income earners. The most significant change is that individuals earning an annual taxable income of ₱250,000 and below are completely exempt from paying income tax. For those earning above this threshold, the tax rates range from 15% to 35% depending on the specific bracket, applied only to the excess over the bracket's minimum amount.
          </p>

          <h3>How to Use the Calculator</h3>
          <p>
            1. <strong>Monthly Gross Income:</strong> Enter your total basic salary before any government deductions. <br/>
            2. <strong>13th Month & Bonuses:</strong> Enter the total amount of bonuses you receive in a year. Under current law, up to ₱90,000 of your 13th-month pay and other bonuses are completely tax-exempt. The calculator automatically subtracts this exemption before adding any excess to your annual taxable income.
          </p>

          <h3>Frequently Asked Questions (FAQ)</h3>
          
          <h4>Is my 13th month pay taxed?</h4>
          <p>
            Not entirely. Under Republic Act 10963, 13th-month pay and other benefits are tax-exempt up to ₱90,000. If your 13th-month pay plus other bonuses combined exceed ₱90,000, only the excess amount will be added to your gross income and subjected to tax.
          </p>

          <h4>What is an 'Effective Tax Rate'?</h4>
          <p>
            While your marginal tax rate might be 25% or 30% (based on your highest bracket), your effective tax rate is the actual percentage of your total income that goes to tax. Because the first ₱250,000 is tax-free and subsequent amounts are taxed progressively, your effective tax rate is always lower than your marginal tax rate.
          </p>

          <h4>Are statutory contributions deducted before computing tax?</h4>
          <p>
            Yes. In actual payroll computations, your mandatory contributions to SSS, PhilHealth, and Pag-IBIG are deducted from your gross income to arrive at your taxable income. For precise net pay computations that factor in these deductions, please use our comprehensive <a href="/salary" className="text-primary hover:underline">Salary Calculator</a>.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Bureau of Internal Revenue (BIR) Revenue Regulations No. 8-2018; Republic Act No. 10963 (TRAIN Law). Disclaimer: This tool is for estimation purposes only. Consult a certified public accountant or the BIR for official tax assessments.
          </div>
        </div>
      </div>
    </Layout>
  );
}

