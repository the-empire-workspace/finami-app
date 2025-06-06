import {debugLog} from 'utils'
import {operateChange} from 'utils/dataTransform'
import {useEntryQueries} from './entryQueries'
import {selectQuery, executeQuery} from '../config/databaseHelpers'
import {setPrices} from 'utils/exchangeData'
import {call} from 'redux-saga/effects'
import {Account, AccountCreateParams, AccountUpdateParams} from '../models/Account'

export const useAccountQueries = () => {
  const {getAccountEntries} = useEntryQueries()

  const createAccount = async (params: AccountCreateParams): Promise<Account | null> => {
    try {
      const exist: any = await selectQuery(
        'SELECT * FROM accounts WHERE account_number = ?',
        [params.account_number],
      )
      if (exist?.raw()?.length > 0) {
        return exist.raw()[0]
      }
      const newAccount: any = await executeQuery(
        'INSERT INTO accounts (user_id, currency_id, account_name, account_number, account_type, organization, account_comments) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          params.user,
          Number(params.account_currency),
          params.account_name,
          params.account_number,
          params.account_type,
          params.organization,
          params.comments,
        ],
      )
      if (!newAccount) {
        const accountExist: any = await selectQuery(
          'SELECT * FROM accounts WHERE account_number = ?',
          [params.account_number],
        )
        return accountExist.raw()[0]
      }
      const account: any = await selectQuery(
        'SELECT * FROM accounts where id = ?',
        [newAccount.insertId],
      )
      return account.raw()[0]
    } catch (error) {
      debugLog('error account creation', error)
      return null
    }
  }

  const updateAccount = async (params: AccountUpdateParams): Promise<Account | null> => {
    try {
      await executeQuery(
        'UPDATE accounts SET account_name = ?, account_number = ?, account_type = ?, organization = ?, account_comments = ? WHERE id = ?',
        [
          params.account_name,
          params.account_number,
          params.account_type,
          params.organization,
          params.account_comments,
          params.id,
        ],
      )
      const account: any = await selectQuery(
        'SELECT * FROM accounts where id = ?',
        [params.id],
      )
      return account.raw()[0]
    } catch (error) {
      debugLog('error account update', error)
      return null
    }
  }

  const getAccounts = async (currencies: any, prices: any, user: any): Promise<Account[]> => {
    try {
      const accounts: any = await selectQuery(
        "SELECT accounts.id, account_name, account_number,\
        organization, account_type, account_comments, currency_name,\
        entries.prices,\
        currency_symbol, decimal, SUM(CASE WHEN entries.entry_type = 'income'\
        AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
        THEN entries.amount WHEN entries.entry_type = 'expense' \
        AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL) \
        THEN -entries.amount WHEN entries.entry_type = 'goals' \
        AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
        THEN -entries.amount ELSE 0 END) as total_amount FROM accounts \
        LEFT JOIN (SELECT id, name as currency_name, symbol as currency_symbol, decimal FROM currencies) cur ON cur.id = accounts.currency_id LEFT JOIN entries ON entries.account_id = accounts.id GROUP BY accounts.id",
      )

      const rawAccounts = accounts.raw()
      for (const account of rawAccounts) {
       /*  if (account?.account_type === 'wallet') {
          const netCurrency = getNetworkCurrency(account?.organization)
          const currency = currencies.find(
            (c: any) => c?.symbol === netCurrency?.symbol,
          )
          const defaultPrices = await setPrices(
            prices,
            currencies,
            currency?.id,
          )
          const entries = await getAccountEntries(account?.id)
          const currenciesAccount = entries.reduce((prev: any, next: any) => {
            const change = next?.prices
              ? JSON.parse(next?.prices)[String(user?.currency_id)]
              : defaultPrices[String(next?.currency_id)]
            if (next?.prices && change)
              change.op = change.op === 'divide' ? 'multiply' : 'divide'

            const amount = change
              ? operateChange(change?.op, change?.value, next.amount)
              : next.amount
            if (next.entry_type === 'income') {
              prev += amount
              return prev
            }
            prev -= amount
            return prev
          }, 0)
          account.currency_name = currency?.name
          account.currency_symbol = currency?.symbol
          account.decimal = currency?.decimal
          account.total_amount = currenciesAccount
        } */
      }
      return rawAccounts
    } catch (error) {
      debugLog('error getting accounts', error)
      return []
    }
  }

  const getAccount = async (currencies: any, id: number, prices: any, user: any): Promise<Account | null> => {
    try {
      const accounts: any = await selectQuery(
        "SELECT accounts.id, account_name, account_number,\
        entries.prices,\
        organization, account_type, account_comments, currency_name, currency_symbol, decimal,cur.id as account_currency, SUM(CASE WHEN entries.entry_type = 'income'\
        AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
        THEN entries.amount WHEN entries.entry_type = 'expense' \
        AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL) \
        THEN -entries.amount WHEN entries.entry_type = 'goals' \
        AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
        THEN -entries.amount ELSE 0 END) as total_amount FROM accounts LEFT JOIN (SELECT id, name as currency_name, symbol as currency_symbol, decimal FROM currencies) cur ON cur.id = accounts.currency_id LEFT JOIN entries ON entries.account_id = accounts.id WHERE accounts.id = ? GROUP BY accounts.id",
        [id],
      )

      const account = accounts.raw()[0]
      const entries = await getAccountEntries(account?.id)
      account.entries = entries

     /*  if (account?.account_type === 'wallet') {
        const netCurrency = getNetworkCurrency(account?.organization)
        const currency = currencies.find(
          (c: any) => c?.symbol === netCurrency?.symbol,
        )
        const defaultPrices = await setPrices(
          prices,
          currencies,
          currency?.id,
        )
        const currenciesAccount = entries.reduce((prev: any, next: any) => {
          const change = next?.prices
            ? JSON.parse(next?.prices)[String(user?.currency_id)]
            : defaultPrices[String(next?.currency_id)]
          if (next?.prices && change)
            change.op = change.op === 'divide' ? 'multiply' : 'divide'

          const amount = change
            ? operateChange(change?.op, change?.value, next.amount)
            : next.amount
          return prev + (next?.entry_type === 'income' ? amount : -amount)
        }, 0)
        account.currency_name = currency?.name
        account.currency_symbol = currency?.symbol
        account.decimal = currency?.decimal
        account.total_amount = currenciesAccount
      }
 */
      return account
    } catch (error) {
      debugLog('error getting account', error)
      return null
    }
  }

  const deleteAccount = async (id: number): Promise<boolean> => {
    try {
      await selectQuery('DELETE FROM accounts WHERE id = ?', [id])
      return true
    } catch (error) {
      debugLog('error deleting account', error)
      return false
    }
  }

  return {
    createAccount,
    updateAccount,
    getAccounts,
    getAccount,
    deleteAccount
  }
} 