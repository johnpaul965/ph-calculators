import { useEffect } from "react";
import { setPageSEO } from "@/lib/seo";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import { BookOpen, Calendar } from "lucide-react";

const posts = [
  {
    slug: "/blog/bir-withholding-tax-2025",
    title: "BIR Withholding Tax 2025: How Much Income Tax Do You Actually Pay?",
    description: "Complete guide to Philippine withholding tax in 2025. Includes the TRAIN Law tax table, step-by-step computation, examples for salaries from ₱20k to ₱150k, and a quick-reference chart.",
    date: "January 2025",
    readTime: "9 min read",
  },
  {
    slug: "/blog/sss-contribution-2025",
    title: "How to Compute Your SSS Contribution in 2025",
    description: "Step-by-step guide to calculating your monthly SSS contribution using the 2025 rates. Includes tables, examples, and tips for employees, employers, and self-employed members.",
    date: "January 2025",
    readTime: "6 min read",
  },
  {
    slug: "/blog/13th-month-pay-guide",
    title: "13th Month Pay in the Philippines: Complete Guide for 2025",
    description: "Everything you need to know about 13th month pay — who is entitled, how it is computed, when it must be paid, and whether it is taxable.",
    date: "January 2025",
    readTime: "7 min read",
  },
  {
    slug: "/blog/how-to-read-your-payslip",
    title: "How to Read Your Philippine Payslip: All Deductions Explained",
    description: "A plain-language breakdown of every line on a typical Filipino payslip — SSS, PhilHealth, Pag-IBIG, withholding tax, and how your net pay is calculated.",
    date: "January 2025",
    readTime: "8 min read",
  },
];

export default function Blog() {
  useEffect(() => {
    setPageSEO(
      "PH Finance Blog — Philippine Payroll & Tax Guides 2025 | PH Calculators",
      "Free guides on Philippine payroll, SSS contributions, 13th month pay, income tax, and government deductions. Written for Filipino employees and HR professionals."
    );
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">PH Finance Blog</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Plain-language guides on Philippine payroll, taxes, and government contributions — written for employees, HR teams, and business owners.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={post.slug}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/50 hover:border-primary/50 group">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
