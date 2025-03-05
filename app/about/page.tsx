/**
 * About Page Component
 * 
 * This page explains the mission, vision, and story behind the Recipe Tracker application.
 * It provides users with context about the product's purpose and the team behind it.
 */

import Link from "next/link";
import Image from "next/image";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <ChefHat className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Recipe Tracker
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our mission is to help home cooks organize their culinary journey and become better cooks
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative h-[350px] overflow-hidden rounded-xl">
              <Image
                src="/images/about-story.jpg"
                alt="A kitchen with cooking ingredients"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Our Story
                </h2>
                <p className="text-muted-foreground">
                  Recipe Tracker was born out of a simple problem: keeping track of recipes and cooking experiences. 
                  As passionate home cooks, we found ourselves constantly losing track of recipe adjustments, 
                  forgetting which variations worked best, and struggling to remember when we last made a particular dish.
                </p>
                <p className="text-muted-foreground">
                  We created Recipe Tracker to solve these challenges. Our application provides a central place to store 
                  recipes, log cooking experiences, and track improvements over time. We're dedicated to helping home cooks 
                  document their culinary journey and become better cooks through organized reflection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Our Values
              </h2>
              <p className="max-w-[700px] text-muted-foreground mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Simplicity</h3>
              <p className="text-center text-muted-foreground">
                We believe cooking tools should be intuitive and easy to use, so you can focus on the joy of cooking
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Progress</h3>
              <p className="text-center text-muted-foreground">
                We're committed to helping you improve your cooking skills through reflection and organization
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-center text-muted-foreground">
                We believe cooking connects people and creates community around shared meals and recipes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Our Team
              </h2>
              <p className="max-w-[700px] text-muted-foreground mx-auto">
                Meet the passionate home cooks and developers behind Recipe Tracker
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/images/team-1.jpg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Alex Chen</h3>
                <p className="text-sm text-muted-foreground">Founder & Developer</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/images/team-2.jpg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Taylor Morgan</h3>
                <p className="text-sm text-muted-foreground">UX Designer & Home Chef</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/images/team-3.jpg"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Jordan Lee</h3>
                <p className="text-sm text-muted-foreground">Recipe Specialist</p>
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
              <h2 className="text-3xl font-bold tracking-tighter">
                Join Our Culinary Journey
              </h2>
              <p className="max-w-[700px] mx-auto">
                Start organizing your recipes today and become part of our growing community
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/recipes">
                <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="mailto:contact@recipetracker.com">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto border-primary-foreground">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 