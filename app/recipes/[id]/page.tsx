"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, ArrowLeft, Star, Edit } from "lucide-react"
import CookLogList from "@/components/cook-log-list"
import AddCookLogForm from "@/components/add-cook-log-form"

// Define standard image dimensions
const DETAIL_IMAGE_HEIGHT = 400 // px
const DETAIL_IMAGE_WIDTH = 400 // px
const DETAIL_IMAGE_ASPECT_RATIO = "1/1" // Square aspect ratio

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

export default function RecipeDetail() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddLog, setShowAddLog] = useState(false)

  const recipeId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  // Fetch recipe from the API
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/recipes/${recipeId}`)
        
        if (response.status === 404) {
          setLoading(false)
          return // Recipe not found, will show the not found UI
        }
        
        if (!response.ok) {
          throw new Error(`Error fetching recipe: ${response.statusText}`)
        }
        
        const data = await response.json()
        setRecipe(data)
      } catch (err) {
        console.error('Failed to fetch recipe:', err)
        setError('Failed to load recipe. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (recipeId) {
      fetchRecipe()
    }
  }, [recipeId])

  // Handle adding a cook log
  const handleCookLogComplete = async () => {
    setShowAddLog(false)
    
    // Refresh the recipe data to get the updated cook logs
    try {
      const response = await fetch(`/api/recipes/${recipeId}`)
      if (response.ok) {
        const data = await response.json()
        setRecipe(data)
      }
    } catch (err) {
      console.error('Failed to refresh recipe data:', err)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
            </div>
            <div className="space-y-4">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
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
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recipes
        </Button>
      </div>
    )
  }

  // Not found state
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recipes
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Removed back button since we now have navigation in the header */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{recipe.name}</h1>
            <Link href={`/recipes/${recipe.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>

          <div className="flex justify-center mb-6">
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                height: `${DETAIL_IMAGE_HEIGHT}px`,
                width: `${DETAIL_IMAGE_WIDTH}px`,
                aspectRatio: DETAIL_IMAGE_ASPECT_RATIO,
              }}
            >
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              <Clock className="mr-1 h-4 w-4" />
              <span>{recipe.cookingTime} mins</span>
            </div>
            {recipe.averageRating > 0 && (
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(recipe.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1">({recipe.averageRating.toFixed(1)})</span>
              </div>
            )}
          </div>

          <p className="mb-6">{recipe.description}</p>

          <Tabs defaultValue="ingredients">
            <TabsList>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="steps">Preparation</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="pt-4">
              <ul className="list-disc pl-5 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="steps" className="pt-4">
              <ol className="list-decimal pl-5 space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cooking History</h2>
              <Button variant="outline" size="sm" onClick={() => setShowAddLog(true)}>
                <ChefHat className="mr-2 h-4 w-4" />
                Log Cook
              </Button>
            </div>

            {showAddLog ? (
              <AddCookLogForm recipeId={recipe.id} onComplete={handleCookLogComplete} />
            ) : (
              <CookLogList recipeId={recipe.id} cookLogs={recipe.cookLogs} onLogCook={() => setShowAddLog(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

