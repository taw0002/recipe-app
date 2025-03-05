"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { recipes } from "@/lib/data"

export default function NewRecipe() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("/placeholder.svg?height=400&width=600")
  const [cookingTime, setCookingTime] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([""])
  const [steps, setSteps] = useState<string[]>([""])
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty ingredients and steps
    const filteredIngredients = ingredients.filter((i) => i.trim() !== "")
    const filteredSteps = steps.filter((s) => s.trim() !== "")

    // In a real app, this would call an API to save the data
    const newRecipe = {
      id: Date.now().toString(),
      name,
      description,
      image,
      cookingTime: Number.parseInt(cookingTime) || 0,
      ingredients: filteredIngredients,
      steps: filteredSteps,
      tags,
      cookLogs: [],
      averageRating: 0,
    }

    recipes.push(newRecipe)
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Add New Recipe</h1>

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
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-[calc(100%-1.5rem)]"
              required
            />
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
          <Button type="button" variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button type="submit">Save Recipe</Button>
        </div>
      </form>
    </div>
  )
}

