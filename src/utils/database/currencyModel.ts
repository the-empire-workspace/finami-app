import {selectQuery} from './helpers'

export const getCurrenciesQuery = async () => {
  try {
    const currencies: any = await selectQuery(
      "SELECT currencies.id, symbol, name, type, decimal, image, SUM(CASE WHEN entries.entry_type = 'income' THEN entries.amount WHEN entries.entry_type = 'expense' THEN -entries.amount ELSE 0 END) as total_amount FROM currencies LEFT JOIN accounts ON accounts.currency_id = currencies.id LEFT JOIN entries ON entries.account_id = accounts.id GROUP BY currencies.name",
    )
    return currencies.raw()
  } catch (error) {
    console.log(error)
    return null
  }
}
