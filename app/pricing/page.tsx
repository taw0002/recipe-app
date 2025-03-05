/**
 * Pricing Page Component
 * 
 * This page displays the different subscription tiers and plans available for the Recipe Tracker app.
 * It includes details about features, pricing, and calls to action for each plan.
 */

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Pricing
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that's right for your cooking needs
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Free Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Basic</h3>
                <p className="text-muted-foreground">Perfect for casual home cooks</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground">Free forever, no credit card required</p>
              </div>
              <div className="mt-6">
                <Link href="/recipes">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Up to 20 recipes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Basic cooking logs</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Simple tagging system</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Community support</span>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col rounded-lg border border-primary bg-background p-6 shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                Most Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For dedicated home chefs</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground">Billed monthly, cancel anytime</p>
              </div>
              <div className="mt-6">
                <Link href="/recipes">
                  <Button className="w-full" variant="default">Start Your Free Trial</Button>
                </Link>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Unlimited recipes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Advanced cooking logs with photos</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Comprehensive tagging system</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">AI-powered image generation (10/month)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Detailed cooking statistics</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Email support</span>
                </div>
              </div>
            </div>

            {/* Chef Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Chef</h3>
                <p className="text-muted-foreground">For professional chefs and food bloggers</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$24.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground">Billed monthly, cancel anytime</p>
              </div>
              <div className="mt-6">
                <Link href="/recipes">
                  <Button className="w-full">Start Your Free Trial</Button>
                </Link>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Everything in Pro, plus:</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Recipe scaling for professional kitchens</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Cost calculation per serving</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">AI-powered image generation (unlimited)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Recipe publishing tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[700px] text-muted-foreground mx-auto">
                Find answers to common questions about our plans and features
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-8 py-12">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to new features. When downgrading, changes will take effect at the end of your current billing cycle.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">What happens to my recipes if I cancel?</h3>
              <p className="text-muted-foreground">
                If you downgrade to the free plan, you'll maintain access to your most recent 20 recipes. Any additional recipes will be archived but not deleted. You can access them again by upgrading to a paid plan.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How does the free trial work?</h3>
              <p className="text-muted-foreground">
                All paid plans come with a 14-day free trial. You can cancel anytime during this period and won't be charged. After the trial period ends, your selected payment method will be billed automatically.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Is there a discount for annual billing?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 20% discount when you choose annual billing. This option is available during the checkout process for paid plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Ready to Transform Your Cooking?
              </h2>
              <p className="max-w-[700px] mx-auto">
                Start with our free plan today or try a Pro account with our 14-day free trial
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/recipes">
                <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 