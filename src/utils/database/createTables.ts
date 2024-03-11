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
      FOREIGN KEY(currency_id) REFERENCES currencies(id)\
      )`)
    console.log('user table created')
  } catch (error) {
    console.log('error creating user table', error)
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

    console.log('currency table created')
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
      console.log('currencies data created')
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
  } catch (error) {
    console.log('error creating currency table', error)
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
      FOREIGN KEY(user_id) REFERENCES users(id)\
      FOREIGN KEY(currency_id) REFERENCES currencies(id)\
      )`)

    console.log('account table created')
  } catch (error) {
    console.log('error creating account table', error)
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
    console.log('category table created')
  } catch (error) {
    console.log('error creating category table', error)
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
      FOREIGN KEY(account_id) REFERENCES accounts(id)
      FOREIGN KEY(entry_id) REFERENCES entries(id)
      FOREIGN KEY(category_id) REFERENCES categories(id)
      )`)

    console.log('entries table created')
  } catch (error) {
    console.log('error creating entries table', error)
  }
}

const createTables = async () => {
  await createCurrencyTable()
  await createUserTable()
  await createAccountTable()
  await createCategoryTable()
  await createEntriesTable()
}

export default createTables
