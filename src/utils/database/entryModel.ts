import {insertQuery, selectQuery} from './helpers'

export const createEntryQuery = async (data: any) => {
  try {
    const {
      user,
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
    } = data
    const newEntry: any = await insertQuery(
      'INSERT INTO entries (user_id, account_id, payment_type, amount, entry_type, payment_concept, comment, emissor, email, phone, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user,
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
      'SELECT entries.amount, entries.comment, entries.date, entries.email, entries.emissor, entries.entry_type, entries.id, entries.payment_concept, entries.payment_type, entries.phone, entries.user_id, accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id',
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getEntry = async (id: any) => {
  try {
    const entry: any = await selectQuery(
      'SELECT entries.amount, entries.comment, entries.date, entries.email, entries.emissor, entries.entry_type, entries.id, entries.payment_concept, entries.payment_type, entries.phone, entries.user_id, accounts.account_name, accounts.account_number, accounts.organization, accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id WHERE entries.id = ?',
      [id],
    )
    return entry.raw()[0]
  } catch (error) {
    console.log('error getting entry', error)
  }
}
