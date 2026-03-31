"use client"

import { Button } from "@/components/ui/button"
import { useCreatePolyanetsUI } from "@/app/hooks/useCreatePolyanetsUI"
import { useCreatePolyanetsAPI } from "@/app/hooks/useCreatePolyanetsAPI"

const PhaseOne = () => {
  const { grid, createPolyanetsUI } = useCreatePolyanetsUI()
  const { createPolyanetsAPI, isPending, error } = useCreatePolyanetsAPI()

  return (
    <div className="mb-24 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Phase One</h1>
      <p className="font-semibold">
        Create Polyanets (UI){" "}
        <span className="text-sm text-gray-500"> - For testing purposes</span>
      </p>

      <Button
        variant="secondary"
        className="mt-2 cursor-pointer"
        onClick={createPolyanetsUI}
      >
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
      <p className="mt-6 font-semibold">
        Create Polyanets (API){" "}
        <span className="text-sm text-green-500"> - For persistence</span>
      </p>
      <Button
        variant="secondary"
        className="mt-2 cursor-pointer"
        onClick={createPolyanetsAPI}
      >
        Create
      </Button>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default PhaseOne
