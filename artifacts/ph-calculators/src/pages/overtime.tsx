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
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OT_TYPES = [
  {
    id: "ordinary",
    label: "Ordinary Day (Weekday)",
    otMultiplier: 1.25,
    baseMultiplier: 1.0,
    description: "Regular working day overtime — 25% above hourly rate",
  },
  {
    id: "rest_day",
    label: "Rest Day (Weekend)",
    otMultiplier: 1.30,
    baseMultiplier: 1.30,
    description: "Overtime on scheduled rest day — 30% on top of rest day rate",
  },
  {
    id: "special_holiday",
    label: "Special Non-Working Holiday",
    otMultiplier: 1.30,
    baseMultiplier: 1.30,
    description: "Overtime on a special non-working holiday — 30% on top of special holiday rate",
  },
  {
    id: "regular_holiday",
    label: "Regular Holiday",
    otMultiplier: 1.30,
    baseMultiplier: 2.0,
    description: "Overtime on a regular holiday — 30% on top of the regular holiday rate (200%)",
  },
  {
    id: "regular_holiday_rest",
    label: "Regular Holiday + Rest Day",
    otMultiplier: 1.30,
    baseMultiplier: 2.6,
    description: "Overtime on a regular holiday that also falls on a rest day — 30% on top of 260% rate",
  },
];

