import { useState, useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatPHP, UPDATED_DATE } from "@/data/rates";
import { ArrowRightLeft, TrendingDown, Landmark, Building2 } from "lucide-react";

const PAGIBIG_RATES = [
  { label: "1-Year Fixing — 5.375%", rate: 5.375 },
  { label: "3-Year Fixing — 6.375%", rate: 6.375 },
  { label: "5-Year Fixing — 6.875%", rate: 6.875 },
  { label: "10-Year Fixing — 7.880%", rate: 7.880 },
  { label: "15-Year Fixing — 9.050%", rate: 9.050 },
  { label: "20–25 Year Fixing — 10.000%", rate: 10.000 },
  { label: "30-Year Fixing — 10.000%", rate: 10.000 },
];

const BANK_PRESETS = [
  { label: "BDO — 7.50%", rate: 7.50 },
  { label: "BPI — 7.75%", rate: 7.75 },
  { label: "Metrobank — 8.00%", rate: 8.00 },
  { label: "Security Bank — 8.25%", rate: 8.25 },
  { label: "UnionBank — 8.50%", rate: 8.50 },
  { label: "Custom rate", rate: 0 },
];

function computeMonthly(principal: number, annualRate: number, termMonths: number) {
  if (annualRate === 0) return principal / termMonths;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

export default function LoanComparison() {
  useEffect(() => {
    setPageSEO(
      "Pag-IBIG vs Bank Housing Loan Comparison Calculator Philippines 2025 | PH Calculators",
      "Compare Pag-IBIG Fund and bank housing loan costs side by side. See the exact difference in monthly payment, total interest, and total payable for your specific loan amount and term."
    );
  }, []);

  const [loanAmount, setLoanAmount] = useState("2000000");
  const [termYears, setTermYears] = useState("20");
  const [pagibigIndex, setPagibigIndex] = useState("1");
  const [bankPresetIndex, setBankPresetIndex] = useState("0");
  const [customBankRate, setCustomBankRate] = useState("");
  const [result, setResult] = useState<any>(null);

  const selectedPagibig = PAGIBIG_RATES[parseInt(pagibigIndex)];
  const selectedBankPreset = BANK_PRESETS[parseInt(bankPresetIndex)];
  const effectiveBankRate =
    selectedBankPreset.rate === 0
      ? parseFloat(customBankRate) || 0
      : selectedBankPreset.rate;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount) || 0;
    const years = Math.min(Math.max(parseInt(termYears) || 0, 1), 30);
    const months = years * 12;
    if (principal <= 0) return;

    const pagibigMonthly = computeMonthly(principal, selectedPagibig.rate, months);
    const bankMonthly = computeMonthly(principal, effectiveBankRate, months);
    const pagibigTotal = pagibigMonthly * months;
    const bankTotal = bankMonthly * months;
    const pagibigInterest = pagibigTotal - principal;
    const bankInterest = bankTotal - principal;

    setResult({
      principal,
      years,
      months,
      pagibig: {
        rate: selectedPagibig.rate,
        label: selectedPagibig.label,
        monthly: pagibigMonthly,
        total: pagibigTotal,
        interest: pagibigInterest,
      },
      bank: {
        rate: effectiveBankRate,
        label: selectedBankPreset.rate === 0 ? `Custom — ${effectiveBankRate}%` : selectedBankPreset.label,
        monthly: bankMonthly,
        total: bankTotal,
        interest: bankInterest,
      },
      monthlySaving: Math.abs(bankMonthly - pagibigMonthly),
      totalSaving: Math.abs(bankTotal - pagibigTotal),
      cheaper: bankMonthly > pagibigMonthly ? "pagibig" : "bank",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Pag-IBIG vs Bank Housing Loan Calculator</h1>
        <p className="text-muted-foreground mb-8">
          Compare monthly payments and total cost of a Pag-IBIG Fund loan against a bank mortgage — side by side.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Inputs ── */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Shared between both lenders.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (PHP)</Label>
                    <Input
                      id="loanAmount" type="number" min="1" max="6000000" step="1000"
                      value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="termYears">Loan Term (Years)</Label>
                    <Input
                      id="termYears" type="number" min="1" max="30" step="1"
                      value={termYears} onChange={(e) => setTermYears(e.target.value)} required
                    />
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-1">
                      <Building2 className="h-4 w-4" /> Pag-IBIG Rate
                    </div>
                    <Select value={pagibigIndex} onValueChange={setPagibigIndex}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PAGIBIG_RATES.map((r, i) => (
                          <SelectItem key={i} value={String(i)}>{r.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1" style={{ color: "hsl(var(--chart-2, 142 71% 45%))" }}>
                      <Landmark className="h-4 w-4" /> Bank Rate
                    </div>
                    <Select value={bankPresetIndex} onValueChange={(v) => { setBankPresetIndex(v); setCustomBankRate(""); }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {BANK_PRESETS.map((b, i) => (
                          <SelectItem key={i} value={String(i)}>{b.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedBankPreset.rate === 0 && (
                      <Input
                        type="number" min="0" step="0.01" placeholder="e.g. 8.50"
                        value={customBankRate} onChange={(e) => setCustomBankRate(e.target.value)}
                      />
                    )}
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <ArrowRightLeft className="h-4 w-4" /> Compare Loans
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-8">
            {result ? (
              <div className="space-y-6">
                {/* Verdict banner */}
                <div className={`rounded-xl p-5 border-2 flex items-start gap-4 ${result.cheaper === "pagibig" ? "bg-primary/5 border-primary/30" : "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"}`}>
                  <TrendingDown className={`h-6 w-6 mt-0.5 shrink-0 ${result.cheaper === "pagibig" ? "text-primary" : "text-green-600 dark:text-green-400"}`} />
                  <div>
                    <p className="font-bold text-lg">
                      {result.cheaper === "pagibig" ? "Pag-IBIG is cheaper" : "Bank is cheaper"} by{" "}
                      <span className={result.cheaper === "pagibig" ? "text-primary" : "text-green-600 dark:text-green-400"}>
                        {formatPHP(result.monthlySaving)}/month
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Over {result.years} years, you save a total of{" "}
                      <strong>{formatPHP(result.totalSaving)}</strong> in interest by choosing the{" "}
                      {result.cheaper === "pagibig" ? "Pag-IBIG Fund" : "bank"} option.
                    </p>
                  </div>
                </div>

                {/* Side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pag-IBIG */}
                  <Card className={result.cheaper === "pagibig" ? "border-primary/40 shadow-md" : ""}>
                    <CardHeader className={`pb-3 rounded-t-xl ${result.cheaper === "pagibig" ? "bg-primary/5" : ""}`}>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">Pag-IBIG Fund</CardTitle>
                        {result.cheaper === "pagibig" && (
                          <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                            Better deal
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-xs">{result.pagibig.label}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Monthly Payment</TableCell>
                            <TableCell className="text-right font-bold text-xl text-primary py-2">
                              {formatPHP(result.pagibig.monthly)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Total Interest</TableCell>
                            <TableCell className="text-right text-destructive font-semibold py-2">
                              {formatPHP(result.pagibig.interest)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Total Payable</TableCell>
                            <TableCell className="text-right font-semibold py-2">
                              {formatPHP(result.pagibig.total)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Interest Rate</TableCell>
                            <TableCell className="text-right py-2">{result.pagibig.rate}% p.a.</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Bank */}
                  <Card className={result.cheaper === "bank" ? "border-green-400 dark:border-green-600 shadow-md" : ""}>
                    <CardHeader className={`pb-3 rounded-t-xl ${result.cheaper === "bank" ? "bg-green-50 dark:bg-green-900/20" : ""}`}>
                      <div className="flex items-center gap-2">
                        <Landmark className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-base">Bank Mortgage</CardTitle>
                        {result.cheaper === "bank" && (
                          <span className="ml-auto text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-medium">
                            Better deal
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-xs">{result.bank.label}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Monthly Payment</TableCell>
                            <TableCell className="text-right font-bold text-xl py-2">
                              {formatPHP(result.bank.monthly)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Total Interest</TableCell>
                            <TableCell className="text-right text-destructive font-semibold py-2">
                              {formatPHP(result.bank.interest)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Total Payable</TableCell>
                            <TableCell className="text-right font-semibold py-2">
                              {formatPHP(result.bank.total)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-muted-foreground text-sm py-2">Interest Rate</TableCell>
                            <TableCell className="text-right py-2">{result.bank.rate}% p.a.</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                {/* Savings summary */}
                <Card className="bg-muted/40">
                  <CardContent className="pt-5">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                        <p className="font-bold">{formatPHP(result.principal)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly Difference</p>
                        <p className="font-bold text-primary">{formatPHP(result.monthlySaving)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Difference</p>
                        <p className="font-bold text-primary">{formatPHP(result.totalSaving)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Last updated: {UPDATED_DATE} · Rates shown are for illustration. Confirm actual rates with your lender before applying.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[400px]">
                <div>
                  <ArrowRightLeft className="h-10 w-10 mx-auto mb-4 opacity-30" />
                  <p>Enter your loan details and click Compare to see the full side-by-side breakdown.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>Pag-IBIG vs Bank Housing Loan: Which Is Better?</h2>
          <p>
            For most Filipino workers, choosing between a Pag-IBIG (HDMF) housing loan and a bank mortgage is one of the biggest financial decisions they will make. The answer depends on your loan amount, your term preference, and — most importantly — the interest rate difference between the two options at the time you apply. This calculator lets you run the numbers for your specific situation so you can make an informed, data-driven choice.
          </p>

          <h2>Key Differences Between Pag-IBIG and Bank Loans</h2>

          <h3>Interest Rates</h3>
          <p>
            Pag-IBIG Fund housing loan rates have historically been lower than commercial bank rates — sometimes by 1 to 2 percentage points. On a ₱3,000,000 loan over 20 years, a 1.5% rate difference translates to roughly ₱500,000 to ₱700,000 in total interest savings. However, bank promotional rates (especially for the first few years) can sometimes be competitive with Pag-IBIG's rates, so always compare the actual quoted rates, not just assumptions.
          </p>

          <h3>Maximum Loan Amount</h3>
          <p>
            Pag-IBIG caps regular housing loans at ₱6,000,000. Banks generally have no fixed ceiling — your maximum is determined by the appraised property value and your debt-service capacity. For high-value properties above ₱6,000,000, a bank mortgage may be your only option, or you can combine a Pag-IBIG loan with a bank top-up loan.
          </p>

          <h3>Fixing Period and Repricing Risk</h3>
          <p>
            Both Pag-IBIG and banks use a fixing period system. During the fixed period, your rate is locked. After repricing, your rate adjusts to the prevailing rate. Banks sometimes offer longer initial fixing periods (e.g., 5 or 10 years at a promotional rate) to attract borrowers. The key risk with shorter fixing periods is that if rates rise significantly at repricing time, your monthly payment can increase substantially.
          </p>

          <h3>Processing and Eligibility</h3>
          <p>
            Pag-IBIG has stricter eligibility requirements (minimum 24 monthly contributions, active membership status) but typically has a more standardized process. Banks may approve faster and with fewer documentary requirements, but they apply stricter income and credit scoring standards.
          </p>

          <h3>Additional Costs</h3>
          <p>
            Both types of loans involve costs beyond the principal and interest: documentary stamp tax, appraisal fees, registration fees, title transfer fees, and insurance premiums. Pag-IBIG bundles Mortgage Redemption Insurance (MRI) and fire insurance into the monthly amortization. Banks may charge these separately or bundle them. Always request the full disclosure statement from both lenders before deciding.
          </p>

          <h2>When Pag-IBIG Is Usually the Better Choice</h2>
          <ul>
            <li>Your loan amount is below ₱6,000,000</li>
            <li>You are a regular employee with a consistent Pag-IBIG contribution history</li>
            <li>You prefer a longer term (up to 30 years) for lower monthly payments</li>
            <li>You want the lowest possible interest rate and are comfortable with repricing risk at shorter fixing periods</li>
          </ul>

          <h2>When a Bank Loan Might Be Better</h2>
          <ul>
            <li>Your loan amount exceeds ₱6,000,000</li>
            <li>The bank is offering a very competitive promotional rate for the initial 3–5 year period</li>
            <li>You need faster approval and less documentary requirements</li>
            <li>You are self-employed or a freelancer who may have difficulty meeting Pag-IBIG's contribution requirements</li>
          </ul>

          <h2>Use Our Full Calculator Suite</h2>
          <p>
            For a complete picture of your housing loan options:
          </p>
          <ul>
            <li>Use the <a href="/pagibig-housing-loan" className="text-primary hover:underline">Pag-IBIG Housing Loan Calculator</a> for the full amortization schedule with all fixing period options</li>
            <li>Use the <a href="/loan" className="text-primary hover:underline">Loan Amortization Calculator</a> for any bank loan with a custom rate and term</li>
            <li>Use the <a href="/pagibig" className="text-primary hover:underline">Pag-IBIG Contribution Calculator</a> to check your monthly HDMF savings contribution</li>
          </ul>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Disclaimer:</strong> Interest rates shown are reference rates based on publicly available HDMF and bank information as of 2024/2025. Actual approved rates depend on your credit profile, loan-to-value ratio, and current lender policies. This tool is for estimation and comparison purposes only. Always consult directly with Pag-IBIG Fund (pagibigfund.gov.ph) and your chosen bank before making a commitment.
          </div>
        </div>
      </div>
    </Layout>
  );
}
