import {debugLog} from 'utils'
import {insertQuery, selectQuery} from './helpers'

export const getCurrenciesQuery = async () => {
  try {
    const currencies: any = await selectQuery(
      "SELECT currencies.id, symbol, name, type,\
      entries.prices,\
      decimal, image, SUM(CASE WHEN entries.entry_type = 'income'\
      AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
      THEN entries.amount WHEN entries.entry_type = 'expense' \
      AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL) \
      THEN -entries.amount WHEN entries.entry_type = 'goals' \
      AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
      THEN -entries.amount ELSE 0 END) as total_amount, entries.account_id as has_account FROM currencies LEFT JOIN accounts ON accounts.currency_id = currencies.id LEFT JOIN entries ON entries.account_id = accounts.id GROUP BY currencies.name",
    )
    return currencies.raw()
  } catch (error) {
    debugLog(error, 'an error happend get currencies')
    return null
  }
}

export const createOrUpdateCurrencyQuery = async (data: any) => {
  try {
    const currency: any = await selectQuery(
      'SELECT * FROM currencies WHERE symbol = ? OR name = ?',
      [data.symbol, data.name],
    )
    if (currency?.raw()?.length > 0) {
      const id = currency.raw()[0].id
      await insertQuery(
        'UPDATE currencies SET symbol = ?, name = ?, type = ?, decimal = ?, image = ?, address = ?, network = ? WHERE id = ?',
        [
          data.symbol,
          data.name,
          data.type,
          data.decimal,
          data.image,
          data?.address,
          data?.network,
          id,
        ],
      )

      const newCurrency: any = await selectQuery(
        'SELECT * FROM currencies WHERE id = ?',
        [id],
      )

      return newCurrency.raw()[0]
    }
    const res: any = await insertQuery(
      'INSERT INTO currencies (symbol, name, type, decimal, address, network, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        data.symbol,
        data.name,
        data.type,
        data.decimal,
        data?.address,
        data?.network,
        data.image,
      ],
    )
    const insertedId = res?.insertId
    const newCurrency: any = await selectQuery(
      'SELECT * FROM currencies WHERE symbol = ? OR name = ?',
      [data.symbol, data.name],
    )
    return insertedId ? newCurrency.raw()?.find((c: any) => c.id === insertedId) : newCurrency.raw()[0]
  } catch (error) {
    debugLog(error, 'error create/update currency')
    return null
  }
}
