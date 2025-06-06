import {debugLog} from 'utils'
import {insertQuery, selectQuery} from './helpers'

export const createUserQuery = async ({username, picture, currency}: any) => {
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
    debugLog(error, 'an error happend create user')
    return null
  }
}

export const updateUserQuery = async ({
  id,
  username,
  picture,
  language,
  currency_id,
}: any) => {
  try {
    await insertQuery(
      'UPDATE users SET username = ?, picture = ?, language = ?, currency_id = ? WHERE id = ?',
      [username, picture, language, currency_id, id],
    )
    const user: any = await selectQuery('SELECT * FROM users WHERE id = ?', [
      id,
    ])
    return user.raw()[0]
  } catch (error) {
    debugLog(error, 'an error happend update user')
    return null
  }
}

export const getUserQuery = async () => {
  try {
    const users: any = await selectQuery(
      'SELECT users.id, picture, username, language, currency_id, symbol as currency_symbol, name as currency_name, decimal FROM users LEFT JOIN currencies ON currencies.id = users.currency_id',
    )
    return users.raw()[0]
  } catch (error) {
    debugLog(error, 'an error happend get user')
    return null
  }
}
