import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, ShieldCheck, Heart } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About PH Calculators</h1>
          <p className="text-xl text-muted-foreground">Democratizing financial clarity for every Filipino.</p>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-16">
          <p className="lead text-lg">
            PH Calculators was born out of a simple frustration: trying to compute exact payroll deductions and taxes in the Philippines is needlessly complicated. Government circulars are long, tax brackets change, and doing the math manually often leads to errors.
          </p>
          <p>
            We believe that every Filipino employee, freelancer, and OFW deserves immediate, transparent, and completely free access to tools that help them understand their finances. Whether you're checking if your HR's payroll computation is correct, planning to take out a housing loan, or figuring out your net pay for a new job offer, our tools are designed to give you instant, accurate answers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-primary/5 border-none shadow-none">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Our Mission</h3>
              <p className="text-muted-foreground text-sm">To provide the most accurate, user-friendly, and accessible financial calculators tailored specifically for the Philippine context.</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-none shadow-none">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Accuracy First</h3>
              <p className="text-muted-foreground text-sm">Our algorithms are regularly audited and updated to strictly adhere to the latest circulars from BIR, SSS, PhilHealth, and Pag-IBIG.</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-none shadow-none">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Always Free</h3>
              <p className="text-muted-foreground text-sm">Financial literacy shouldn't be hidden behind a paywall. Our tools are free to use for everyone, supported only by unintrusive advertising.</p>
            </CardContent>
          </Card>
        </div>

        <div className="prose dark:prose-invert max-w-none bg-muted p-8 rounded-xl">
          <h2 className="mt-0">Who Uses PH Calculators?</h2>
          <ul>
            <li><strong>Employees</strong> verifying their monthly payslips and tax deductions.</li>
            <li><strong>Job Seekers</strong> calculating exactly how much take-home pay a new job offer will yield.</li>
            <li><strong>Freelancers & Self-Employed</strong> computing their voluntary contributions and tax liabilities.</li>
            <li><strong>HR & Payroll Professionals</strong> double-checking computations during payroll processing.</li>
            <li><strong>Future Homeowners</strong> estimating their monthly amortizations for Pag-IBIG or bank loans.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
