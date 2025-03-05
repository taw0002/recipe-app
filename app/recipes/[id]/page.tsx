"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, ArrowLeft, Star, Edit } from "lucide-react"
import { recipes } from "@/lib/data"
import CookLogList from "@/components/cook-log-list"
import AddCookLogForm from "@/components/add-cook-log-form"

export default function RecipeDetail() {
  const params = useParams()
  const router = useRouter()
  const [showAddLog, setShowAddLog] = useState(false)

  const recipe = recipes.find((r) => r.id === params.id)

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

          <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
            <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" />
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{recipe.cookingTime} mins</span>
            </div>
            {recipe.averageRating > 0 && (
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{recipe.averageRating.toFixed(1)}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <p className="mb-6 text-muted-foreground">{recipe.description}</p>

          <Tabs defaultValue="ingredients">
            <TabsList className="mb-4">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients">
              <ul className="list-disc pl-5 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="instructions">
              <ol className="list-decimal pl-5 space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-muted p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cooking Journal</h2>
              <Button onClick={() => setShowAddLog(!showAddLog)} variant="outline" size="sm">
                <ChefHat className="mr-2 h-4 w-4" />
                {showAddLog ? "Cancel" : "Log Cook"}
              </Button>
            </div>

            {showAddLog ? (
              <AddCookLogForm recipeId={recipe.id} onComplete={() => setShowAddLog(false)} />
            ) : (
              <CookLogList recipeId={recipe.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

