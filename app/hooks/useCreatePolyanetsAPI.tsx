import { useMutateAstral } from "./useMutateAstral"

export const useCreatePolyanetsAPI = () => {
  const { isPending, error, createAstral } = useMutateAstral("POST")

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

  return { isPending, error, createPolyanetsAPI }
}
