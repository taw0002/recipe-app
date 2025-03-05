"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Star, TrendingUp, Utensils, PlusCircle, Clock } from "lucide-react"
import { CookingActivityChart } from "@/components/cooking-activity-chart"
import { format, subDays } from "date-fns"
import { Button } from "@/components/ui/button"

// Define standard image dimensions
const DASHBOARD_THUMB_SIZE = 64 // px
const DASHBOARD_THUMB_ASPECT_RATIO = "1/1" // Square aspect ratio

// Define types for our data
type CookLog = {
  date: string
  rating: number
  notes: string
  recipeId?: string
  recipeName?: string
  recipeImage?: string
}

type Recipe = {
  id: string
  name: string
  description: string
  image: string
  cookingTime: number
  ingredients: string[]
  steps: string[]
  tags: string[]
  cookLogs: CookLog[]
  averageRating: number
}

/**
 * Dashboard Page Component
 * Displays overview of recipes, cooking stats, and activity
 */
export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch recipes data from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/recipes')
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Error response:', errorText)
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        setRecipes(Array.isArray(data) ? data : [])
      } catch (err: any) {
        console.error('Failed to fetch recipes:', err)
        setError(`Failed to load recipe data: ${err.message}`)
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  // Calculate metrics based on recipe data
  const totalCooks = recipes.reduce((sum, recipe) => 
    sum + (Array.isArray(recipe.cookLogs) ? recipe.cookLogs.length : 0), 0)

  // Calculate average rating across all recipes
  const allRatings = recipes.flatMap((recipe) => 
    Array.isArray(recipe.cookLogs) ? recipe.cookLogs.map((log) => log.rating) : [])
  const averageRating = allRatings.length
    ? (allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length).toFixed(1)
    : "0.0"

  // Get most frequently cooked recipes
  const sortedByFrequency = [...recipes]
    .filter((recipe) => Array.isArray(recipe.cookLogs) && recipe.cookLogs.length > 0)
    .sort((a, b) => 
      (Array.isArray(b.cookLogs) ? b.cookLogs.length : 0) - 
      (Array.isArray(a.cookLogs) ? a.cookLogs.length : 0))
    .slice(0, 3)

  // Get highest rated recipes
  const sortedByRating = [...recipes]
    .filter((recipe) => typeof recipe.averageRating === 'number' && recipe.averageRating > 0)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3)

  // Get recent cooking activity
  const allCookLogs = recipes.flatMap((recipe) =>
    Array.isArray(recipe.cookLogs) ? recipe.cookLogs.map((log) => ({
      recipeId: recipe.id,
      recipeName: recipe.name,
      recipeImage: recipe.image,
      ...log,
    })) : []
  )

  const sortedCookLogs = [...allCookLogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // Filter logs based on time range
  const getFilteredLogs = () => {
    const now = new Date()
    let cutoffDate: Date

    switch (timeRange) {
      case "week":
        cutoffDate = subDays(now, 7)
        break
      case "month":
        cutoffDate = subDays(now, 30)
        break
      case "year":
        cutoffDate = subDays(now, 365)
        break
      default:
        cutoffDate = subDays(now, 30)
    }

    return allCookLogs.filter((log) => new Date(log.date) >= cutoffDate)
  }

  const filteredLogs = getFilteredLogs()

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="h-10 bg-gray-200 rounded-md w-64 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-32 rounded-md animate-pulse"></div>
          ))}
        </div>
        <div className="bg-gray-200 h-80 rounded-md mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-96 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  // Add this empty dashboard state when there are no recipes
  if (recipes.length === 0 && !loading && !error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 px-4 border rounded-lg bg-muted/10">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-muted-foreground"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Your dashboard is waiting</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Start by adding recipes to your collection. Once you've added recipes and logged your cooking experiences, you'll see your stats and activity here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/recipes/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add your first recipe
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Browse recipes
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Want to see the dashboard in action? Try running <code className="bg-muted p-1 rounded text-xs">npm run db:seed</code> to add sample data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <Tabs
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as "week" | "month" | "year")}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipes.length}</div>
            <p className="text-xs text-muted-foreground">recipes in your collection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cooks</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCooks}</div>
            <p className="text-xs text-muted-foreground">cooking sessions logged</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground">average across all recipes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Period</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-xs text-muted-foreground">
              cooks in the past {timeRange === "week" ? "7 days" : timeRange === "month" ? "30 days" : "year"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Cooking Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <CookingActivityChart logs={allCookLogs} timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Most Frequently Cooked</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedByFrequency.length > 0 ? (
              <div className="space-y-4">
                {sortedByFrequency.map((recipe) => (
                  <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
                    <div className="flex items-center space-x-4 hover:bg-muted p-2 rounded-md transition-colors">
                      <div 
                        className="relative rounded-md overflow-hidden"
                        style={{
                          width: `${DASHBOARD_THUMB_SIZE}px`,
                          height: `${DASHBOARD_THUMB_SIZE}px`,
                          aspectRatio: DASHBOARD_THUMB_ASPECT_RATIO
                        }}
                      >
                        <Image
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{recipe.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ChefHat className="mr-1 h-4 w-4" />
                          <span>Cooked {recipe.cookLogs.length} times</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-muted/10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                  <ChefHat className="h-6 w-6 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-semibold mb-2">No cooking data yet</h4>
                <p className="text-sm text-muted-foreground px-4">
                  Start cooking and log your experiences to see your most frequently cooked recipes here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Highest Rated Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            {sortedByRating.length > 0 ? (
              <div className="space-y-4">
                {sortedByRating.map((recipe) => (
                  <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
                    <div className="flex items-center space-x-4 hover:bg-muted p-2 rounded-md transition-colors">
                      <div 
                        className="relative rounded-md overflow-hidden"
                        style={{
                          width: `${DASHBOARD_THUMB_SIZE}px`,
                          height: `${DASHBOARD_THUMB_SIZE}px`,
                          aspectRatio: DASHBOARD_THUMB_ASPECT_RATIO
                        }}
                      >
                        <Image
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{recipe.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.round(recipe.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-1">({recipe.averageRating.toFixed(1)})</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-muted/10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                  <Star className="h-6 w-6 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-semibold mb-2">No ratings yet</h4>
                <p className="text-sm text-muted-foreground px-4">
                  Rate your recipes after cooking to see your highest-rated dishes appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Cooking Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedCookLogs.length > 0 ? (
            <div className="space-y-4">
              {sortedCookLogs.map((log, index) => (
                <Link href={`/recipes/${log.recipeId}`} key={index}>
                  <div className="flex items-center space-x-4 hover:bg-muted p-2 rounded-md transition-colors">
                    {log.recipeImage && (
                      <div 
                        className="relative rounded-md overflow-hidden"
                        style={{
                          width: `${DASHBOARD_THUMB_SIZE}px`,
                          height: `${DASHBOARD_THUMB_SIZE}px`,
                          aspectRatio: DASHBOARD_THUMB_ASPECT_RATIO
                        }}
                      >
                        <Image
                          src={log.recipeImage || "/placeholder.svg"}
                          alt={log.recipeName || "Recipe"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{log.recipeName}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{format(new Date(log.date), "MMM d, yyyy")}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < log.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg bg-muted/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="text-lg font-semibold mb-2">No cooking activity yet</h4>
              <p className="text-sm text-muted-foreground px-4">
                As you cook and log your experiences, your recent cooking activity will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

