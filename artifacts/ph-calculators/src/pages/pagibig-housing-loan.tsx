import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPHP, UPDATED_DATE } from "@/data/rates";
import { Copy, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FIXING_PERIODS = [
  { label: "1 Year", years: 1, rate: 5.375 },
  { label: "3 Years", years: 3, rate: 6.375 },
  { label: "5 Years", years: 5, rate: 6.875 },
  { label: "10 Years", years: 10, rate: 7.880 },
  { label: "15 Years", years: 15, rate: 9.050 },
  { label: "20–25 Years", years: 25, rate: 10.000 },
  { label: "30 Years", years: 30, rate: 10.000 },
];

const MAX_LOAN = 6_000_000;
const ITEMS_PER_PAGE = 12;

function computeAmortization(principal: number, annualRate: number, termMonths: number) {
  if (annualRate === 0) {
    const monthly = principal / termMonths;
    const schedule = Array.from({ length: termMonths }, (_, i) => ({
      month: i + 1,
      payment: monthly,
      principal: monthly,
      interest: 0,
      balance: principal - monthly * (i + 1),
    }));
    return { monthlyPayment: monthly, totalInterest: 0, totalPayment: principal, schedule };
  }
  const r = annualRate / 100 / 12;
  const n = termMonths;
  const monthlyPayment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  let balance = principal;
  let totalInterest = 0;
  const schedule = [];
  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principalPaid = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    schedule.push({
      month: i,
      payment: monthlyPayment,
      principal: principalPaid,
      interest,
      balance,
    });
  }
  return { monthlyPayment, totalInterest, totalPayment: monthlyPayment * n, schedule };
}

