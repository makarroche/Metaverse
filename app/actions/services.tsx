"use server"

import axios from "axios"
import { BASE_URL } from "../utils/constants"

export const handleMutateAstral = async (
  mutationType: string,
  coordinates: { row: number; column: number },
  astralType: "polyanets" | "soloons" | "comeths",
  direction?: "up" | "right" | "down" | "left",
  color?: "red" | "blue" | "purple" | "white"
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
        ...(direction && { direction }),
        ...(color && { color }),
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
