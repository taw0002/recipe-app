import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { Button } from "@/components/ui/button"
import { ChefHat, BarChart3, Utensils, Plus } from "lucide-react"

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
            <nav className="flex gap-2">
              <Link href="/">
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
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Recipe Tracker. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'