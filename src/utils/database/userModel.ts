import { insertQuery, selectQuery } from './helpers'

export const createUserQuery = async ({ username, picture, currency }: any) => {
  try {
    const newUser: any = await insertQuery(
      'INSERT INTO users (username, picture, currency_id) VALUES (?, ?, ?)',
      [username, picture, currency],
    )
    const user: any = await selectQuery('SELECT * FROM users WHERE id = ?', [
      newUser?.insertId,
    ])
    return user.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
export const getUserQuery = async () => {
  try {
    const users: any = await selectQuery('SELECT users.id, picture, username, currency_id, symbol as currency_symbol, name as currency_name FROM users LEFT JOIN currencies ON currencies.id = users.currency_id')
    return users.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
