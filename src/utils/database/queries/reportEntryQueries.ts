import {debugLog} from 'utils'
import {selectQuery} from '../config/databaseHelpers'
import {Entry} from '../models/Entry'

export const getLastMovementsQuery = async (fromDate: Date, toDate: Date): Promise<Entry[]> => {
  try {
    const entries: any = await selectQuery(
      'SELECT * FROM entries WHERE date BETWEEN ? AND ? ORDER BY date DESC',
      [fromDate, toDate]
    )
    return entries.raw()
  } catch (error) {
    debugLog('error getting last movements', error)
    return []
  }
}

export const getReportCurrenciesQuery = async (fromDate: Date, toDate: Date, currencyId?: number): Promise<Entry[]> => {
  try {
    const query = currencyId 
      ? 'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND currency_id = ? ORDER BY date DESC'
      : 'SELECT * FROM entries WHERE date BETWEEN ? AND ? ORDER BY date DESC'
    const params = currencyId ? [fromDate, toDate, currencyId] : [fromDate, toDate]
    const entries: any = await selectQuery(query, params)
    return entries.raw()
  } catch (error) {
    debugLog('error getting currency report', error)
    return []
  }
}

export const getReportAccountQuery = async (fromDate: Date, toDate: Date, accountId?: number): Promise<Entry[]> => {
  try {
    const query = accountId
      ? 'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND account_id = ? ORDER BY date DESC'
      : 'SELECT * FROM entries WHERE date BETWEEN ? AND ? ORDER BY date DESC'
    const params = accountId ? [fromDate, toDate, accountId] : [fromDate, toDate]
    const entries: any = await selectQuery(query, params)
    return entries.raw()
  } catch (error) {
    debugLog('error getting account report', error)
    return []
  }
}

export const getIncomesReportQuery = async (fromDate: Date, toDate: Date): Promise<Entry[]> => {
  try {
    const entries: any = await selectQuery(
      'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND entry_type = "income" ORDER BY date DESC',
      [fromDate, toDate]
    )
    return entries.raw()
  } catch (error) {
    debugLog('error getting incomes report', error)
    return []
  }
}

export const getExpensesReportQuery = async (fromDate: Date, toDate: Date): Promise<Entry[]> => {
  try {
    const entries: any = await selectQuery(
      'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND entry_type = "expense" ORDER BY date DESC',
      [fromDate, toDate]
    )
    return entries.raw()
  } catch (error) {
    debugLog('error getting expenses report', error)
    return []
  }
}

export const getReportFromEntryQuery = async (fromDate: Date, toDate: Date, entryId?: number): Promise<Entry[]> => {
  try {
    const query = entryId
      ? 'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND entry_id = ? ORDER BY date DESC'
      : 'SELECT * FROM entries WHERE date BETWEEN ? AND ? ORDER BY date DESC'
    const params = entryId ? [fromDate, toDate, entryId] : [fromDate, toDate]
    const entries: any = await selectQuery(query, params)
    return entries.raw()
  } catch (error) {
    debugLog('error getting entry report', error)
    return []
  }
}

export const getReportFromEntryCategoryQuery = async (fromDate: Date, toDate: Date, categoryId?: number): Promise<Entry[]> => {
  try {
    const query = categoryId
      ? 'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND category_id = ? ORDER BY date DESC'
      : 'SELECT * FROM entries WHERE date BETWEEN ? AND ? ORDER BY date DESC'
    const params = categoryId ? [fromDate, toDate, categoryId] : [fromDate, toDate]
    const entries: any = await selectQuery(query, params)
    return entries.raw()
  } catch (error) {
    debugLog('error getting category report', error)
    return []
  }
}

export const getGoalsReportQuery = async (fromDate: Date, toDate: Date, type?: string): Promise<Entry[]> => {
  try {
    const query = type
      ? 'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND entry_type = ? ORDER BY date DESC'
      : 'SELECT * FROM entries WHERE date BETWEEN ? AND ? AND entry_type IN ("compromise", "desire") ORDER BY date DESC'
    const params = type ? [fromDate, toDate, type] : [fromDate, toDate]
    const entries: any = await selectQuery(query, params)
    return entries.raw()
  } catch (error) {
    debugLog('error getting goals report', error)
    return []
  }
} 