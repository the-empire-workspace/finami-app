import {debugLog} from 'utils'
import database from './init'
import USD from '@assets/img/Iconografia-finami-12.png'
import EUR from '@assets/img/Iconografia-finami-09.png'
import {selectQuery} from './helpers'

const createUserTable = async () => {
  try {
    await database.executeSql(`CREATE TABLE IF NOT EXISTS users (\
      id INTEGER PRIMARY KEY AUTOINCREMENT,\
      currency_id INTEGER,\
      username VARCHAR,\
      picture VARCHAR, \
      language VARCHAR,\
      notification_token VARCHAR,\
      FOREIGN KEY(currency_id) REFERENCES currencies(id) ON DELETE CASCADE\
      )`)
    debugLog('user table created')
  } catch (error) {
    debugLog('error creating user table', error)
  }
}

const createCurrencyTable = async () => {
  try {
    await database.executeSql(`CREATE TABLE IF NOT EXISTS currencies (\
      id INTEGER PRIMARY KEY AUTOINCREMENT,\
      symbol VARCHAR,\
      name VARCHAR,\
      type VARCHAR,\
      decimal INTEGER,\
      address VARCHAR, \
      network VARCHAR, \
      image VARCHAR\
      )`)

    debugLog('currency table created')
    const currencies: any = await selectQuery('SELECT * FROM currencies')
    if (!currencies || currencies?.length === 0) {
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['€', 'EUR', 'FIAT', 2, EUR],
      )
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['$', 'USD', 'FIAT', 2, USD],
      )
      debugLog('currencies data created')
    }
    const ars = currencies?.raw()?.find((c: any) => c?.symbol === 'ARS')
    if (!ars)
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['$ARS', 'ARS', 'FIAT', 2, USD],
      )

    const cop = currencies?.raw()?.find((c: any) => c?.symbol === 'COP')
    if (!cop)
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['$COP', 'COP', 'FIAT', 2, USD],
      )

    const ves = currencies?.raw()?.find((c: any) => c?.symbol === 'VES')
    if (!ves)
      await database.executeSql(
        'INSERT INTO currencies (symbol, name, type, decimal, image) VALUES (?, ?, ?, ?, ?)',
        ['Bs', 'VES', 'FIAT', 2, USD],
      )
  } catch (error) {
    debugLog('error creating currency table', error)
  }
}

const createAccountTable = async () => {
  try {
    await database.executeSql(`CREATE TABLE IF NOT EXISTS accounts (\
      id INTEGER PRIMARY KEY AUTOINCREMENT,\
      user_id INTEGER,\
      currency_id INTEGER,\
      account_name VARCHAR,\
      account_number VARCHAR,\
      account_type VARCHAR,\
      organization VARCHAR,\
      account_comments VARCHAR,\
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE\
      FOREIGN KEY(currency_id) REFERENCES currencies(id) ON DELETE CASCADE\
      )`)

    debugLog('account table created')
  } catch (error) {
    debugLog('error creating account table', error)
  }
}

const createCategoryTable = async () => {
  try {
    await database.executeSql(`CREATE TABLE IF NOT EXISTS categories (\
      id INTEGER PRIMARY KEY AUTOINCREMENT,\
      name VARCHAR,\
      comment VARCHAR,\
      type VARCHAR, \
      date DATETIME\
      )`)
    debugLog('category table created')
  } catch (error) {
    debugLog('error creating category table', error)
  }
}

const createEntriesTable = async () => {
  try {
    await database.executeSql(`CREATE TABLE IF NOT EXISTS entries (\
      id INTEGER PRIMARY KEY AUTOINCREMENT,\
      entry_id  INTEGER,\
      account_id INTEGER,\
      category_id INTEGER,\
      payment_type VARCHAR,\
      amount REAL,\
      entry_type VARCHAR, \
      payment_concept VARCHAR,\
      comment VARCHAR,\
      emissor VARCHAR,\
      email VARCHAR,\
      phone VARCHAR,\
      status VARCHAR,\
      frecuency_type VARCHAR,\
      frecuency_time VARCHAR,\
      status_level VARCHAR,\
      date DATETIME,\
      limit_date DATETIME,\
      FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE CASCADE
      FOREIGN KEY(entry_id) REFERENCES entries(id) ON DELETE CASCADE
      FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
      )`)
    const data: any = await selectQuery('PRAGMA table_info(entries)')
    const tables = data?.raw()

    const findTable = tables?.find((t: any) => t?.name === 'prices')

    if (!findTable)
      await database.executeSql('ALTER TABLE entries ADD COLUMN prices BLOB')

    debugLog('entries table created')
  } catch (error) {
    debugLog('error creating entries table', error)
  }
}

const createIndexes = async () => {
  try {
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts (user_id)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_accounts_currency_id ON accounts (currency_id)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_accounts_account_name ON accounts (account_name)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_users_currency_id ON users (currency_id)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_categories_type ON categories (type)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_currencies_symbol_network ON currencies (symbol, network)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_entries_account_id ON entries (account_id)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_entries_category_id ON entries (category_id)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_entries_entry_id ON entries (entry_id)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_entries_entry_type ON entries (entry_type)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_entries_payment_type ON entries (payment_type)',
    )
    await database.executeSql(
      'CREATE INDEX IF NOT EXISTS idx_entries_date ON entries (date)',
    )
    debugLog('indexes created')
  } catch (error) {
    debugLog('error creating indexes', error)
  }
}

const createTables = async () => {
  await createCurrencyTable()
  await createUserTable()
  await createAccountTable()
  await createCategoryTable()
  await createEntriesTable()
  await createIndexes()
}

export default createTables
