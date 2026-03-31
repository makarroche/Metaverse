import { useMutation } from "@tanstack/react-query"
import { handleMutateAstral } from "@/app/actions/services"
import {
  MutationType,
  AstralType,
  AstralDirection,
  AstralColor,
} from "@/app/types/mutationType"

type MutationVariables = {
  type: "post" | "delete"
  coordinates: { row: number; column: number }
  astralType: AstralType
  direction?: AstralDirection
  color?: AstralColor
}

export const useMutateAstral = (mutationType: MutationType) => {
  const {
    data,
    isPending,
    error,
    mutateAsync: createAstral,
  } = useMutation({
    mutationKey: [`${mutationType}-astral`],
    mutationFn: async (parameters: MutationVariables) => {
      const { type, coordinates, astralType, direction, color } = parameters
      return handleMutateAstral(type, coordinates, astralType, direction, color)
    },
    retry: (failureCount, error: any) => {
      if (
        (error?.response?.status === 429 || error?.response?.status === 500) &&
        failureCount < 3
      ) {
        console.log(`Retry ${failureCount + 1} for ${error?.response?.status}`)
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => {
      const delay = Math.min(1000 * 2 ** attemptIndex, 5000)
      console.log(`Retrying in ${delay}ms...`)
      return delay
    },
  })

  return { data, isPending, error, createAstral }
}
