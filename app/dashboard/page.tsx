"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Star, TrendingUp, Utensils } from "lucide-react"
import { recipes } from "@/lib/data"
import { CookingActivityChart } from "@/components/cooking-activity-chart"
import { format, subDays } from "date-fns"

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  // Calculate total number of cooking sessions
  const totalCooks = recipes.reduce((sum, recipe) => sum + recipe.cookLogs.length, 0)

  // Calculate average rating across all recipes
  const allRatings = recipes.flatMap((recipe) => recipe.cookLogs.map((log) => log.rating))
  const averageRating = allRatings.length
    ? (allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length).toFixed(1)
    : "0.0"

  // Get most frequently cooked recipes
  const sortedByFrequency = [...recipes]
    .filter((recipe) => recipe.cookLogs.length > 0)
    .sort((a, b) => b.cookLogs.length - a.cookLogs.length)
    .slice(0, 3)

  // Get highest rated recipes
  const sortedByRating = [...recipes]
    .filter((recipe) => recipe.averageRating > 0)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3)

  // Get recent cooking activity
  const allCookLogs = recipes.flatMap((recipe) =>
    recipe.cookLogs.map((log) => ({
      recipeId: recipe.id,
      recipeName: recipe.name,
      recipeImage: recipe.image,
      ...log,
    })),
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
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
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
              <div className="text-center py-8 text-muted-foreground">
                <p>No cooking data available yet.</p>
                <p>Start cooking and logging your recipes!</p>
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
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
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
                                className={`h-3 w-3 ${i < recipe.averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
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
              <div className="text-center py-8 text-muted-foreground">
                <p>No ratings available yet.</p>
                <p>Rate your recipes after cooking!</p>
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
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image
                        src={log.recipeImage || "/placeholder.svg"}
                        alt={log.recipeName}
                        fill
                        className="object-cover"
                      />
                    </div>
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
            <div className="text-center py-8 text-muted-foreground">
              <p>No cooking activity recorded yet.</p>
              <p>Start cooking and logging your recipes!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

