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
        const direction = goal[i][j].split("_")[0].toLowerCase()
        comeths.push({ row: i, column: j, direction })
      } else if (goal[i][j].includes("SOLOON")) {
        const color = goal[i][j].split("_")[0].toLowerCase()
        soloons.push({ row: i, column: j, color })
      }
    }
  }

  return { polyanets, comeths, soloons }
}
