import { insertQuery, selectQuery } from './helpers'

export const createEntryQuery = async (data: any) => {
  try {
    const {
      account,
      payment_type,
      amount,
      entry_type,
      payment_concept,
      comment,
      emissor,
      email,
      phone,
      date,
      status,
      frecuency_type,
      frecuency_time,
    } = data
    const newEntry: any = await insertQuery(
      'INSERT INTO entries (account_id, payment_type, amount, entry_type, status, payment_concept, comment, emissor, email, phone, status, frecuency_type, frecuency_time, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        account,
        payment_type,
        amount,
        entry_type,
        status,
        payment_concept,
        comment,
        emissor,
        email,
        phone,
        status,
        frecuency_type,
        frecuency_time,
        date,
      ],
    )
    const entry: any = await selectQuery('SELECT * FROM entries WHERE id = ?', [
      newEntry?.insertId,
    ])
    return entry.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getEntriesQuery = async () => {
  try {
    const entries: any = await selectQuery(
      'SELECT entries.amount, entries.comment, entries.date, entries.email, entries.emissor, entries.status, entries.frecuency_time,entries.frecuency_type, entries.entry_type, entries.id, entries.payment_concept, entries.payment_type, entries.phone, accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id',
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getEntry = async (id: any) => {
  try {
    const entry: any = await selectQuery(
      'SELECT entries.amount, entries.comment, entries.date, entries.email, entries.emissor, entries.status, entries.frecuency_time,entries.frecuency_type, entries.entry_type, entries.id, entries.payment_concept, entries.payment_type, entries.phone, accounts.account_name, accounts.account_number, accounts.organization, accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id WHERE entries.id = ?',
      [id],
    )
    return entry.raw()[0]
  } catch (error) {
    console.log('error getting entry', error)
  }
}
