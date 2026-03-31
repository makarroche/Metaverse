import { useState } from "react"
import { getRotationForDirection, parseGoalMap } from "../utils/helpers"

export const useCreateMorePolyanetsUI = () => {
  const [grid, setGrid] = useState<React.ReactNode[][]>(() =>
    Array.from({ length: 30 }, () => Array(30).fill("🌌"))
  )

  const { polyanets, comeths, soloons } = parseGoalMap()

  // Create Polyanets, Comeths and Soloons with UI to understand logic first
  const createPolyanetsUI = () => {
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => {
        if (polyanets.some((p) => p.row === i && p.column === j)) {
          return "🪐"
        }
        if (comeths.some((c) => c.row === i && c.column === j)) {
          const cometh = comeths.find((c) => c.row === i && c.column === j)

          return (
            <span
              style={{
                transform: `rotate(${getRotationForDirection(cometh?.direction)})`,
                display: "inline-block",
              }}
            >
              ☄️
            </span>
          )
        }
        if (soloons.some((s) => s.row === i && s.column === j)) {
          const soolon = soloons.find((s) => s.row === i && s.column === j)
          if (soolon?.color === "red") return "🔴"
          if (soolon?.color === "blue") return "🔵"
          if (soolon?.color === "green") return "🟢"
          if (soolon?.color === "purple") return "🟣"
          if (soolon?.color === "white") return "⚪"
        }
        return cell
      })
    )
    setGrid(newGrid)
  }

  return {
    grid,
    createPolyanetsUI,
  }
}
