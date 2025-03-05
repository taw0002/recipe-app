"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, X, ArrowLeft, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { AIImageGenerator } from "@/components/ai-image-generator"
import Image from "next/image"
import { DescriptionGeneratorModal } from "@/components/description-generator-modal"

// Define standard image dimensions
const IMAGE_HEIGHT = 300 // px
const IMAGE_WIDTH = 300 // px
const IMAGE_ASPECT_RATIO = "1/1" // Square aspect ratio
const DEFAULT_IMAGE = "/placeholder.svg"

/**
 * EditRecipe Component
 * Allows users to edit an existing recipe
 */
export default function EditRecipe() {
  const router = useRouter()
  const params = useParams()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([""])
  const [steps, setSteps] = useState<string[]>([""])
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/recipes/${params.id}`)
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        const recipe = await response.json()
        
        setName(recipe.name)
        setDescription(recipe.description)
        setImage(recipe.image)
        setCookingTime(recipe.cookingTime.toString())
        setIngredients(recipe.ingredients.length ? recipe.ingredients : [""])
        setSteps(recipe.steps.length ? recipe.steps : [""])
        setTags(recipe.tags)
      } catch (err: any) {
        console.error('Failed to fetch recipe:', err)
        setError(`Failed to load recipe: ${err.message}`)
        toast.error(`Failed to load recipe: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchRecipe()
    }
  }, [params.id, router])

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""])
  }

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients]
      newIngredients.splice(index, 1)
      setIngredients(newIngredients)
    }
  }

  const handleAddStep = () => {
    setSteps([...steps, ""])
  }

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    setSteps(newSteps)
  }

  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = [...steps]
      newSteps.splice(index, 1)
      setSteps(newSteps)
    }
  }

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()])
      setTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleImageGenerated = (imageUrl: string) => {
    setImage(imageUrl)
  }

  const handleDescriptionGenerated = (generatedDescription: string) => {
    setDescription(generatedDescription)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filter out empty ingredients and steps
      const filteredIngredients = ingredients.filter((i) => i.trim() !== "")
      const filteredSteps = steps.filter((s) => s.trim() !== "")

      // Prepare the recipe data
      const recipeData = {
        name,
        description,
        image,
        cookingTime: Number.parseInt(cookingTime) || 0,
        ingredients: filteredIngredients,
        steps: filteredSteps,
        tags,
      }

      // Call the API to update the recipe
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Error response:', errorData)
        throw new Error(`Failed to update recipe: ${response.statusText}`)
      }

      // Show success message
      toast.success("Recipe updated successfully!")

      // Redirect to the recipe detail page
      router.push(`/recipes/${params.id}`)
    } catch (error: any) {
      console.error('Error updating recipe:', error)
      toast.error("Failed to update recipe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-10 bg-gray-200 rounded-md w-64 animate-pulse mb-8"></div>
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-12 rounded-md animate-pulse"></div>
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
        <Button 
          className="mt-4" 
          onClick={() => router.push("/")}
        >
          Return to Recipes
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Edit Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Recipe Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
              <Input
                id="cookingTime"
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Recipe Image</Label>
              <div className="space-y-2">
                <Input 
                  id="image" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="Enter image URL"
                />
                
                <AIImageGenerator 
                  recipeName={name}
                  recipeDescription={description}
                  onImageGenerated={handleImageGenerated}
                  currentImage={image}
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <div className="space-y-2">
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-32"
                placeholder="Describe your recipe..."
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setIsDescriptionModalOpen(true)}
                className="w-full"
                disabled={!name.trim()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Description with AI
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((t) => (
              <div
                key={t}
                className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                {t}
                <button type="button" onClick={() => handleRemoveTag(t)} className="ml-2">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <Button type="button" onClick={handleAddTag} variant="outline">
              Add
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Ingredients</Label>
            <Button type="button" onClick={handleAddIngredient} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
              />
              <Button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                variant="outline"
                size="icon"
                disabled={ingredients.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Instructions</Label>
            <Button type="button" onClick={handleAddStep} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Textarea
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
              />
              <Button
                type="button"
                onClick={() => handleRemoveStep(index)}
                variant="outline"
                size="icon"
                disabled={steps.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push(`/recipes/${params.id}`)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      {/* Description Generator Modal */}
      <DescriptionGeneratorModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        recipeName={name}
        ingredients={ingredients}
        onDescriptionGenerated={handleDescriptionGenerated}
      />
    </div>
  )
}

