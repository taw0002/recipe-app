/**
 * Features Page Component
 * 
 * This page provides a detailed overview of all the features available in the Recipe Tracker app.
 * It is organized by category and includes visual examples and descriptions of each feature.
 */

import Image from "next/image";
import Link from "next/link";
import { 
  ChefHat, Clock, Tag, PenSquare, BarChart3, Sparkles, 
  Search, Utensils, ShoppingCart, Scale, Share, BookOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Master Your Recipes
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explore all the powerful features that help you organize, track, and improve your cooking
            </p>
          </div>
        </div>
      </section>

      {/* Recipe Management Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                <ChefHat className="mr-2 h-4 w-4" />
                Recipe Management
              </div>
              <h2 className="text-3xl font-bold">Create, Store, and Organize Your Recipes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Keep all your recipes in one place with our comprehensive recipe management system. Add ingredients, instructions, cooking times, and more to create a complete recipe library.
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Create unlimited recipes with rich formatting options</li>
                  <li>Upload your own photos or use AI-generated images</li>
                  <li>Easily categorize recipes with tags and collections</li>
                  <li>Add prep time, cooking time, and servings information</li>
                  <li>Include nutritional data for health-conscious cooking</li>
                </ul>
              </div>
              <div className="pt-4">
                <Link href="/recipes">
                  <Button>Start Creating Recipes</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/feature-recipe-management.jpg"
                alt="Screenshot of recipe management interface"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Logs Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg order-2 lg:order-1">
              <Image
                src="/images/feature-cooking-logs.jpg"
                alt="Screenshot of cooking log interface"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                <Clock className="mr-2 h-4 w-4" />
                Cooking Logs
              </div>
              <h2 className="text-3xl font-bold">Track Your Cooking Journey</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Record every time you make a recipe and document what worked, what didn't, and any modifications you made along the way.
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Log each cooking attempt with date and notes</li>
                  <li>Rate your results to track improvement over time</li>
                  <li>Document modifications and substitutions</li>
                  <li>Upload photos of your finished dishes</li>
                  <li>Track cooking time variations</li>
                </ul>
              </div>
              <div className="pt-4">
                <Link href="/recipes">
                  <Button>Start Tracking Your Cooking</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Image Generation Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Image Generation
              </div>
              <h2 className="text-3xl font-bold">Beautiful Recipe Images with AI</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Don't have a photo of your recipe? Our AI-powered image generation creates beautiful, professional-looking images based on your recipe description.
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Generate custom images based on your recipe details</li>
                  <li>Automatically creates prompts from your recipe information</li>
                  <li>Edit prompts for more precise results</li>
                  <li>Multiple style options to match your preferences</li>
                  <li>Integrated directly into the recipe creation flow</li>
                </ul>
              </div>
              <div className="pt-4">
                <Link href="/recipes/new">
                  <Button>Try AI Image Generation</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/feature-ai-generation.jpg"
                alt="Example of AI-generated recipe images"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard & Analytics Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg order-2 lg:order-1">
              <Image
                src="/images/feature-dashboard.jpg"
                alt="Screenshot of cooking dashboard and analytics"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard & Analytics
              </div>
              <h2 className="text-3xl font-bold">Gain Insights Into Your Cooking</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our comprehensive dashboard provides valuable insights into your cooking habits, preferences, and improvements over time.
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Track cooking frequency and patterns</li>
                  <li>Visualize most-cooked recipe categories</li>
                  <li>Monitor recipe rating improvements</li>
                  <li>See cooking time trends</li>
                  <li>Identify your favorite and most successful recipes</li>
                </ul>
              </div>
              <div className="pt-4">
                <Link href="/dashboard">
                  <Button>Explore Your Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Even More Powerful Features
              </h2>
              <p className="max-w-[700px] text-muted-foreground mx-auto">
                Discover all the tools that make Recipe Tracker the ultimate solution for home cooks
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-3 rounded-lg border p-6">
              <Search className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Smart Search</h3>
              <p className="text-muted-foreground">
                Find recipes by ingredients, tags, cooking time, or any other attribute with our powerful search system
              </p>
            </div>
            <div className="flex flex-col space-y-3 rounded-lg border p-6">
              <ShoppingCart className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Shopping Lists</h3>
              <p className="text-muted-foreground">
                Generate shopping lists from recipes with automatic ingredient consolidation and categorization
              </p>
            </div>
            <div className="flex flex-col space-y-3 rounded-lg border p-6">
              <Scale className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Recipe Scaling</h3>
              <p className="text-muted-foreground">
                Automatically adjust ingredient quantities based on desired servings or yield
              </p>
            </div>
            <div className="flex flex-col space-y-3 rounded-lg border p-6">
              <Tag className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Advanced Tagging</h3>
              <p className="text-muted-foreground">
                Organize recipes with customizable tags for cuisine, diet, occasion, technique, and more
              </p>
            </div>
            <div className="flex flex-col space-y-3 rounded-lg border p-6">
              <Share className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Recipe Sharing</h3>
              <p className="text-muted-foreground">
                Share recipes with friends and family via email, social media, or generated links
              </p>
            </div>
            <div className="flex flex-col space-y-3 rounded-lg border p-6">
              <BookOpen className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Recipe Import</h3>
              <p className="text-muted-foreground">
                Import recipes from popular websites and apps to keep everything in one place
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
                Ready to Try All These Features?
              </h2>
              <p className="max-w-[700px] mx-auto">
                Start organizing your recipes today and discover how Recipe Tracker can transform your cooking
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/recipes">
                <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto border-primary-foreground">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 