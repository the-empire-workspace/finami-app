import {useUserQueries} from 'utils/database/queries'
import {User, UserCreateParams, UserUpdateParams} from 'utils/database/models'

export const useUserService = () => {
  const {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser
  } = useUserQueries()

  const createNewUser = async (params: UserCreateParams): Promise<User | null> => {
    try {
      return await createUser(params)
    } catch (error) {
      console.error('Error creating user:', error)
      return null
    }
  }

  const updateExistingUser = async (params: UserUpdateParams): Promise<User | null> => {
    try {
      return await updateUser(params)
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    }
  }

  const fetchUsers = async (): Promise<User[]> => {
    try {
      return await getUsers()
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }

  const fetchUser = async (id: number): Promise<User | null> => {
    try {
      return await getUser(id)
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  const removeUser = async (id: number): Promise<boolean> => {
    try {
      return await deleteUser(id)
    } catch (error) {
      console.error('Error deleting user:', error)
      return false
    }
  }

  return {
    createNewUser,
    updateExistingUser,
    fetchUsers,
    fetchUser,
    removeUser
  }
} 