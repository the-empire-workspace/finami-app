import { operateChange } from 'utils/dataTransform'
import { getAccountEntriesQuery } from './entryModel'
import { insertQuery, selectQuery } from './helpers'
import { getNetworkCurrency } from 'utils/moralis'
import { getExchangeValues } from 'utils/exchangeData'

export const createAccountQuery = async ({
  user,
  account_currency,
  account_name,
  account_number,
  account_type,
  organization,
  comments,
}: any) => {
  try {
    const newAccount: any = await insertQuery(
      'INSERT INTO accounts (user_id, currency_id, account_name, account_number, account_type, organization, account_comments) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        user,
        Number(account_currency),
        account_name,
        account_number,
        account_type,
        organization,
        comments,
      ],
    )
    const account: any = await selectQuery(
      'SELECT * FROM accounts where id = ?',
      [newAccount.insertId],
    )
    return account.raw()[0]
  } catch (error) {
    console.log('error account creation', error)
    return null
  }
}

export const updateAccountQuery = async ({
  id,
  account_currency,
  account_name,
  account_number,
  account_type,
  organization,
  account_comments,
}: any) => {
  console.log(account_currency, account_name, account_number, account_type, organization, account_comments)
  try {
    await insertQuery(
      'UPDATE accounts SET currency_id = ?, account_name = ?, account_number = ?, account_type = ?, organization = ?, account_comments = ? WHERE id = ?',
      [
        account_currency,
        account_name,
        account_number,
        account_type,
        organization,
        account_comments,
        id,
      ],
    )
    const account: any = await selectQuery(
      'SELECT * FROM accounts where id = ?',
      [id],
    )
    return account.raw()[0]
  } catch (error) {
    console.log('error account update', error)
  }
}

export const getAccountsQuery = async (currencies: any) => {
  try {
    const accounts: any = await selectQuery(
      "SELECT accounts.id, account_name, account_number, organization, account_type, account_comments, currency_name, currency_symbol, decimal, SUM(CASE WHEN entries.entry_type = 'income' THEN entries.amount WHEN entries.entry_type = 'expense' THEN -entries.amount ELSE 0 END) as total_amount FROM accounts LEFT JOIN (SELECT id, name as currency_name, symbol as currency_symbol, decimal FROM currencies) cur ON cur.id = accounts.currency_id LEFT JOIN entries ON entries.account_id = accounts.id GROUP BY account_name",
    )

    const rawAccounts = accounts.raw()
    for (const account of rawAccounts)
      if (account?.account_type === 'wallet') {
        const netCurrency = getNetworkCurrency(account?.organization)

        const currency = currencies.find(
          (c: any) => c?.symbol === netCurrency?.symbol,
        )

        const defaultPrices = await getExchangeValues(currencies, currency?.id)
        const entries = await getAccountEntriesQuery(account?.account_name)
        const currenciesAccount = await entries.reduce(
          (prev: any, next: any) => {
            const change = defaultPrices[String(next?.currency_id)]
            const amount = change
              ? operateChange(change?.op, change?.value, next.amount)
              : next.amount
            return prev + (next?.entry_type === 'income' ? amount : -amount)
          },
          0,
        )
        account.currency_name = currency?.name
        account.currency_symbol = currency?.symbol
        account.decimal = currency?.decimal
        account.total_amount = currenciesAccount
      }

    return rawAccounts
  } catch (error) {
    console.log('error getting accounts', error)
    return null
  }
}

export const getAccountQuery = async (currencies: any, id: any) => {
  try {
    const accounts: any = await selectQuery(
      "SELECT accounts.id, account_name, account_number, organization, account_type, account_comments, currency_name, currency_symbol, decimal,cur.id as account_currency, SUM(CASE WHEN entries.entry_type = 'income' THEN entries.amount WHEN entries.entry_type = 'expense' THEN -entries.amount ELSE 0 END) as total_amount FROM accounts LEFT JOIN (SELECT id, name as currency_name, symbol as currency_symbol, decimal FROM currencies) cur ON cur.id = accounts.currency_id LEFT JOIN entries ON entries.account_id = accounts.id WHERE accounts.id = ? GROUP BY account_name",
      [id]
    )

    const account = accounts.raw()[0]

    const entries = await getAccountEntriesQuery(account?.account_name)

    account.entries = entries
    if (account?.account_type === 'wallet') {
      const netCurrency = getNetworkCurrency(account?.organization)

      const currency = currencies.find(
        (c: any) => c?.symbol === netCurrency?.symbol,
      )

      const defaultPrices = await getExchangeValues(currencies, currency?.id)
      const currenciesAccount = await entries.reduce(
        (prev: any, next: any) => {
          const change = defaultPrices[String(next?.currency_id)]
          const amount = change
            ? operateChange(change?.op, change?.value, next.amount)
            : next.amount
          return prev + (next?.entry_type === 'income' ? amount : -amount)
        },
        0,
      )
      account.currency_name = currency?.name
      account.currency_symbol = currency?.symbol
      account.decimal = currency?.decimal
      account.total_amount = currenciesAccount
    }

    return account
  } catch (error) {
    console.log('error getting accounts', error)
    return null
  }
}

export const deleteAccountQuery = async (id: any) => {
  try {
    return await selectQuery('DELETE FROM accounts WHERE id = ?', [id])
  } catch (error) {
    console.log('error deleting account', error)
    return null
  }
}

