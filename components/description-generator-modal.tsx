/**
 * Description Generator Modal Component
 * 
 * This component provides a modal interface for generating recipe descriptions using AI.
 * It shows loading animations during generation and allows the user to apply the generated text.
 */

"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export interface DescriptionGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  recipeName: string
  ingredients: string[]
  onDescriptionGenerated: (description: string) => void
}

export function DescriptionGeneratorModal({
  isOpen,
  onClose,
  recipeName,
  ingredients,
  onDescriptionGenerated,
}: DescriptionGeneratorModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Generate a description using the API
  const generateDescription = async () => {
    if (!recipeName) {
      toast.error("Please enter a recipe name before generating a description")
      return
    }

    try {
      setIsGenerating(true)
      setError(null)
      
      const filteredIngredients = ingredients.filter(i => i.trim() !== "")
      
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: recipeName, 
          ingredients: filteredIngredients 
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate description")
      }

      const data = await response.json()
      setGeneratedDescription(data.description)
    } catch (error: any) {
      console.error("Error generating description:", error)
      setError(error.message || "Failed to generate description")
      toast.error("Failed to generate description. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Apply the generated description
  const applyDescription = () => {
    if (generatedDescription) {
      onDescriptionGenerated(generatedDescription)
      onClose()
      toast.success("Description applied successfully!")
    }
  }

  // Reset the state when closing the modal
  const handleClose = () => {
    setGeneratedDescription("")
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            AI Recipe Description Generator
          </DialogTitle>
          <DialogDescription>
            Create an engaging description for your recipe using AI
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-4">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-center text-muted-foreground">
                Crafting the perfect description for your recipe...
              </p>
            </div>
          ) : error ? (
            <div className="text-center p-4 border border-destructive/20 rounded-lg bg-destructive/10">
              <p className="text-destructive font-medium mb-2">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => setError(null)}
              >
                Try Again
              </Button>
            </div>
          ) : generatedDescription ? (
            <div className="space-y-4">
              <p className="text-sm font-medium">Generated Description:</p>
              <Textarea
                value={generatedDescription}
                onChange={(e) => setGeneratedDescription(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={generateDescription}
                  className="mr-2"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Click the button below to generate a description based on your recipe name
                {ingredients.filter(i => i.trim() !== "").length > 0 ? " and ingredients" : ""}.
              </p>
              <Button
                onClick={generateDescription}
                className="mx-auto"
                disabled={!recipeName}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Description
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={applyDescription}
            disabled={!generatedDescription || isGenerating}
          >
            Apply Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 