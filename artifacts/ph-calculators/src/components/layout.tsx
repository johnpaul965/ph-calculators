import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Calculator, Receipt, Shield, Umbrella, Home as HomeIcon,
  Menu, X, Landmark, FileText, Info, Building2, Gift, Clock,
  BookOpen, ChevronDown, ArrowRightLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
}

const calculatorLinks = [
  { href: "/salary", label: "Net Pay / Salary", icon: Receipt },
  { href: "/bir-tax", label: "BIR Income Tax", icon: Landmark },
  { href: "/sss", label: "SSS Contribution", icon: Shield },
  { href: "/philhealth", label: "PhilHealth Contribution", icon: Umbrella },
  { href: "/pagibig", label: "Pag-IBIG Contribution", icon: Building2 },
  { href: "/pagibig-housing-loan", label: "Pag-IBIG Housing Loan", icon: HomeIcon },
  { href: "/loan-comparison", label: "Pag-IBIG vs Bank Loan", icon: ArrowRightLeft },
  { href: "/13th-month", label: "13th Month Pay", icon: Gift },
  { href: "/overtime", label: "Overtime Pay", icon: Clock },
  { href: "/loan", label: "Loan Amortization", icon: Calculator },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isCalculatorPage = calculatorLinks.some((l) => l.href === location);

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight shrink-0">
            <Calculator className="h-6 w-6" />
            <span>PH Calculators</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`gap-1 text-sm font-medium h-9 px-3 hover:bg-primary-foreground/10 hover:text-white ${
                    isCalculatorPage
                      ? "text-white underline underline-offset-4"
                      : "text-primary-foreground/90"
                  }`}
                >
                  Calculators
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  Payroll & Contributions
                </DropdownMenuLabel>
                {calculatorLinks.slice(0, 5).map((link) => {
                  const Icon = link.icon;
                  return (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  Loans & Other
                </DropdownMenuLabel>
                {calculatorLinks.slice(5).map((link) => {
                  const Icon = link.icon;
                  return (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/blog"
              className={`text-sm font-medium px-3 h-9 flex items-center gap-1.5 rounded-md transition-colors hover:bg-primary-foreground/10 hover:text-white ${
                location === "/blog" || location.startsWith("/blog/")
                  ? "text-white underline underline-offset-4"
                  : "text-primary-foreground/90"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary-foreground/10 bg-primary/95 backdrop-blur">
            <nav className="flex flex-col py-4 px-4 gap-1">
              <Link
                href="/"
                className="flex items-center gap-3 text-sm font-medium text-white px-2 py-2 rounded-md hover:bg-primary-foreground/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HomeIcon className="h-4 w-4" /> Home
              </Link>

              <div className="pt-1 pb-0.5 px-2">
                <p className="text-xs text-primary-foreground/50 font-medium uppercase tracking-wider">Calculators</p>
              </div>
              {calculatorLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white px-2 py-2 rounded-md hover:bg-primary-foreground/10"
                  >
                    <Icon className="h-4 w-4" /> {link.label}
                  </Link>
                );
              })}

              <div className="pt-1 pb-0.5 px-2">
                <p className="text-xs text-primary-foreground/50 font-medium uppercase tracking-wider">Content</p>
              </div>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white px-2 py-2 rounded-md hover:bg-primary-foreground/10"
              >
                <BookOpen className="h-4 w-4" /> Blog
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-secondary mt-12 border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4 text-foreground">
                <Calculator className="h-5 w-5" />
                <span>PH Calculators</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Free, fast, and accurate financial calculators for Filipinos. Empowering you to make informed decisions about your payroll, taxes, and contributions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Calculators</h4>
              <ul className="space-y-2 text-sm text-muted-foreground columns-2">
                {calculatorLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal & Info</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="flex items-center gap-2 hover:text-primary transition-colors"><Info className="h-3 w-3" /> About Us</Link></li>
                <li><Link href="/privacy" className="flex items-center gap-2 hover:text-primary transition-colors"><Shield className="h-3 w-3" /> Privacy Policy</Link></li>
                <li><Link href="/disclaimer" className="flex items-center gap-2 hover:text-primary transition-colors"><FileText className="h-3 w-3" /> Disclaimer</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="flex items-center gap-2 hover:text-primary transition-colors"><BookOpen className="h-3 w-3" /> Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} PH Calculators. All rights reserved.</p>
            <p>Not affiliated with any Philippine government agency.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
