import { AstralColor, AstralDirection } from "../types/mutationType"
import { goal } from "./constants"

export const parseGoalMap = () => {
  const polyanets = []
  const comeths = []
  const soloons = []

  for (let i = 0; i < goal.length; i++) {
    for (let j = 0; j < goal[i].length; j++) {
      if (goal[i][j] === "POLYANET") {
        polyanets.push({ row: i, column: j })
      } else if (goal[i][j].includes("COMETH")) {
        const direction = goal[i][j]
          .split("_")[0]
          .toLowerCase() as AstralDirection
        comeths.push({ row: i, column: j, direction })
      } else if (goal[i][j].includes("SOLOON")) {
        const color = goal[i][j].split("_")[0].toLowerCase() as AstralColor
        soloons.push({ row: i, column: j, color })
      }
    }
  }

  return { polyanets, comeths, soloons }
}

export const getRotationForDirection = (
  direction: AstralDirection | undefined
): string => {
  const rotationMap: Record<AstralDirection, string> = {
    up: "50deg",
    right: "130deg",
    down: "240deg",
    left: "340deg",
  }

  return rotationMap[direction || "up"] || "0deg"
}
