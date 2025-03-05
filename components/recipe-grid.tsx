"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"
import { recipes } from "@/lib/data"

export default function RecipeGrid() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" />
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
    </div>
  )
}

