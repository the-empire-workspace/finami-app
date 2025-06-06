import {debugLog} from 'utils'
import {selectQuery, executeQuery} from '../config/databaseHelpers'
import {User, UserCreateParams, UserUpdateParams} from '../models/User'

export const useUserQueries = () => {
  const createUser = async (params: UserCreateParams): Promise<User | null> => {
    try {
      const newUser: any = await executeQuery(
        'INSERT INTO users (currency_id, username, picture, language, notification_token) VALUES (?, ?, ?, ?, ?)',
        [
          params.currency_id,
          params.username,
          params.picture,
          params.language,
          params.notification_token,
        ],
      )
      if (!newUser) {
        return null
      }
      const user: any = await selectQuery(
        'SELECT * FROM users where id = ?',
        [newUser.insertId],
      )
      return user.raw()[0]
    } catch (error) {
      debugLog('error user creation', error)
      return null
    }
  }

  const updateUser = async (params: UserUpdateParams): Promise<User | null> => {
    try {
      await executeQuery(
        'UPDATE users SET currency_id = ?, username = ?, picture = ?, language = ?, notification_token = ? WHERE id = ?',
        [
          params.currency_id,
          params.username,
          params.picture,
          params.language,
          params.notification_token,
          params.id,
        ],
      )
      const user: any = await selectQuery(
        'SELECT * FROM users where id = ?',
        [params.id],
      )
      return user.raw()[0]
    } catch (error) {
      debugLog('error user update', error)
      return null
    }
  }

  const getUsers = async (): Promise<User[]> => {
    try {
      const users: any = await selectQuery('SELECT * FROM users')
      return users.raw()
    } catch (error) {
      debugLog('error getting users', error)
      return []
    }
  }

  const getUser = async (id: number): Promise<User | null> => {
    try {
      const user: any = await selectQuery(
        'SELECT * FROM users where id = ?',
        [id],
      )
      return user.raw()[0]
    } catch (error) {
      debugLog('error getting user', error)
      return null
    }
  }

  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      await executeQuery('DELETE FROM users WHERE id = ?', [id])
      return true
    } catch (error) {
      debugLog('error deleting user', error)
      return false
    }
  }

  return {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
  }
} 