export default function PagIbigHousingLoan() {
  useEffect(() => {
    setPageSEO(
      "Pag-IBIG Housing Loan Calculator Philippines 2025 | PH Calculators",
      "Calculate your monthly amortization for a Pag-IBIG (HDMF) housing loan. Uses official 2024/2025 interest rates for all fixing periods. Free and accurate."
    );
  }, []);

  const [loanAmount, setLoanAmount] = useState<string>("2000000");
  const [termYears, setTermYears] = useState<string>("20");
  const [fixingPeriod, setFixingPeriod] = useState<string>("3");
  const [customRate, setCustomRate] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const selectedFixing = FIXING_PERIODS[parseInt(fixingPeriod)];
  const effectiveRate = customRate !== "" ? parseFloat(customRate) : selectedFixing?.rate ?? 0;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = Math.min(parseFloat(loanAmount) || 0, MAX_LOAN);
    const years = Math.min(Math.max(parseInt(termYears) || 0, 1), 30);
    const termMonths = years * 12;
    if (principal <= 0) return;
    const calc = computeAmortization(principal, effectiveRate, termMonths);
    setResult({ principal, years, termMonths, rate: effectiveRate, fixing: selectedFixing?.label, ...calc });
    setCurrentPage(1);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Pag-IBIG Housing Loan:
Loan Amount: ${formatPHP(result.principal)}
Interest Rate: ${result.rate}% p.a. (${result.fixing} fixing)
Loan Term: ${result.years} years
Monthly Amortization: ${formatPHP(result.monthlyPayment)}
Total Interest: ${formatPHP(result.totalInterest)}
Total Payable: ${formatPHP(result.totalPayment)}
Computed via PH Calculators`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard", description: "You can now paste the results." });
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPages = result ? Math.ceil(result.schedule.length / ITEMS_PER_PAGE) : 0;
  const currentSchedule = result
    ? result.schedule.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-2">Pag-IBIG Housing Loan Calculator</h1>
        <p className="text-muted-foreground mb-8">
          Compute your monthly amortization using official HDMF interest rates. Maximum loan: ₱6,000,000 for up to 30 years.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter your loan amount, term, and fixing period.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (PHP)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      min="1"
                      max={MAX_LOAN}
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Maximum: ₱6,000,000</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="termYears">Loan Term (Years)</Label>
                    <Input
                      id="termYears"
                      type="number"
                      min="1"
                      max="30"
                      step="1"
                      value={termYears}
                      onChange={(e) => setTermYears(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Maximum: 30 years</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Interest Rate Fixing Period</Label>
                    <Select value={fixingPeriod} onValueChange={(v) => { setFixingPeriod(v); setCustomRate(""); }}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FIXING_PERIODS.map((fp, i) => (
                          <SelectItem key={i} value={String(i)}>
                            {fp.label} — {fp.rate}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Based on HDMF 2024/2025 reference rates
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customRate">Custom Rate Override (optional)</Label>
                    <Input
                      id="customRate"
                      type="number"
                      min="0"
                      step="0.001"
                      placeholder={`e.g. ${selectedFixing?.rate ?? "6.875"}`}
                      value={customRate}
                      onChange={(e) => setCustomRate(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave blank to use the rate above. Use this if Pag-IBIG quoted you a different rate.
                    </p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg text-sm">
                    <span className="text-muted-foreground">Effective rate: </span>
                    <span className="font-bold">{effectiveRate.toFixed(3)}% p.a.</span>
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
                      <div className="text-sm text-muted-foreground mb-1">Monthly Amortization</div>
                      <div className="text-2xl font-bold text-primary">{formatPHP(result.monthlyPayment)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                      <div className="text-xl font-bold text-destructive">{formatPHP(result.totalInterest)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Total Payable</div>
                      <div className="text-xl font-bold">{formatPHP(result.totalPayment)}</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm rounded-lg border border-amber-200 dark:border-amber-800">
                  <strong>Note:</strong> This uses a {result.rate}% fixed rate for the full loan term for illustration. After the {result.fixing} fixing period, your rate will be repriced based on prevailing HDMF rates at the time.
                </div>

                <Card className="border-border shadow-sm">
                  <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Amortization Schedule</CardTitle>
                      <CardDescription>{result.years} years · {result.termMonths} months · {result.rate}% p.a.</CardDescription>
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
                            <TableHead className="w-16 text-center pl-4">Month</TableHead>
                            <TableHead className="text-right">Payment</TableHead>
                            <TableHead className="text-right">Principal</TableHead>
                            <TableHead className="text-right">Interest</TableHead>
                            <TableHead className="text-right pr-4">Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentSchedule.map((row: any) => (
                            <TableRow key={row.month}>
                              <TableCell className="text-center font-medium text-muted-foreground pl-4">{row.month}</TableCell>
                              <TableCell className="text-right font-medium">{formatPHP(row.payment)}</TableCell>
                              <TableCell className="text-right text-muted-foreground">{formatPHP(row.principal)}</TableCell>
                              <TableCell className="text-right text-muted-foreground">{formatPHP(row.interest)}</TableCell>
                              <TableCell className="text-right font-medium pr-4">{formatPHP(row.balance)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-4 py-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Months {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, result.schedule.length)} of {result.schedule.length}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                            <ChevronLeft className="h-4 w-4" /> Prev
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
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
                Enter your loan details and click Calculate to see your monthly amortization and full schedule.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>About the Pag-IBIG Housing Loan Calculator</h2>
          <p>
            The Pag-IBIG Fund (Home Development Mutual Fund) housing loan program is one of the most accessible and affordable home financing options available to Filipino workers. With interest rates significantly lower than commercial banks and loan terms of up to 30 years, it is the primary route to homeownership for millions of middle-income Filipino families. Our Pag-IBIG Housing Loan Calculator uses the official HDMF reference interest rates to help you plan your monthly budget before you even apply.
          </p>

          <h2>How Pag-IBIG Housing Loan Interest Rates Work</h2>
          <p>
            Unlike banks that often quote a single fixed rate, Pag-IBIG uses a <strong>repricing system</strong>. When you take out a housing loan, you choose a "fixing period" — the number of years during which your interest rate is locked in and cannot change. After this period, your rate is repriced based on whatever the prevailing HDMF rate is at that time.
          </p>

          <div className="not-prose my-4 rounded-lg border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Fixing Period</TableHead>
                  <TableHead className="text-right">Reference Rate (2024/2025)</TableHead>
                  <TableHead>Best For</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FIXING_PERIODS.map((fp, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{fp.label}</TableCell>
                    <TableCell className="text-right">{fp.rate.toFixed(3)}%</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {i <= 1 ? "Lower initial payments; accept rate risk" : i <= 2 ? "Balance of low rate and stability" : "Long-term certainty"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p>
            Shorter fixing periods have lower rates but expose you to rate increases at repricing time. Longer fixing periods offer stability and are recommended if you plan to hold the property long-term and want predictable monthly payments.
          </p>

          <h2>Pag-IBIG Housing Loan: Key Facts</h2>
          <ul>
            <li><strong>Maximum Loan Amount:</strong> ₱6,000,000 for regular housing loans (subject to appraised value)</li>
            <li><strong>Maximum Loan Term:</strong> 30 years (or until the borrower turns 70, whichever is earlier)</li>
            <li><strong>Minimum Contributions Required:</strong> 24 monthly Pag-IBIG contributions before application</li>
            <li><strong>Eligible Properties:</strong> Residential lot, house and lot, condominium unit, townhouse, or house construction/improvement</li>
            <li><strong>Mortgage Redemption Insurance (MRI):</strong> Required and bundled into the monthly amortization — ensures the loan is fully paid in case of the borrower's death</li>
            <li><strong>Fire Insurance:</strong> Required annually based on the insured value of the property</li>
          </ul>

          <h2>Frequently Asked Questions</h2>

          <h4>How is my maximum loanable amount determined?</h4>
          <p>
            Your maximum loan is the lowest of: (1) ₱6,000,000, (2) the appraised value of the property, and (3) the amount your monthly income can support. Pag-IBIG uses a debt-service ratio — typically your total monthly amortization should not exceed 35% of your gross monthly income.
          </p>

          <h4>Does this calculator include MRI and fire insurance?</h4>
          <p>
            No — this calculator shows the pure principal and interest amortization only. Your actual monthly payment to Pag-IBIG will be slightly higher because it includes a Mortgage Redemption Insurance (MRI) premium and a Fire Insurance premium. Pag-IBIG computes these amounts upon loan approval based on the approved loan amount and property value.
          </p>

          <h4>What happens when my fixing period ends?</h4>
          <p>
            At the end of your chosen fixing period, Pag-IBIG will reprice your loan to the prevailing rate at that time. Your new monthly amortization will be recomputed based on the remaining balance and the new rate. If rates have gone down, your payment decreases; if they have gone up, it increases. You can also choose a new fixing period at repricing time.
          </p>

          <h4>Can I pay off my Pag-IBIG loan early?</h4>
          <p>
            Yes. Pag-IBIG allows early or partial prepayment. Prepaying reduces your outstanding principal faster, which decreases the total interest you pay over the life of the loan. There may be a small prepayment penalty depending on when in the loan term you pay — check with Pag-IBIG for the current policy.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Home Development Mutual Fund (HDMF) — pagibigfund.gov.ph; HDMF Circular No. 460 and subsequent announcements. Interest rates are reference rates for 2024/2025 and are subject to change. Always confirm the current rate with Pag-IBIG Fund before applying. This calculator is for estimation purposes only.
          </div>
        </div>
      </div>
    </Layout>
  );
}
