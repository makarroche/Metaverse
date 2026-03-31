import { parseGoalMap } from "../utils/helpers"
import { useMutateAstral } from "./useMutateAstral"

export const useCreateMorePolyanetsAPI = () => {
  const { isPending, error, createAstral } = useMutateAstral("POST")
  const { polyanets, comeths, soloons } = parseGoalMap()

  // Create Polyanets with API
  // Parallel execution was causing 429 errors

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

  return {
    isPending,
    error,
    createPolyanetsComethsSoloonsAPI,
  }
}