export default function OvertimeCalculator() {
  useEffect(() => {
    setPageSEO(
      "Overtime Pay Calculator Philippines 2025 | PH Calculators",
      "Calculate your overtime pay in the Philippines based on Labor Code rates. Covers ordinary days, rest days, special holidays, and regular holidays."
    );
  }, []);

  const [monthlySalary, setMonthlySalary] = useState<string>("25000");
  const [otHours, setOtHours] = useState<string>("2");
  const [otType, setOtType] = useState<string>("ordinary");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(monthlySalary) || 0;
    const hours = parseFloat(otHours) || 0;
    const selected = OT_TYPES.find((t) => t.id === otType)!;

    const dailyRate = salary / 26;
    const hourlyRate = dailyRate / 8;
    const otHourlyRate = hourlyRate * selected.baseMultiplier * selected.otMultiplier;
    const totalOtPay = otHourlyRate * hours;

    setResult({
      salary,
      hours,
      selected,
      dailyRate,
      hourlyRate,
      otHourlyRate,
      totalOtPay,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Overtime Pay Computation:
Monthly Salary: ${formatPHP(result.salary)}
Daily Rate (÷26): ${formatPHP(result.dailyRate)}
Hourly Rate (÷8): ${formatPHP(result.hourlyRate)}
OT Type: ${result.selected.label}
OT Hourly Rate: ${formatPHP(result.otHourlyRate)}
OT Hours: ${result.hours}
Total OT Pay: ${formatPHP(result.totalOtPay)}

Computed via PH Calculators`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard", description: "You can now paste the results." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Overtime Pay Calculator</h1>
        <p className="text-muted-foreground mb-8">Compute your overtime pay based on the Philippine Labor Code rates for all day types.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Work Details</CardTitle>
                <CardDescription>Enter your salary, OT hours, and day type.</CardDescription>
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
                  <div className="space-y-2">
                    <Label htmlFor="otHours">Overtime Hours Rendered</Label>
                    <Input
                      id="otHours"
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={otHours}
                      onChange={(e) => setOtHours(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Day Type</Label>
                    <Select value={otType} onValueChange={setOtType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day type" />
                      </SelectTrigger>
                      <SelectContent>
                        {OT_TYPES.map((t) => (
                          <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {otType && (
                      <p className="text-xs text-muted-foreground">
                        {OT_TYPES.find(t => t.id === otType)?.description}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">Calculate Overtime Pay</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            {result ? (
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-primary/5 border-b border-border pb-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Overtime Pay Breakdown</CardTitle>
                    <CardDescription>{result.selected.label}</CardDescription>
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
                          <TableCell className="font-medium text-muted-foreground">Daily Rate (÷ 26 days)</TableCell>
                          <TableCell className="text-right">{formatPHP(result.dailyRate)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-muted-foreground">Hourly Rate (÷ 8 hours)</TableCell>
                          <TableCell className="text-right">{formatPHP(result.hourlyRate)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            OT Hourly Rate
                            <span className="block text-xs font-normal text-muted-foreground">
                              × {result.selected.baseMultiplier} (base) × {result.selected.otMultiplier} (OT)
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{formatPHP(result.otHourlyRate)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-muted-foreground">OT Hours Rendered</TableCell>
                          <TableCell className="text-right">{result.hours} hr{result.hours !== 1 ? "s" : ""}</TableCell>
                        </TableRow>
                        <TableRow className="bg-primary/10 font-bold">
                          <TableCell className="text-primary">Total Overtime Pay</TableCell>
                          <TableCell className="text-right text-primary text-lg">{formatPHP(result.totalOtPay)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Last updated: {UPDATED_DATE} | Source: Philippine Labor Code (Presidential Decree No. 442)
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground min-h-[300px]">
                Enter your work details to compute your overtime pay.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-none">
          <h2>Overtime Pay Rates Under the Philippine Labor Code</h2>
          <p>
            The Philippine Labor Code (Presidential Decree No. 442) mandates additional compensation for employees who work beyond their regular 8-hour workday. Our Overtime Pay Calculator applies the official multipliers for each type of day to give you a precise computation of your additional pay.
          </p>

          <h3>OT Rate Reference Table</h3>
          <div className="not-prose">
            <div className="rounded-lg border overflow-hidden my-4">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Day Type</TableHead>
                    <TableHead className="text-right">Base Rate</TableHead>
                    <TableHead className="text-right">OT Multiplier</TableHead>
                    <TableHead className="text-right">Effective Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {OT_TYPES.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.label}</TableCell>
                      <TableCell className="text-right">{(t.baseMultiplier * 100).toFixed(0)}%</TableCell>
                      <TableCell className="text-right">+{((t.otMultiplier - 1) * 100).toFixed(0)}%</TableCell>
                      <TableCell className="text-right font-bold">{(t.baseMultiplier * t.otMultiplier * 100).toFixed(0)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <h3>How Is the Daily Rate Computed?</h3>
          <p>
            For salaried employees, the standard divisor is 26 working days per month (as prescribed by DOLE for monthly-paid employees on a 6-day work week). The daily rate is your monthly basic salary divided by 26. The hourly rate is the daily rate divided by 8 (standard hours per workday).
          </p>
          <p>
            Some companies use 22 or 24 as the daily divisor depending on their work schedule (5-day work week). If you are unsure of the divisor your company uses, confirm with your HR department.
          </p>

          <h3>Frequently Asked Questions (FAQ)</h3>

          <h4>Are all employees entitled to overtime pay?</h4>
          <p>
            No. Under the Labor Code, certain categories of employees are not entitled to overtime pay. These include: managerial employees and members of the managerial staff, field personnel (those who regularly perform their duties away from the principal place of business), domestic workers (kasambahay), and workers paid on a task or output basis. Rank-and-file employees in the private sector are generally covered.
          </p>

          <h4>What is the difference between a special holiday and a regular holiday?</h4>
          <p>
            <strong>Regular Holidays</strong> (e.g., New Year's Day, Araw ng Kagitingan, Labor Day, Independence Day, National Heroes' Day, Bonifacio Day, Christmas Day, Rizal Day) require employers to pay 200% of the daily rate (double pay) even if the employee does not work. <strong>Special Non-Working Holidays</strong> (e.g., Ninoy Aquino Day, All Saints' Day, Last Day of the Year) follow a "no work, no pay" policy unless a company policy or CBA provides otherwise, and work rendered results in a 130% rate.
          </p>

          <h4>Can my employer refuse to pay overtime?</h4>
          <p>
            No. Overtime pay is mandated by law. If an employer asks you to render overtime work, they are legally required to compensate you at the correct rate. Employers who fail to pay the legal overtime premium are liable for double indemnity under the Labor Code.
          </p>

          <div className="text-sm text-muted-foreground mt-8 p-4 bg-muted rounded-lg">
            <strong>Sources:</strong> Presidential Decree No. 442 (Labor Code of the Philippines); DOLE Labor Advisories. Disclaimer: This tool is for estimation and informational purposes only. Individual employment contracts and CBAs may provide higher rates.
          </div>
        </div>
      </div>
    </Layout>
  );
}
