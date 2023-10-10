import {insertQuery, selectQuery} from './helpers'

export const createAccountQuery = async ({
  user,
  account_currency,
  account_name,
  account_number,
  bank,
  account_comments,
}: any) => {
  try {
    const newAccount: any = await insertQuery(
      'INSERT INTO accounts (user_id, currency_id, account_name, account_number, bank, account_comments) VALUES (?, ?, ?, ?, ?, ?)',
      [
        user,
        Number(account_currency),
        account_name,
        account_number,
        bank,
        account_comments,
      ],
    )
    const account: any = await selectQuery(
      'SELECT * FROM accounts WHERE id = ?',
      [newAccount?.insertId],
    )
    return account.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
