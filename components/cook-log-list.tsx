"use client"
import { format } from "date-fns"
import { Star } from "lucide-react"
import { recipes } from "@/lib/data"

export default function CookLogList({ recipeId }: { recipeId: string }) {
  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) return null

  if (recipe.cookLogs.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>You haven't cooked this recipe yet.</p>
        <p>Log your first cooking experience!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recipe.cookLogs.map((log, index) => (
        <div key={index} className="border-b pb-4 last:border-0">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">{format(new Date(log.date), "MMM d, yyyy")}</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < log.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm">{log.notes}</p>
        </div>
      ))}
    </div>
  )
}

