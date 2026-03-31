"use server"

import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { AstralType, AstralDirection, AstralColor } from "../types/mutationType"

export const handleMutateAstral = async (
  mutationType: string,
  coordinates: { row: number; column: number },
  astralType: AstralType,
  astralDirection?: AstralDirection,
  astralColor?: AstralColor
) => {
  const { row, column } = coordinates

  try {
    const { data } = await axios.request({
      method: mutationType,
      url: `${BASE_URL}/api/${astralType}`,
      data: {
        row,
        column,
        candidateId: process.env.CANDIDATE_ID,
        ...(astralDirection && { direction: astralDirection }),
        ...(astralColor && { color: astralColor }),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
