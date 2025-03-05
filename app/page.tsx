/**
 * Main Landing Page Component
 * 
 * This serves as the marketing-focused homepage for the Recipe Tracker application.
 * It showcases key features, benefits, and includes calls to action to drive user adoption.
 */

import Image from "next/image";
import Link from "next/link";
import { ChefHat, Clock, Tag, PenSquare, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Your Personal Recipe Management Solution
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Organize, track, and improve your cooking with our smart recipe management app
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/recipes">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[350px] lg:h-[500px] overflow-hidden rounded-xl">
              <Image
                src="/images/hero-image.jpg"
                alt="Beautiful food imagery showcasing recipes"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Master Your Recipes
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Our comprehensive suite of tools helps you organize recipes, track cooking sessions, and improve your culinary skills
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-4">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Recipe Management</h3>
              <p className="text-center text-muted-foreground">
                Create, edit and organize all your recipes in one convenient place
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cooking Logs</h3>
              <p className="text-center text-muted-foreground">
                Track when you make recipes and how they turned out
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Organization</h3>
              <p className="text-center text-muted-foreground">
                Tag and categorize recipes for easy discovery
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-4">
                <PenSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Detailed Notes</h3>
              <p className="text-center text-muted-foreground">
                Add notes and variations to perfect your recipes over time
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Cooking Dashboard</h3>
              <p className="text-center text-muted-foreground">
                View stats and trends about your cooking habits
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Image Generation</h3>
              <p className="text-center text-muted-foreground">
                Generate beautiful images for your recipes with AI
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/recipes">
              <Button size="lg">
                Start Organizing Your Recipes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Loved by Home Cooks
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                See what our users are saying about how Recipe Tracker has transformed their cooking
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <p className="text-muted-foreground">
                "This app has completely changed how I organize my recipes. I can finally keep track of what works and what doesn't!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-1 text-primary">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium">Jamie Davis</p>
                  <p className="text-xs text-muted-foreground">Home Chef</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <p className="text-muted-foreground">
                "I love the cooking log feature. Being able to look back at my notes from previous attempts has made me a much better cook."
              </p>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-1 text-primary">
                  SK
                </div>
                <div>
                  <p className="text-sm font-medium">Sam Kim</p>
                  <p className="text-xs text-muted-foreground">Food Blogger</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Cooking?
              </h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                Start organizing your recipes today and take your cooking to the next level
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/recipes">
                <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

