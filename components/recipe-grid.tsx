"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, PlusCircle, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the Recipe type
type CookLog = {
  date: string
  rating: number
  notes: string
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

// Define constants for image dimensions
const CARD_IMAGE_HEIGHT = 250 // px
const CARD_IMAGE_ASPECT_RATIO = "1/1" // Square aspect ratio

/**
 * RecipeGrid Component
 * Displays a grid of recipe cards with search functionality
 */
export default function RecipeGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/recipes')
        
        if (!response.ok) {
          throw new Error(`Error fetching recipes: ${response.statusText}`)
        }
        
        const data = await response.json()
        setRecipes(data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch recipes:', err)
        setError('Failed to load recipes. Please try again later.')
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <RefreshCw className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>

      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search recipes or tags..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {recipes.length === 0 ? (
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
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                <line x1="6" x2="18" y1="17" y2="17"></line>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">No recipes found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Time to get cooking! You haven't added any recipes yet. Create your first recipe to get started.
            </p>
            <Link href="/recipes/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add your first recipe
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            Want some inspiration? Try running <code className="bg-muted p-1 rounded text-xs">npm run db:seed</code> to populate your database with sample recipes.
          </p>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-muted/10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No matching recipes</h3>
          <p className="text-muted-foreground">
            No recipes found matching "{searchTerm}". Try a different search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full" style={{ 
                  height: `${CARD_IMAGE_HEIGHT}px`,
                  aspectRatio: CARD_IMAGE_ASPECT_RATIO
                }}>
                  <Image 
                    src={recipe.image || "/placeholder.svg"} 
                    alt={recipe.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                  <p className="text-muted-foreground line-clamp-2 mb-2">{recipe.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{recipe.cookingTime} mins</span>
                    {recipe.averageRating > 0 && (
                      <div className="flex items-center ml-4">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.averageRating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                  {recipe.cookLogs.length > 0
                    ? `Cooked ${recipe.cookLogs.length} ${recipe.cookLogs.length === 1 ? "time" : "times"}`
                    : "Not cooked yet"}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

