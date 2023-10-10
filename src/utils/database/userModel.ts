import { insertQuery, selectQuery } from "./helpers"

export const createUserQuery = async ({ username, picture }: any) => {
  try {
    const newUser: any = await insertQuery(`INSERT INTO users (username, picture) VALUES (?, ?)`, [username, picture])
    const user: any = await selectQuery(`SELECT * FROM users WHERE id = ?`, [newUser?.insertId])
    return user.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
export const getUserQuery = async () => {
  try {
    const users: any = await selectQuery(`SELECT * FROM users`)
    return users.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}