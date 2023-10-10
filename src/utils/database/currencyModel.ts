import { selectQuery } from "./helpers"

export const getCurrenciesQuery = async () => {
  try {
    return await selectQuery(`SELECT * FROM currencies`)
  } catch (error) {
    console.log(error)
    return null
  }
}