import {debugLog} from 'utils'
import SQLite from 'react-native-sqlite-storage'
import USD from '@assets/img/Iconografia-finami-12.png'
import EUR from '@assets/img/Iconografia-finami-09.png'
import {selectQuery, database} from './databaseHelpers'

const populateCurrencies = async () => {
  try {
    const currencies: any = await selectQuery('SELECT * FROM currencies')
    if (!currencies || !currencies.raw || currencies.raw().length === 0) {
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['\u20AC', 'EUR', 'FIAT', 2, EUR],
      )
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['$', 'USD', 'FIAT', 2, USD],
      )
      debugLog('currencies data created')
    }
    const rawCurrencies = currencies?.raw?.() || []
    const ars = rawCurrencies.find((c: any) => c?.symbol === 'ARS')
    if (!ars) {
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['$ARS', 'ARS', 'FIAT', 2, USD],
      )
    }
    const cop = rawCurrencies.find((c: any) => c?.symbol === 'COP')
    if (!cop) {
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['$COP', 'COP', 'FIAT', 2, USD],
      )
    }
    const ves = rawCurrencies.find((c: any) => c?.symbol === 'VES')
    if (!ves) {
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['Bs', 'VES', 'FIAT', 2, USD],
      )
    }
  } catch (error) {
    debugLog('error populating currencies', error)
  }
}

export const initializeDatabase = async () => {
  return new Promise<void>((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS currencies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symbol VARCHAR UNIQUE,
            name VARCHAR UNIQUE,
            type VARCHAR,
            decimal INTEGER,
            address VARCHAR,
            network VARCHAR,
            image VARCHAR
          )`,
          [],
          () => debugLog('currency table created'),
        )

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            currency_id INTEGER,
            username VARCHAR,
            picture VARCHAR,
            language VARCHAR,
            notification_token VARCHAR,
            FOREIGN KEY(currency_id) REFERENCES currencies(id)
          )`,
          [],
          () => debugLog('user table created'),
        )

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            currency_id INTEGER,
            account_name VARCHAR,
            account_number VARCHAR UNIQUE,
            account_type VARCHAR,
            organization VARCHAR,
            account_comments VARCHAR,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(currency_id) REFERENCES currencies(id)
          )`,
          [],
          () => debugLog('account table created'),
        )

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR,
            comment VARCHAR,
            type VARCHAR,
            date DATETIME
          )`,
          [],
          () => debugLog('category table created'),
        )

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            entry_id INTEGER,
            account_id INTEGER,
            category_id INTEGER,
            payment_type VARCHAR,
            amount REAL,
            entry_type VARCHAR,
            payment_concept VARCHAR,
            comment VARCHAR,
            emissor VARCHAR,
            email VARCHAR,
            phone VARCHAR,
            status VARCHAR,
            frecuency_type VARCHAR,
            frecuency_time VARCHAR,
            status_level VARCHAR,
            date DATETIME,
            limit_date DATETIME,
            FOREIGN KEY(account_id) REFERENCES accounts(id),
            FOREIGN KEY(entry_id) REFERENCES entries(id),
            FOREIGN KEY(category_id) REFERENCES categories(id)
          )`,
          [],
          () => {
            tx.executeSql(
              'PRAGMA table_info(entries)',
              [],
              (_tx, results) => {
                const tables = results.rows.raw?.()
                const findTable = tables?.find((t: any) => t?.name === 'prices')
                if (!findTable) {
                  tx.executeSql('ALTER TABLE entries ADD COLUMN prices BLOB')
                }
              },
            )
            debugLog('entries table created')
          },
        )

        // Create indexes
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts (user_id)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_accounts_currency_id ON accounts (currency_id)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_accounts_account_name ON accounts (account_name)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_users_currency_id ON users (currency_id)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_categories_type ON categories (type)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_currencies_symbol_network ON currencies (symbol, network)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_entries_account_id ON entries (account_id)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_entries_category_id ON entries (category_id)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_entries_entry_id ON entries (entry_id)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_entries_entry_type ON entries (entry_type)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_entries_payment_type ON entries (payment_type)',
        )
        tx.executeSql(
          'CREATE INDEX IF NOT EXISTS idx_entries_date ON entries (date)',
          [],
          () => debugLog('indexes created'),
        )
      },
      error => {
        debugLog('error creating tables', error)
        reject(error)
      },
      async () => {
        await populateCurrencies()
        resolve()
      },
    )
  })
}

export default database 