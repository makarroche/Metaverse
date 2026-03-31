import { useState } from "react"

export const useCreatePolyanetsUI = () => {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array.from({ length: 11 }, () => Array(11).fill("🌌"))
  )

  const isMainDiagonal = (i: number, j: number) =>
    i === j && i > 1 && j > 1 && i < 9 && j < 9

  const isOtherDiagonal = (i: number, j: number) =>
    i + j === 10 && i > 1 && j > 1 && i < 9 && j < 9

  // Create Polyanets with UI to understand logic first
  const createPolyanetsUI = () => {
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) =>
        isMainDiagonal(i, j) || isOtherDiagonal(i, j) ? "🪐" : cell
      )
    )
    setGrid(newGrid)
  }

  return { grid, createPolyanetsUI }
}
