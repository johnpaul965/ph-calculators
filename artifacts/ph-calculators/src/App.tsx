import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Salary from "@/pages/salary";
import BirTax from "@/pages/bir-tax";
import SSS from "@/pages/sss";
import PhilHealth from "@/pages/philhealth";
import Loan from "@/pages/loan";
import PagIbig from "@/pages/pagibig";
import PagIbigHousingLoan from "@/pages/pagibig-housing-loan";
import LoanComparison from "@/pages/loan-comparison";
import ThirteenthMonth from "@/pages/thirteenth-month";
import Overtime from "@/pages/overtime";

import Blog from "@/pages/blog/index";
import SSSContribution2025 from "@/pages/blog/sss-contribution-2025";
import ThirteenthMonthGuide from "@/pages/blog/thirteenth-month-guide";
import HowToReadYourPayslip from "@/pages/blog/how-to-read-your-payslip";
import BIRWithholdingTax2025 from "@/pages/blog/bir-withholding-tax-2025";

import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Disclaimer from "@/pages/disclaimer";
import Contact from "@/pages/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/salary" component={Salary} />
      <Route path="/bir-tax" component={BirTax} />
      <Route path="/sss" component={SSS} />
      <Route path="/philhealth" component={PhilHealth} />
      <Route path="/loan" component={Loan} />
      <Route path="/pagibig" component={PagIbig} />
      <Route path="/pagibig-housing-loan" component={PagIbigHousingLoan} />
      <Route path="/loan-comparison" component={LoanComparison} />
      <Route path="/13th-month" component={ThirteenthMonth} />
      <Route path="/overtime" component={Overtime} />
      
      <Route path="/blog" component={Blog} />
      <Route path="/blog/sss-contribution-2025" component={SSSContribution2025} />
      <Route path="/blog/13th-month-pay-guide" component={ThirteenthMonthGuide} />
      <Route path="/blog/how-to-read-your-payslip" component={HowToReadYourPayslip} />
      <Route path="/blog/bir-withholding-tax-2025" component={BIRWithholdingTax2025} />

      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/contact" component={Contact} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
