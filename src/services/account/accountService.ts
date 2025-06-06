import {useAccountQueries} from 'utils/database/queries'
import {Account, AccountCreateParams, AccountUpdateParams} from 'utils/database/models'

export const useAccountService = () => {
  const {
    createAccount,
    updateAccount,
    getAccounts,
    getAccount,
    deleteAccount
  } = useAccountQueries()

  const createNewAccount = async (params: AccountCreateParams): Promise<Account | null> => {
    try {
      return await createAccount(params)
    } catch (error) {
      console.error('Error creating account:', error)
      return null
    }
  }

  const updateExistingAccount = async (params: AccountUpdateParams): Promise<Account | null> => {
    try {
      return await updateAccount(params)
    } catch (error) {
      console.error('Error updating account:', error)
      return null
    }
  }

  const fetchAccounts = async (currencies: any, prices: any, user: any): Promise<Account[]> => {
    try {
      return await getAccounts(currencies, prices, user)
    } catch (error) {
      console.error('Error fetching accounts:', error)
      return []
    }
  }

  const fetchAccount = async (currencies: any, id: number, prices: any, user: any): Promise<Account | null> => {
    try {
      return await getAccount(currencies, id, prices, user)
    } catch (error) {
      console.error('Error fetching account:', error)
      return null
    }
  }

  const removeAccount = async (id: number): Promise<boolean> => {
    try {
      return await deleteAccount(id)
    } catch (error) {
      console.error('Error deleting account:', error)
      return false
    }
  }

  return {
    createNewAccount,
    updateExistingAccount,
    fetchAccounts,
    fetchAccount,
    removeAccount
  }
} 