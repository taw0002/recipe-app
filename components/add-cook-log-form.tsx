"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { recipes } from "@/lib/data"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API to save the data
    const recipe = recipes.find((r) => r.id === recipeId)
    if (recipe) {
      recipe.cookLogs.push({
        date: new Date().toISOString(),
        rating,
        notes,
      })

      // Recalculate average rating
      const totalRating = recipe.cookLogs.reduce((sum, log) => sum + log.rating, 0)
      recipe.averageRating = totalRating / recipe.cookLogs.length
    }

    onComplete()
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
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button type="submit" disabled={rating === 0}>
          Save
        </Button>
      </div>
    </form>
  )
}

