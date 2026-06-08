import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateLoanAmortization } from "@/lib/calculator";
import { formatPHP } from "@/data/rates";
import { Copy, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 12;

export default function LoanCalculator() {
  useEffect(() => {
    setPageSEO(
      "Loan Amortization Calculator Philippines — Monthly Payment & Schedule | PH Calculators",
      "Compute your monthly loan payment and full amortization schedule. Works for personal loans, auto loans, and housing loans in the Philippines."
    );
  }, []);
  const [loanAmount, setLoanAmount] = useState<string>("1000000");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [term, setTerm] = useState<string>("5");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");
  
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const time = parseFloat(term) || 0;
    
    if (principal <= 0 || time <= 0) return;

    const months = termUnit === "years" ? time * 12 : time;
    const calc = calculateLoanAmortization(principal, rate, months);
    
    setResult({
      principal,
      rate,
      months,
      ...calc
    });
    setCurrentPage(1);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Loan Amortization Summary:
Principal Amount: ${formatPHP(result.principal)}
Interest Rate: ${result.rate}%
Term: ${result.months} months
Monthly Payment: ${formatPHP(result.monthlyPayment)}
Total Interest: ${formatPHP(result.totalInterest)}
Total Amount Payable: ${formatPHP(result.totalPayment)}
Computed via PH Calculators`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the summary.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPages = result ? Math.ceil(result.schedule.length / ITEMS_PER_PAGE) : 0;
  const currentSchedule = result ? result.schedule.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Loan Amortization Calculator</h1>
        <p className="text-muted-foreground mb-8">Calculate your monthly payments and see the full amortization schedule for your personal, auto, or housing loan.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter the terms of your loan.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (PHP)</Label>
                    <Input 
                      id="loanAmount" 
                      type="number" 
                      min="1" 
                      step="0.01" 
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                    <Input 
                      id="interestRate" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="term">Loan Term</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="term" 
                        type="number" 
                        min="1" 
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Select value={termUnit} onValueChange={(val: any) => setTermUnit(val)}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="years">Years</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Calculate Amortization</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            {result ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
                      <div className="text-2xl font-bold text-primary">{formatPHP(result.monthlyPayment)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Total Interest Paid</div>
                      <div className="text-xl font-bold text-destructive">{formatPHP(result.totalInterest)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Total Amount Payable</div>
                      <div className="text-xl font-bold text-foreground">{formatPHP(result.totalPayment)}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border shadow-sm">
                  <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Amortization Schedule</CardTitle>
                      <CardDescription>Month-by-month breakdown</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Summary"}
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-0 px-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="w-16 text-center">Month</TableHead>
                            <TableHead className="text-right">Payment</TableHead>
                            <TableHead className="text-right">Principal</TableHead>
                            <TableHead className="text-right">Interest</TableHead>
                            <TableHead className="text-right">Remaining Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentSchedule.map((row: any) => (
                            <TableRow key={row.month}>
                              <TableCell className="text-center font-medium text-muted-foreground">{row.month}</TableCell>
                              <TableCell className="text-right font-medium">{formatPHP(row.payment)}</TableCell>
                              <TableCell className="text-right text-muted-foreground">{formatPHP(row.principal)}</TableCell>
                              <TableCell className="text-right text-muted-foreground">{formatPHP(row.interest)}</TableCell>
                              <TableCell className="text-right font-medium">{formatPHP(row.balance)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-4 py-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, result.schedule.length)} of {result.schedule.length} months
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" /> Previous
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                          >
                            Next <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[400px]">
                Enter your loan details and click calculate to view your amortization schedule.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the Loan Amortization Calculator</h2>
          <p>
            Whether you are taking out a Pag-IBIG housing loan, a bank auto loan, or a personal salary loan, it is crucial to understand exactly how your monthly payments are broken down. Our Loan Amortization Calculator generates a complete schedule that shows exactly how much of your monthly payment goes toward reducing your principal debt and how much goes toward paying interest.
          </p>

          <h3>How to Use the Calculator</h3>
          <p>
            To generate your amortization schedule, you need three pieces of information:
          </p>
          <ul>
            <li><strong>Loan Amount (Principal):</strong> The total amount of money you are borrowing.</li>
            <li><strong>Annual Interest Rate:</strong> The stated yearly interest rate provided by your bank, Pag-IBIG, or lending institution.</li>
            <li><strong>Loan Term:</strong> The duration of the loan. You can input this in either years or months depending on how the loan is structured.</li>
          </ul>

          <h3>Understanding Amortization</h3>
          <p>
            Amortization refers to the process of paying off a debt over time through regular, equal payments. While your monthly payment amount remains exactly the same every month (assuming a fixed interest rate), the breakdown of that payment changes over time.
          </p>
          <p>
            In the early months of your loan, your outstanding balance is at its highest, meaning a large portion of your monthly payment goes simply to paying the interest. Only a small fraction goes toward reducing the principal. As time goes on and your principal balance decreases, less interest accrues, allowing a much larger portion of your monthly payment to pay down the actual loan amount.
          </p>

          <h3>Frequently Asked Questions (FAQ)</h3>
          
          <h4>Can I use this for my Pag-IBIG Housing Loan?</h4>
          <p>
            Yes. Pag-IBIG housing loans typically use standard diminishing principal amortization. Just input your approved loan amount, the interest rate (e.g., 6.25% for a 3-year fixing period), and your term (up to 30 years).
          </p>

          <h4>Why is the "Total Amount Payable" so much higher than my Loan Amount?</h4>
          <p>
            The total amount payable includes your original loan principal plus the total sum of all interest accrued over the life of the loan. Long-term loans (like a 20-year housing loan) accrue significantly more interest than short-term loans, which is why your total payable amount can sometimes be nearly double your original principal.
          </p>

          <h4>Does this calculator account for fees and penalties?</h4>
          <p>
            No. This calculator provides a pure mathematical amortization based on principal, rate, and time. It does not include bank processing fees, documentary stamp taxes, insurance premiums (like Mortgage Redemption Insurance), or late payment penalties. Always consult your loan provider's official disclosure statement for the final, comprehensive amounts.
          </p>
        </div>
      </div>
    </Layout>
  );
}
