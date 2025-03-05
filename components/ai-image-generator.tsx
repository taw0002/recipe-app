/**
 * AI Image Generator Component
 * This component automatically generates food images for recipes based on their title and description.
 * It uses the OpenAI DALL-E model through our API to create photorealistic images.
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

// Standard image dimensions for consistent display
const IMAGE_HEIGHT = 300 // px
const IMAGE_WIDTH = 300 // px
const ASPECT_RATIO = "1/1" // Square aspect ratio

export interface AIImageGeneratorProps {
  recipeName: string
  recipeDescription: string
  onImageGenerated: (imageUrl: string) => void
  currentImage?: string
}

export function AIImageGenerator({
  recipeName,
  recipeDescription,
  onImageGenerated,
  currentImage
}: AIImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate an image using the recipe name and description
  const generateImage = async () => {
    if (!recipeName) {
      toast.error("Please enter a recipe name before generating an image")
      return
    }

    try {
      setIsGenerating(true)
      // Create a concise prompt combining the name and key elements from the description
      const prompt = `${recipeName}${recipeDescription ? ': ' + recipeDescription.substring(0, 100) : ''}`
      
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate image")
      }

      const data = await response.json()
      onImageGenerated(data.imageUrl)
      toast.success("Image generated successfully!")
    } catch (error) {
      console.error("Error generating image:", error)
      toast.error("Failed to generate image. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Display current image if available */}
      {currentImage && (
        <div className="relative w-full flex justify-center">
          <div
            style={{
              width: `${IMAGE_WIDTH}px`,
              height: `${IMAGE_HEIGHT}px`,
              aspectRatio: ASPECT_RATIO,
              overflow: "hidden",
            }}
            className="border rounded-md"
          >
            <img
              src={currentImage}
              alt="Recipe"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
      
      <Button
        onClick={generateImage}
        disabled={isGenerating}
        className="w-full"
        variant="outline"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Image...
          </>
        ) : (
          <>Generate Image from Recipe Details</>
        )}
      </Button>
    </div>
  )
} 