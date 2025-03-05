"use client"
import { format } from "date-fns"
import { Star, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the CookLog type
type CookLog = {
  date: string
  rating: number
  notes: string
}

/**
 * CookLogList Component
 * Displays a list of cooking logs for a specific recipe
 */
export default function CookLogList({ 
  recipeId, 
  cookLogs = [],
  onLogCook 
}: { 
  recipeId: string
  cookLogs: CookLog[]
  onLogCook?: () => void
}) {
  if (cookLogs.length === 0) {
    return (
      <div className="text-center py-6 border rounded-lg bg-muted/10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
          <ChefHat className="h-6 w-6 text-muted-foreground" />
        </div>
        <h4 className="text-lg font-semibold mb-2">No cooking logs yet</h4>
        <p className="text-sm text-muted-foreground px-4 mb-4">
          Log your cooking experiences to keep track of when you've made this recipe and how it turned out.
        </p>
        {onLogCook && (
          <Button size="sm" variant="outline" onClick={onLogCook}>
            <ChefHat className="mr-2 h-4 w-4" />
            Log your first cook
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cookLogs.map((log, index) => (
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

