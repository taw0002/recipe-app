"use client"

import { useEffect, useRef } from "react"
import { format, subDays, eachDayOfInterval, isSameDay } from "date-fns"

type CookLog = {
  date: string
  rating: number
  notes: string
  recipeId: string
  recipeName: string
}

type CookingActivityChartProps = {
  logs: CookLog[]
  timeRange: "week" | "month" | "year"
}

export function CookingActivityChart({ logs, timeRange }: CookingActivityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set up date range
    const today = new Date()
    let startDate: Date
    let dateFormat: string
    let skipLabels = 1

    switch (timeRange) {
      case "week":
        startDate = subDays(today, 7)
        dateFormat = "EEE"
        break
      case "month":
        startDate = subDays(today, 30)
        dateFormat = "MMM d"
        skipLabels = 3
        break
      case "year":
        startDate = subDays(today, 365)
        dateFormat = "MMM"
        skipLabels = 30
        break
      default:
        startDate = subDays(today, 30)
        dateFormat = "MMM d"
        skipLabels = 3
    }

    // Generate date range
    const dateRange = eachDayOfInterval({ start: startDate, end: today })

    // Count logs per day
    const countsByDay = dateRange.map((date) => {
      const count = logs.filter((log) => isSameDay(new Date(log.date), date)).length
      return {
        date,
        count,
      }
    })

    // Find max count for scaling
    const maxCount = Math.max(...countsByDay.map((d) => d.count), 1)

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / countsByDay.length

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#d1d5db" // gray-300
    ctx.lineWidth = 1

    // X-axis
    ctx.moveTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.stroke()

    // Draw bars
    countsByDay.forEach((day, index) => {
      const x = padding + index * barWidth
      const barHeight = (day.count / maxCount) * chartHeight
      const y = canvas.height - padding - barHeight

      // Draw bar
      ctx.fillStyle = "#10b981" // green-500
      ctx.fillRect(x, y, barWidth - 2, barHeight)

      // Draw date labels (skip some for readability)
      if (index % skipLabels === 0) {
        ctx.fillStyle = "#6b7280" // gray-500
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(format(day.date, dateFormat), x + barWidth / 2, canvas.height - padding + 15)
      }
    })

    // Draw count labels on y-axis
    const yLabelCount = 5
    for (let i = 0; i <= yLabelCount; i++) {
      const value = Math.round((i / yLabelCount) * maxCount)
      const y = canvas.height - padding - (i / yLabelCount) * chartHeight

      ctx.fillStyle = "#6b7280" // gray-500
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(value.toString(), padding - 5, y + 3)

      // Draw horizontal grid line
      ctx.beginPath()
      ctx.strokeStyle = "#e5e7eb" // gray-200
      ctx.setLineDash([2, 2])
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Add title
    ctx.fillStyle = "#111827" // gray-900
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Number of Cooking Sessions", canvas.width / 2, 15)
  }, [logs, timeRange])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
    </div>
  )
}

