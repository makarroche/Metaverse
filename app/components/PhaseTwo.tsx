"use client"

import { useState } from "react"
import { parseGoalMap } from "../utils/helpers"
import { Button } from "@/components/ui/button"
import { useMutateAstral } from "@/app/hooks/useMutatePolyanets"

const PhaseTwo = () => {
  const { isPending, error, createAstral } = useMutateAstral("POST")
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
          const rotation =
            cometh?.direction === "up"
              ? "50deg"
              : cometh?.direction === "right"
                ? "130deg"
                : cometh?.direction === "down"
                  ? "240deg"
                  : cometh?.direction === "left"
                    ? "340deg"
                    : "0deg"

          return (
            <span
              style={{
                transform: `rotate(${rotation})`,
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

  // Create Polyanets with API
  const createPolyanetsComethsSoloonsAPI = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    // polyanets
    for (const coord of polyanets) {
      await createAstral({
        type: "post",
        coordinates: coord,
        astralType: "polyanets",
      })
      await delay(500)
    }

    // comeths
    for (const coord of comeths) {
      await createAstral({
        type: "post",
        coordinates: coord,
        astralType: "comeths",
        direction: coord.direction,
      })
      await delay(500)
    }

    // soloons
    for (const coord of soloons) {
      await createAstral({
        type: "post",
        coordinates: coord,
        astralType: "soloons",
        color: coord.color,
      })
      await delay(500)
    }
  }

  return (
    <div>
      PhaseTwo
      <p> Create Polyanets, Comeths and Soloons (UI)</p>
      <p className="mt-2 text-sm text-gray-500">For testing purposes</p>
      <Button className="mt-2 cursor-pointer" onClick={createPolyanetsUI}>
        Create
      </Button>
      <div className="grid grid-cols-30 gap-1">
        {grid.flat().map((cell, index) => (
          <div key={index} className="flex h-6 w-6 items-center text-xl">
            {cell}
          </div>
        ))}
      </div>
      <p> Create Polyanets, Comeths and Soloons (API)</p>
      <Button
        className="mt-2 cursor-pointer"
        onClick={createPolyanetsComethsSoloonsAPI}
      >
        Create
      </Button>
    </div>
  )
}

export default PhaseTwo
