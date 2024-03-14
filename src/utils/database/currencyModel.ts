import {insertQuery, selectQuery} from './helpers'

export const getCurrenciesQuery = async () => {
  try {
    const currencies: any = await selectQuery(
      "SELECT currencies.id, symbol, name, type, decimal, image, SUM(CASE WHEN entries.entry_type = 'income'\
      AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
      THEN entries.amount WHEN entries.entry_type = 'expense' \
      AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL) \
      THEN -entries.amount WHEN entries.entry_type = 'goals' \
      AND entries.payment_type = 'general' AND (NOT entries.status = 'pending' OR entries.status IS NULL)\
      THEN -entries.amount ELSE 0 END) as total_amount, entries.account_id as has_account FROM currencies LEFT JOIN accounts ON accounts.currency_id = currencies.id LEFT JOIN entries ON entries.account_id = accounts.id GROUP BY currencies.name",
    )
    return currencies.raw()
  } catch (error) {
    console.log(error, 'an error happend get currencies')
    return null
  }
}

export const createOrUpdateCurrencyQuery = async (data: any) => {
  try {
    const currency: any = await selectQuery(
      'SELECT * FROM currencies WHERE symbol = ? AND network = ?',
      [data.symbol, data?.network],
    )
    if (currency?.raw()?.length > 0) {
      await insertQuery(
        'UPDATE currencies SET name = ?, type = ?, decimal = ?, image = ?, address = ? WHERE symbol = ?',
        [
          data.name,
          data.type,
          data.decimal,
          data.image,
          data?.address,
          data.symbol,
        ],
      )

      const newCurrency: any = await selectQuery(
        'SELECT * FROM currencies WHERE symbol = ? AND network = ?',
        [data.symbol, data?.network],
      )

      return newCurrency.raw()[0]
    }
    await insertQuery(
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
    const newCurrency: any = await selectQuery(
      'SELECT * FROM currencies WHERE symbol = ? AND network = ?',
      [data.symbol, data?.network],
    )
    return newCurrency.raw()[0]
  } catch (error) {}
}
