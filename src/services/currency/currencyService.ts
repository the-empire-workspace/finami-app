import {useCurrencyQueries} from 'utils/database/queries'
import {Currency, CurrencyCreateParams, CurrencyUpdateParams} from 'utils/database/models'

export const useCurrencyService = () => {
  const {
    createCurrency,
    updateCurrency,
    getCurrencies,
    getCurrency,
    deleteCurrency
  } = useCurrencyQueries()

  const createNewCurrency = async (params: CurrencyCreateParams): Promise<Currency | null> => {
    try {
      return await createCurrency(params)
    } catch (error) {
      console.error('Error creating currency:', error)
      return null
    }
  }

  const updateExistingCurrency = async (params: CurrencyUpdateParams): Promise<Currency | null> => {
    try {
      return await updateCurrency(params)
    } catch (error) {
      console.error('Error updating currency:', error)
      return null
    }
  }

  const fetchCurrencies = async (): Promise<Currency[]> => {
    try {
      return await getCurrencies()
    } catch (error) {
      console.error('Error fetching currencies:', error)
      return []
    }
  }

  const fetchCurrency = async (id: number): Promise<Currency | null> => {
    try {
      return await getCurrency(id)
    } catch (error) {
      console.error('Error fetching currency:', error)
      return null
    }
  }

  const removeCurrency = async (id: number): Promise<boolean> => {
    try {
      return await deleteCurrency(id)
    } catch (error) {
      console.error('Error deleting currency:', error)
      return false
    }
  }

  return {
    createNewCurrency,
    updateExistingCurrency,
    fetchCurrencies,
    fetchCurrency,
    removeCurrency
  }
} 