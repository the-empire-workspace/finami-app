import { insertQuery, selectQuery } from './helpers'

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
      'INSERT INTO accounts (user_id, currency_id, account_name, account_number,account_type, organization, account_comments) VALUES (?, ?, ?, ?, ?, ?)',
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
    const account: any = await selectQuery('SELECT * FROM accounts where id = ?', [newAccount.insertId])
    return account.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getAccountsQuery = async () => {
  try {
    const accounts: any = await selectQuery(
      "SELECT accounts.id, account_name, account_number, bank, account_comments, currency_name, currency_symbol, decimal, SUM(CASE WHEN entries.entry_type = 'income' THEN entries.amount WHEN entries.entry_type = 'expense' THEN -entries.amount ELSE 0 END) as total_amount FROM accounts LEFT JOIN (SELECT id, name as currency_name, symbol as currency_symbol, decimal FROM currencies) cur ON cur.id = accounts.currency_id LEFT JOIN entries ON entries.account_id = accounts.id GROUP BY account_name",
    )
    return accounts.raw()
  } catch (error) {
    console.log(error)
    return null
  }
}
