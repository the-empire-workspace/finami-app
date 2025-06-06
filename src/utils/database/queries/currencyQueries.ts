import {debugLog} from 'utils'
import {selectQuery, executeQuery} from '../config/databaseHelpers'
import {Currency, CurrencyCreateParams, CurrencyUpdateParams} from '../models/Currency'

export const useCurrencyQueries = () => {
  const createCurrency = async (params: CurrencyCreateParams): Promise<Currency | null> => {
    try {
      const newCurrency: any = await executeQuery(
        'INSERT INTO currencies (symbol, name, type, decimal, address, network, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          params.symbol,
          params.name,
          params.type,
          params.decimal,
          params.address,
          params.network,
          params.image,
        ],
      )
      if (!newCurrency) {
        return null
      }
      const currency: any = await selectQuery(
        'SELECT * FROM currencies where id = ?',
        [newCurrency.insertId],
      )
      return currency.raw()[0]
    } catch (error) {
      debugLog('error currency creation', error)
      return null
    }
  }

  const updateCurrency = async (params: CurrencyUpdateParams): Promise<Currency | null> => {
    try {
      await executeQuery(
        'UPDATE currencies SET symbol = ?, name = ?, type = ?, decimal = ?, address = ?, network = ?, image = ? WHERE id = ?',
        [
          params.symbol,
          params.name,
          params.type,
          params.decimal,
          params.address,
          params.network,
          params.image,
          params.id,
        ],
      )
      const currency: any = await selectQuery(
        'SELECT * FROM currencies where id = ?',
        [params.id],
      )
      return currency.raw()[0]
    } catch (error) {
      debugLog('error currency update', error)
      return null
    }
  }

  const getCurrencies = async (): Promise<Currency[]> => {
    try {
      const currencies: any = await selectQuery('SELECT * FROM currencies')
      return currencies.raw()
    } catch (error) {
      debugLog('error getting currencies', error)
      return []
    }
  }

  const getCurrency = async (id: number): Promise<Currency | null> => {
    try {
      const currency: any = await selectQuery(
        'SELECT * FROM currencies where id = ?',
        [id],
      )
      return currency.raw()[0]
    } catch (error) {
      debugLog('error getting currency', error)
      return null
    }
  }

  const deleteCurrency = async (id: number): Promise<boolean> => {
    try {
      await executeQuery('DELETE FROM currencies WHERE id = ?', [id])
      return true
    } catch (error) {
      debugLog('error deleting currency', error)
      return false
    }
  }

  return {
    createCurrency,
    updateCurrency,
    getCurrencies,
    getCurrency,
    deleteCurrency,
  }
} 