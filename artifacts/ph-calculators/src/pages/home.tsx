import { useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Landmark, Receipt, Shield, Umbrella, Building2, Gift, Clock, Home as HomeLoan, ArrowRightLeft } from "lucide-react";
import { Link } from "wouter";

const calculators = [
  {
    title: "Net Pay / Salary Calculator",
    description: "Calculate your take-home pay after SSS, PhilHealth, Pag-IBIG, and income tax deductions.",
    icon: Receipt,
    href: "/salary",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    title: "BIR Income Tax Calculator",
    description: "Compute your annual income tax based on the latest BIR TRAIN Law brackets.",
    icon: Landmark,
    href: "/bir-tax",
    color: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
  },
  {
    title: "SSS Contribution Calculator",
    description: "Check your monthly SSS contribution breakdown for 2024 and 2025.",
    icon: Shield,
    href: "/sss",
    color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300"
  },
  {
    title: "PhilHealth Contribution",
    description: "Compute your PhilHealth monthly premium based on the current 5% rate.",
    icon: Umbrella,
    href: "/philhealth",
    color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900 dark:text-cyan-300"
  },
  {
    title: "Pag-IBIG Contribution",
    description: "Calculate your monthly HDMF contribution and see both employee and employer shares.",
    icon: Building2,
    href: "/pagibig",
    color: "text-rose-600 bg-rose-100 dark:bg-rose-900 dark:text-rose-300"
  },
  {
    title: "Pag-IBIG Housing Loan",
    description: "Compute your monthly amortization using official HDMF rates. Covers all fixing periods up to 30 years.",
    icon: HomeLoan,
    href: "/pagibig-housing-loan",
    color: "text-pink-600 bg-pink-100 dark:bg-pink-900 dark:text-pink-300"
  },
  {
    title: "Pag-IBIG vs Bank Loan",
    description: "Side-by-side cost comparison: see which gives you the lower monthly payment and total interest for your exact loan amount and term.",
    icon: ArrowRightLeft,
    href: "/loan-comparison",
    color: "text-teal-600 bg-teal-100 dark:bg-teal-900 dark:text-teal-300"
  },
  {
    title: "13th Month Pay Calculator",
    description: "Compute your 13th month pay under PD 851, including pro-rated amounts for partial years.",
    icon: Gift,
    href: "/13th-month",
    color: "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
  },
  {
    title: "Overtime Pay Calculator",
    description: "Calculate overtime pay for regular days, rest days, and holidays under the Labor Code.",
    icon: Clock,
    href: "/overtime",
    color: "text-violet-600 bg-violet-100 dark:bg-violet-900 dark:text-violet-300"
  },
  {
    title: "Loan Amortization",
    description: "Calculate your monthly payments for personal, auto, or housing loans.",
    icon: Calculator,
    href: "/loan",
    color: "text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-300"
  }
];

export default function Home() {
  useEffect(() => {
    setPageSEO(
      "PH Calculators — Free Philippine Financial Calculators 2025",
      "Free Philippine financial calculators for SSS, PhilHealth, BIR income tax, salary net pay, Pag-IBIG, 13th month pay, overtime, and loan amortization. Accurate 2025 government rates."
    );
  }, []);
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Philippine Financial Calculators
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Free, fast, and accurate tools to compute your payroll deductions, taxes, and government contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link key={calc.href} href={calc.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-border/50 hover:border-primary/50 group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${calc.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{calc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {calc.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
