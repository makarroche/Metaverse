"use client"

import { Button } from "@/components/ui/button"
import { useCreateMorePolyanetsUI } from "@/app/hooks/useCreateMorePolyanetsUI"
import { useCreateMorePolyanetsAPI } from "../hooks/useCreateMorePolyanetsAPI"

const PhaseTwo = () => {
  const { grid, createPolyanetsUI } = useCreateMorePolyanetsUI()
  const { createPolyanetsComethsSoloonsAPI, isPending, error } =
    useCreateMorePolyanetsAPI()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Phase Two</h1>
      <p className="font-semibold">
        Create Polyanets, Comeths and Soloons (UI){" "}
        <span className="text-sm text-gray-500">- For testing purposes</span>
      </p>
      <Button
        variant="secondary"
        className="mt-2 cursor-pointer"
        onClick={createPolyanetsUI}
      >
        Create
      </Button>
      <div className="grid grid-cols-30 gap-1">
        {grid.flat().map((cell, index) => (
          <div key={index} className="flex h-6 w-6 items-center text-xl">
            {cell}
          </div>
        ))}
      </div>
      <p className="font-semibold">
        {" "}
        Create Polyanets, Comeths and Soloons (API){" "}
        <span className="text-sm text-green-500"> - For persistence</span>
      </p>
      <Button
        variant="secondary"
        className="mt-2 cursor-pointer"
        onClick={createPolyanetsComethsSoloonsAPI}
      >
        Create
      </Button>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default PhaseTwo
