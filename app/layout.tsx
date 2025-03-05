import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { Button } from "@/components/ui/button"
import { ChefHat, BarChart3, Utensils, Plus, InfoIcon, TagIcon, CreditCardIcon } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recipe Tracker & Cooking Journal",
  description: "Track your recipes and log your cooking experiences",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-10 bg-background border-b">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <ChefHat className="h-6 w-6 mr-2 text-primary" />
              <h1 className="text-xl font-bold">Recipe Tracker</h1>
            </Link>
            <nav className="hidden md:flex gap-2">
              <Link href="/features">
                <Button variant="ghost" size="sm">
                  <TagIcon className="mr-2 h-4 w-4" />
                  Features
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" size="sm">
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  Pricing
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="sm">
                  <InfoIcon className="mr-2 h-4 w-4" />
                  About
                </Button>
              </Link>
              <div className="h-6 border-l mx-2"></div>
              <Link href="/recipes">
                <Button variant="ghost" size="sm">
                  <Utensils className="mr-2 h-4 w-4" />
                  Recipes
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/recipes/new">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Recipe
                </Button>
              </Link>
            </nav>
            {/* Mobile menu - simplified for mobile view */}
            <nav className="flex md:hidden gap-2">
              <Link href="/recipes">
                <Button variant="ghost" size="sm">
                  <Utensils className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/recipes/new">
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <Link href="/" className="flex items-center">
                  <ChefHat className="h-6 w-6 mr-2 text-primary" />
                  <h2 className="text-lg font-bold">Recipe Tracker</h2>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Your personal recipe management solution to organize, track, and improve your cooking.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-3">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Recipe Tracker. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'