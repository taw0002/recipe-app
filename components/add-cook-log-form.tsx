"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

/**
 * AddCookLogForm Component
 * Allows users to submit their experience cooking a recipe by providing
 * a rating and notes
 */
export default function AddCookLogForm({
  recipeId,
  onComplete,
}: {
  recipeId: string
  onComplete: () => void
}) {
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call the API to save the cooking log
      const response = await fetch(`/api/recipes/${recipeId}/cook-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          rating,
          notes,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save cooking log')
      }

      // Display success toast
      toast({
        title: "Success!",
        description: "Your cooking experience has been logged.",
      })

      // Notify parent component that we're done
      onComplete()
    } catch (error) {
      console.error('Error saving cooking log:', error)
      toast({
        title: "Error",
        description: "Failed to save your cooking log. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1"
            >
              <Star
                className={`h-6 w-6 ${
                  (hoveredRating ? star <= hoveredRating : star <= rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-2">
          Notes
        </label>
        <Textarea
          id="notes"
          placeholder="How did it turn out? Any modifications you made?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onComplete} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={rating === 0 || isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}

