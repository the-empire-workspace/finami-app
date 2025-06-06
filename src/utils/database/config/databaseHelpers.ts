import {debugLog} from 'utils'
import SQLite from 'react-native-sqlite-storage'

const database = SQLite.openDatabase(
  {
    name: 'finami.db',
    location: 'default',
  },
  () => debugLog('Database connected'),
  error => debugLog('Database error', error),
)

interface QueryResult {
  raw: () => any[]
}

interface ExecuteResult {
  insertId: number
  rowsAffected: number
  raw: () => any[]
}

export const selectQuery = async (query: string, params: any[] = []): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          query,
          params,
          (_tx, results) => {
            const items: any[] = []
            for (let i = 0; i < results.rows.length; i++) {
              items.push(results.rows.item(i))
            }
            resolve({ raw: () => items })
          },
          (_tx, error) => {
            debugLog('error executing query', error)
            reject(error)
            return false
          },
        )
      },
      error => {
        debugLog('error in transaction', error)
        reject(error)
      },
    )
  })
}

export const executeQuery = async (query: string, params: any[] = []): Promise<ExecuteResult> => {
  return new Promise((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          query,
          params,
          (_tx, results) => {
            resolve({
              insertId: results.insertId,
              rowsAffected: results.rowsAffected,
              raw: () => results.rows.raw()
            })
          },
          (_tx, error) => {
            debugLog('error executing query', error)
            reject(error)
            return false
          },
        )
      },
      error => {
        debugLog('error in transaction', error)
        reject(error)
      },
    )
  })
}

export const truncateTables = async () => {
  return new Promise<void>((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql('DELETE FROM entries', [], () => {
          tx.executeSql('DELETE FROM categories', [], () => {
            tx.executeSql('DELETE FROM accounts', [], () => {
              tx.executeSql('DELETE FROM users', [], () => {
                tx.executeSql('DELETE FROM currencies', [], () => {
                  debugLog('tables truncated')
                  resolve()
                })
              })
            })
          })
        })
      },
      error => {
        debugLog('error truncating tables', error)
        reject(error)
      },
    )
  })
}

export {database} 