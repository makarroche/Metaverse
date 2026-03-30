"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMutateAstral } from "@/app/hooks/useMutatePolyanets"

const PhaseOne = () => {
  const { isPending, error, createAstral } = useMutateAstral("POST")
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

  // Create Polyanets with API
  const createPolyanetsAPI = async () => {
    const coordinates = []
    for (let i = 2; i <= 8; i++) {
      coordinates.push({ row: i, column: i })
      coordinates.push({ row: i, column: 10 - i })
    }

    await Promise.all(
      coordinates.map((coord) =>
        createAstral({
          type: "post",
          coordinates: coord,
          astralType: "polyanets",
        })
      )
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p>PhaseOne</p>
      <p>Create Polyanets (UI)</p>
      <p className="mt-2 text-sm text-gray-500">For testing purposes</p>
      <Button className="mt-2 cursor-pointer" onClick={createPolyanetsUI}>
        Create
      </Button>
      <div className="grid grid-cols-11 gap-1">
        {grid.flat().map((cell, index) => (
          <div
            key={index}
            className="flex h-8 w-8 items-center justify-center text-xl"
          >
            {cell}
          </div>
        ))}
      </div>
      <p className="mt-6">Create Polyanets (API)</p>
      <Button className="mt-2 cursor-pointer" onClick={createPolyanetsAPI}>
        Create
      </Button>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default PhaseOne
