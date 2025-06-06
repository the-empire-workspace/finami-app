import {debugLog} from 'utils'
import {selectQuery, executeQuery} from '../config/databaseHelpers'
import {Entry, EntryCreateParams, EntryUpdateParams} from '../models/Entry'

export const useEntryQueries = () => {
  const createEntry = async (params: EntryCreateParams): Promise<Entry | null> => {
    try {
      const newEntry: any = await executeQuery(
        'INSERT INTO entries (entry_id, account_id, category_id, payment_type, amount, entry_type, payment_concept, comment, emissor, email, phone, status, frecuency_type, frecuency_time, status_level, date, limit_date, prices) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          params.entry_id,
          params.account_id,
          params.category_id,
          params.payment_type,
          params.amount,
          params.entry_type,
          params.payment_concept,
          params.comment,
          params.emissor,
          params.email,
          params.phone,
          params.status,
          params.frecuency_type,
          params.frecuency_time,
          params.status_level,
          params.date,
          params.limit_date,
          params.prices ? JSON.stringify(params.prices) : null,
        ],
      )
      if (!newEntry) {
        return null
      }
      const entry: any = await selectQuery(
        'SELECT * FROM entries where id = ?',
        [newEntry.insertId],
      )
      return entry.raw()[0]
    } catch (error) {
      debugLog('error entry creation', error)
      return null
    }
  }

  const updateEntry = async (params: EntryUpdateParams): Promise<Entry | null> => {
    try {
      await executeQuery(
        'UPDATE entries SET entry_id = ?, account_id = ?, category_id = ?, payment_type = ?, amount = ?, entry_type = ?, payment_concept = ?, comment = ?, emissor = ?, email = ?, phone = ?, status = ?, frecuency_type = ?, frecuency_time = ?, status_level = ?, date = ?, limit_date = ?, prices = ? WHERE id = ?',
        [
          params.entry_id,
          params.account_id,
          params.category_id,
          params.payment_type,
          params.amount,
          params.entry_type,
          params.payment_concept,
          params.comment,
          params.emissor,
          params.email,
          params.phone,
          params.status,
          params.frecuency_type,
          params.frecuency_time,
          params.status_level,
          params.date,
          params.limit_date,
          params.prices ? JSON.stringify(params.prices) : null,
          params.id,
        ],
      )
      const entry: any = await selectQuery(
        'SELECT * FROM entries where id = ?',
        [params.id],
      )
      return entry.raw()[0]
    } catch (error) {
      debugLog('error entry update', error)
      return null
    }
  }

  const getEntries = async (filters?: {
    account_id?: number;
    category_id?: number;
    entry_type?: string;
    payment_type?: string;
    status?: string;
    start_date?: Date;
    end_date?: Date;
  }): Promise<Entry[]> => {
    try {
      let query = `
        SELECT 
          entries.*,
          cur.symbol as currency_symbol,
          cur.name as currency_name,
          cur.decimal as currency_decimal,
          cur.id as currency_id
        FROM entries
        LEFT JOIN accounts acc ON acc.id = entries.account_id
        LEFT JOIN currencies cur ON cur.id = acc.currency_id
      `
      const values = []
      const conditions = []
      
      if (filters) {
        if (filters.account_id) {
          conditions.push('entries.account_id = ?')
          values.push(filters.account_id)
        }
        if (filters.category_id) {
          conditions.push('entries.category_id = ?')
          values.push(filters.category_id)
        }
        if (filters.entry_type) {
          conditions.push('entries.entry_type = ?')
          values.push(filters.entry_type)
        }
        if (filters.payment_type) {
          conditions.push('entries.payment_type = ?')
          values.push(filters.payment_type)
        }
        if (filters.status) {
          conditions.push('entries.status = ?')
          values.push(filters.status)
        }
        if (filters.start_date) {
          conditions.push('entries.date >= ?')
          values.push(filters.start_date)
        }
        if (filters.end_date) {
          conditions.push('entries.date <= ?')
          values.push(filters.end_date)
        }
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ')
      }
      
      query += ' ORDER BY entries.date DESC'
      
      const entries: any = await selectQuery(query, values)
      return entries.raw()
    } catch (error) {
      debugLog('error getting entries', error)
      return []
    }
  }

  const getEntry = async (id: number): Promise<Entry | null> => {
    try {
      const entry: any = await selectQuery(
        'SELECT * FROM entries where id = ?',
        [id],
      )
      return entry.raw()[0]
    } catch (error) {
      debugLog('error getting entry', error)
      return null
    }
  }

  const deleteEntry = async (id: number): Promise<boolean> => {
    try {
      await selectQuery('DELETE FROM entries WHERE id = ?', [id])
      return true
    } catch (error) {
      debugLog('error deleting entry', error)
      return false
    }
  }

  const getAccountEntries = async (accountId: number): Promise<Entry[]> => {
    try {
      const entries: any = await selectQuery(
        'SELECT * FROM entries WHERE account_id = ? ORDER BY date DESC',
        [accountId],
      )
      return entries.raw()
    } catch (error) {
      debugLog('error getting account entries', error)
      return []
    }
  }

  return {
    createEntry,
    updateEntry,
    getEntries,
    getEntry,
    deleteEntry,
    getAccountEntries
  }
} 