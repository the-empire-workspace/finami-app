import { insertQuery, selectQuery } from "./helpers"

export const createEntryQuery = async (data: any) => {
  try {
    const { user, account, payment_type, amount, entry_type, payment_concept, comment, emissor, email, phone, date } = data
    console.log('creating entry')
    const newEntry: any = await insertQuery(`INSERT INTO entries (user_id, account_id, payment_type, amount, entry_type, payment_concept, comment, emissor, email, phone, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user, account, payment_type, amount, entry_type, payment_concept, comment, emissor, email, phone, date])
    const entry: any = await selectQuery(`SELECT * FROM entries WHERE id = ?`, [newEntry?.insertId])
    return entry.raw()[0]
  } catch (error) {
    console.log(error)
    return null
  }
}