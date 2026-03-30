import { useMutation } from "@tanstack/react-query"
import { handleMutateAstral } from "@/app/actions/services"
import { MutationType } from "@/app/types/mutationType"

type MutationVariables = {
  type: "post" | "delete"
  coordinates: { row: number; column: number }
  astralType: "polyanets" | "soloons" | "comeths"
  direction?: "up" | "right" | "down" | "left"
  color?: "red" | "blue" | "purple" | "white"
}

export const useMutateAstral = (mutationType: MutationType) => {
  const {
    data,
    isPending,
    error,
    mutateAsync: createAstral,
  } = useMutation({
    mutationKey: [`${mutationType}-polyanet`],
    mutationFn: async (parameters: MutationVariables) => {
      const { type, coordinates, astralType, direction, color } = parameters
      return handleMutateAstral(type, coordinates, astralType, direction, color)
    },
  })

  return { data, isPending, error, createAstral }
}
