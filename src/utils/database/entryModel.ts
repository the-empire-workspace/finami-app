import { setPrices } from 'utils/exchangeData'
import { insertQuery, selectQuery } from './helpers'
import { operateChange } from 'utils/dataTransform'
import { call } from 'redux-saga/effects'

export function* createEntryQuery(data: any, currencies: any, prices: any): any {
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
      entry_id = null,
      category_id = null,
      limit_date,
      status_level,
    } = data

    const query = `INSERT INTO entries \
      (account_id,\
      payment_type,\
      amount,\
      entry_type,\
      status,\
      payment_concept,\
      comment,\
      emissor,\
      email,\
      phone,\
      frecuency_type,\
      frecuency_time,\
      date,\
      entry_id,\
      category_id,
      status_level,
      limit_date) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const newEntry: any = yield call(insertQuery, query, [
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
      frecuency_type,
      frecuency_time,
      date,
      entry_id,
      category_id,
      status_level,
      limit_date,
    ])

    const entry: any = yield call(getEntry, newEntry.insertId)

    const defaultPrices = yield call(
      setPrices,
      prices,
      currencies,
      entry?.currency_id,
    )

    yield call(insertQuery, 'UPDATE entries SET prices = ? WHERE id = ?', [
      JSON.stringify(defaultPrices),
      newEntry.insertId,
    ])

    return entry
  } catch (error) {
    console.log('error entry creation', error)
    return null
  }
}

export const getEntriesQuery = async () => {
  try {
    const entries: any = await selectQuery(
      'SELECT entries.amount,\
      entries.comment,\
      entries.date,\
      entries.email,\
      entries.emissor,\
      entries.status,\
      entries.frecuency_time,\
      entries.frecuency_type,\
      accounts.currency_id,\
      entries.entry_type,\
      entries.id,\
      entries.payment_concept,\
      entries.payment_type,\
      entries.phone,\
      entries.prices,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entries.payment_type = "general" ORDER BY entries.date DESC',
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getEntriesExpensesQuery = async () => {
  try {
    const entries: any = await selectQuery(
      'SELECT entries.amount,\
      entries.comment,\
      entries.date,\
      entries.email,\
      entries.emissor,\
      entries.status,\
      entries.frecuency_time,\
      entries.frecuency_type,\
      entries.entry_type,\
      entries.id,\
      entries.payment_concept,\
      entries.payment_type,\
      entries.phone,\
      entries.entry_id,\
      entries.prices,\
      entry.type_entry,\
      accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN (SELECT id, payment_type as type_entry FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entries.entry_type = "expense" ORDER BY entries.date DESC',
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getBasicsExpensesQuery = async () => {
  try {
    const entries: any = await selectQuery(
      'SELECT entries.amount,\
      entries.comment,\
      entries.date,\
      entries.email,\
      entries.emissor,\
      entries.status,\
      entries.frecuency_time,\
      entries.frecuency_type,\
      entries.entry_type,\
      entries.id,\
      entries.payment_concept,\
      entries.payment_type,\
      entries.phone,\
      entries.entry_id,\
      entries.prices,\
      accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id\
      WHERE entries.entry_type = "expense" AND entries.payment_type = "basic_expenses" AND category_id IS NULL ORDER BY entries.date DESC',
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting basics expenses', error)
  }
}

export const getEntry = async (id: any) => {
  try {
    const query =
      'SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    accounts.account_name,\
    accounts.account_number,\
    accounts.id as account,\
    accounts.organization,\
    accounts.currency_id,\
    entries.category_id,\
    entries.status_level,\
    entries.limit_date,\
    currencies.symbol AS currency_symbol,\
    currencies.decimal,\
    entries.entry_id,\
    entries.prices,\
    entry.type FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id\
    LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id'

    const entry: any = await selectQuery(`${query} WHERE entries.id = ?`, [id])
    return entry.raw()[0]
  } catch (error) {
    console.log('error getting entry', error)
  }
}

export const getBasicExpenseQuery = async (id: any) => {
  try {
    const query =
      'SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    accounts.account_name,\
    accounts.account_number,\
    accounts.organization,\
    accounts.currency_id,\
    entries.category_id,\
    entries.account_id as account,\
    entries.prices,\
    currencies.symbol AS currency_symbol,\
    currencies.decimal FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id'

    const entry: any = await selectQuery(`${query} WHERE entries.id = ?`, [id])

    const queryEntry = entry.raw()[0]
    const entries: any = await selectQuery(
      `${query} WHERE entries.entry_id = ? ORDER BY date desc`,
      [id],
    )
    queryEntry.entries = entries.raw()

    return queryEntry
  } catch (error) {
    console.log('error getting entry', error)
  }
}

export const updateEntryQuery = async (id: any, entry: any) => {
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
      frecuency_type = null,
      frecuency_time = null,
      entry_id = null,
      status_level = null,
      limit_date = null,
    } = entry

    const newEntry: any = await insertQuery(
      'UPDATE entries SET account_id = ?,\
    payment_type = ?,\
    amount = ?,\
    entry_type = ?,\
    payment_concept = ?,\
    comment = ?,\
    emissor = ?,\
    email = ?,\
    phone = ?,\
    date = ?,\
    status = ?,\
    frecuency_type = ?,\
    frecuency_time = ?,\
    entry_id = ?,\
    status_level = ?,\
    limit_date = ?\
    WHERE id = ?',
      [
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
        entry_id,
        status_level,
        limit_date,
        id,
      ],
    )
    const updateEntry: any = await selectQuery(
      'SELECT * FROM entries WHERE id = ?',
      [newEntry?.insertId],
    )
    return updateEntry.raw()[0]
  } catch (error) {
    console.log('error updating entry', error)
  }
}

export const updatePostponeEntryQuery = async (id: any, entry: any) => {
  try {
    const { date } = entry

    const newEntry: any = await insertQuery(
      'UPDATE entries SET date = ? WHERE id = ?',
      [date, id],
    )
    const updateEntry: any = await selectQuery(
      'SELECT * FROM entries WHERE id = ?',
      [newEntry?.insertId],
    )
    return updateEntry.raw()[0]
  } catch (error) {
    console.log('error updating entry', error)
  }
}

export const updateStatusEntryQuery = async (id: any, entry: any) => {
  try {
    const { date, amount, account } = entry

    const newEntry: any = await insertQuery(
      'UPDATE entries SET account_id = ?, date = ?,amount = ?, status = "paid" WHERE id = ?',
      [account, date, amount, id],
    )
    const updateEntry: any = await selectQuery(
      'SELECT * FROM entries WHERE id = ?',
      [newEntry?.insertId],
    )
    return updateEntry.raw()[0]
  } catch (error) {
    console.log('error updating entry', error)
  }
}

export const getAccountEntriesQuery = async (account: any) => {
  try {
    const query =
      'SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    accounts.currency_id,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    entries.prices,\
    entry.type FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id\
    LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
    WHERE entries.payment_type = "general" AND accounts.account_name = ? ORDER BY entries.date DESC'

    const entries: any = await selectQuery(`${query} `, [account])
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const deleteAccountEntryQuery = async (id: any) => {
  try {
    await selectQuery('DELETE FROM entries WHERE account_id = ?', [id])
  } catch (error) {
    console.log('error deleting entry', error)
  }
}

export const deleteEntryQuery = async (id: any) => {
  try {
    await selectQuery('DELETE FROM entries WHERE id = ?', [id])
    await selectQuery('DELETE FROM entries WHERE entry_id = ?', [id])
    return
  } catch (error) {
    console.log('error deleting entry', error)
    return null
  }
}

export function* getDebtsQuery(
  currencies: any,
  currency_id: any,
  prices: any,
  user: any
): any {
  try {
    const query = `SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    entries.entry_id,\
    entries.status_level,\
    entries.limit_date,\
    entries.prices,\
    accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id`

    const entries: any = yield call(
      selectQuery,
      `${query} WHERE entries.entry_type = "expense" AND entries.payment_type = "debt" AND category_id IS NULL ORDER BY entries.date DESC`,
    )

    const queryEntries = entries.raw()

    for (const entry of queryEntries) {
      const entriesEntry: any = yield call(
        selectQuery,
        `${query} WHERE entries.entry_id = ?`,
        [entry?.id],
      )
      const queryEntriesEntry = entriesEntry.raw()
      const defaultPrices = yield call(
        setPrices,
        prices,
        currencies,
        currency_id,
      )

      const amount =
        queryEntriesEntry?.reduce((prev: any, next: any) => {
          const change = next?.prices ? JSON.parse(next?.prices)[String(user?.currency_id)] : defaultPrices[String(next?.currency_id)]
          if (next?.prices && change) {
            change.op = change.op === 'divide' ? 'multiply' : 'divide'
          }
          const newAmount = change
            ? operateChange(change?.op, change?.value, next.amount)
            : next.amount
          return prev + newAmount
        }, 0) || 0
      entry.total_amount = amount
    }

    return queryEntries
  } catch (error) {
    console.log('error getting debts', error)
  }
}

export function* getDebtQuery(
  id: any,
  currencies: any,
  currency_id: any,
  prices: any,
  user: any
): any {
  try {
    const query =
      'SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    accounts.account_name,\
    accounts.account_number,\
    accounts.organization,\
    accounts.currency_id,\
    entries.category_id,\
    entries.status_level,\
    entries.limit_date,\
    entries.prices,\
    currencies.symbol AS currency_symbol,\
    currencies.decimal FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id'

    const entry: any = yield call(
      selectQuery,
      `${query} WHERE entries.id = ?`,
      [id],
    )

    const queryEntry = entry.raw()[0]
    const entries: any = yield call(
      selectQuery,
      `${query} WHERE entries.entry_id = ? ORDER BY entries.date DESC`,
      [id],
    )
    queryEntry.entries = entries.raw()

    const defaultPrices = yield call(setPrices, prices, currencies, currency_id)
    const amount =
      queryEntry.entries?.reduce((prev: any, next: any) => {
        const change = next?.prices ? JSON.parse(next?.prices)[String(user?.currency_id)] : defaultPrices[String(next?.currency_id)]
        if (next?.prices && change) {
          change.op = change.op === 'divide' ? 'multiply' : 'divide'
        }
        const newAmount = change
          ? operateChange(change?.op, change?.value, next.amount)
          : next.amount
        return prev + newAmount
      }, 0) || 0

    queryEntry.total_amount = amount
    return queryEntry
  } catch (error) {
    console.log('error getting entry', error)
  }
}

export const getFixedIncomesQuery = async () => {
  try {
    const entries: any = await selectQuery(
      'SELECT entries.amount,\
      entries.comment,\
      entries.date,\
      entries.email,\
      entries.emissor,\
      entries.status,\
      entries.frecuency_time,\
      entries.frecuency_type,\
      entries.entry_type,\
      entries.id,\
      entries.payment_concept,\
      entries.payment_type,\
      entries.phone,\
      entries.entry_id,\
      entries.prices,\
      accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id\
      WHERE entries.entry_type = "income" AND entries.payment_type = "fixed_incomes" AND category_id IS NULL ORDER BY entries.date DESC',
    )
    const query =
      'SELECT entries.amount,\
  entries.comment,\
  entries.date,\
  entries.email,\
  entries.emissor,\
  entries.status,\
  entries.frecuency_time,\
  entries.frecuency_type,\
  accounts.currency_id,\
  entries.entry_type,\
  entries.id,\
  entries.payment_concept,\
  entries.payment_type,\
  entries.phone,\
  entries.prices,\
  entry.type FROM entries\
  LEFT JOIN accounts ON accounts.id = entries.account_id\
  LEFT JOIN currencies ON currencies.id = accounts.currency_id\
  LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
  WHERE entries.payment_type = "general"'

    const fixedIncomes = entries.raw()
    for (const income of fixedIncomes) {
      const entriesIncome: any = await selectQuery(
        `${query} AND entries.entry_id = ? ORDER BY entries.date DESC`,
        [income?.id],
      )
      income.entries = entriesIncome.raw()
    }
    return entries.raw()
  } catch (error) {
    console.log('error getting basics expenses', error)
  }
}

export const getFixedIncomeQuery = async (id: any) => {
  try {
    const query =
      'SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    accounts.account_name,\
    accounts.account_number,\
    accounts.organization,\
    accounts.currency_id,\
    entries.account_id as account,\
    entries.category_id,\
    entries.prices,\
    currencies.symbol AS currency_symbol,\
    currencies.decimal FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id'

    const entry: any = await selectQuery(`${query} WHERE entries.id = ?`, [id])

    const queryEntry = entry.raw()[0]
    const entries: any = await selectQuery(
      `${query} WHERE entries.entry_id = ? ORDER BY entries.date DESC`,
      [id],
    )
    queryEntry.entries = entries.raw()

    return queryEntry
  } catch (error) {
    console.log('error getting entry', error)
  }
}

export function* getReceivableAccountsQuery(
  currencies: any,
  currency_id: any,
  prices: any,
  user: any
): any {
  try {
    const query = `SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    entries.entry_id,\
    entries.status_level,\
    entries.limit_date,\
    entries.prices,\
    accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id`

    const entries: any = yield call(
      selectQuery,
      `${query} WHERE entries.entry_type = "income" AND entries.payment_type = "receivable_account" AND category_id IS NULL ORDER BY entries.date DESC`,
    )
    const queryEntries = entries.raw()

    for (const entry of queryEntries) {
      const entriesEntry: any = yield call(
        selectQuery,
        `${query} WHERE entries.entry_id = ?`,
        [entry?.id],
      )
      const queryEntriesEntry = entriesEntry.raw()

      const defaultPrices = yield call(
        setPrices,
        prices,
        currencies,
        currency_id,
      )

      const amount =
        queryEntriesEntry?.reduce((prev: any, next: any) => {
          const change = next?.prices ? JSON.parse(next?.prices)[String(user?.currency_id)] : defaultPrices[String(next?.currency_id)]
          if (next?.prices && change) {
            change.op = change.op === 'divide' ? 'multiply' : 'divide'
          }
          const newAmount = change
            ? operateChange(change?.op, change?.value, next.amount)
            : next.amount
          return prev + newAmount
        }, 0) || 0
      entry.total_amount = amount
    }

    return queryEntries
  } catch (error) {
    console.log('error getting debts', error)
  }
}

export function* getReceivableAccountQuery(
  id: any,
  currencies: any,
  currency_id: any,
  prices: any,
  user: any
): any {
  try {
    const query =
      'SELECT entries.amount,\
    entries.comment,\
    entries.date,\
    entries.email,\
    entries.emissor,\
    entries.status,\
    entries.frecuency_time,\
    entries.frecuency_type,\
    entries.entry_type,\
    entries.id,\
    entries.payment_concept,\
    entries.payment_type,\
    entries.phone,\
    accounts.account_name,\
    accounts.account_number,\
    accounts.organization,\
    accounts.currency_id,\
    entries.category_id,\
    entries.status_level,\
    entries.prices,\
    entries.limit_date,\
    currencies.symbol AS currency_symbol,\
    currencies.decimal FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id'

    const entry: any = yield call(
      selectQuery,
      `${query} WHERE entries.id = ?`,
      [id],
    )

    const queryEntry = entry.raw()[0]

    const entries: any = yield call(
      selectQuery,
      `${query} WHERE entries.entry_id = ? ORDER BY date desc`,
      [id],
    )

    queryEntry.entries = entries.raw()

    const defaultPrices = yield call(setPrices, prices, currencies, currency_id)
    const amount =
      queryEntry.entries?.reduce((prev: any, next: any) => {
        const change = entry?.prices ? JSON.parse(entry?.prices)[String(user?.currency_id)] : defaultPrices[String(entry?.currency_id)]
        if (entry?.prices && change) {
          change.op = change.op === 'divide' ? 'multiply' : 'divide'
        }
        const newAmount = change
          ? operateChange(change?.op, change?.value, next.amount)
          : next.amount
        return prev + newAmount
      }, 0) || 0

    queryEntry.total_amount = amount
    return queryEntry
  } catch (error) {
    console.log('error getting entry', error)
  }
}

export const getEntriesIncomesQuery = async () => {
  try {
    const entries: any = await selectQuery(
      'SELECT entries.amount,\
      entries.comment,\
      entries.date,\
      entries.email,\
      entries.emissor,\
      entries.status,\
      entries.frecuency_time,\
      entries.frecuency_type,\
      entries.entry_type,\
      entries.id,\
      entries.payment_concept,\
      entries.payment_type,\
      entries.phone,\
      entries.entry_id,\
      entries.prices,\
      entry.type_entry,\
      accounts.currency_id FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN (SELECT id, payment_type as type_entry FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entries.entry_type = "income" ORDER BY entries.date DESC',
    )

    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export function* getEntriesGoalsQuery(
  type: any,
  currencies: any,
  currency_id: any,
  prices: any,
  user: any
): any {
  try {
    const query = `SELECT entries.amount,\
    entries.comment,\
      entries.date,\
      entries.email,\
      entries.emissor,\
      entries.status,\
      entries.frecuency_time,\
      entries.frecuency_type,\
      entries.entry_type,\
      entries.id,\
      entries.payment_concept,\
      entries.payment_type,\
      entries.phone,\
      accounts.account_name,\
      accounts.account_number,\
      accounts.organization,\
      accounts.currency_id,\
      entries.category_id,\
      entries.status_level,\
      entries.prices,\
      entries.limit_date\
      FROM entries LEFT JOIN accounts ON accounts.id = entries.account_id`

    const entries: any = yield call(
      selectQuery,
      `${query} WHERE entries.payment_type = "${type}" AND entries.category_id IS NULL ORDER BY entries.date DESC`,
    )
    const queryEntries = entries.raw()

    for (const entry of queryEntries) {
      const entriesEntry: any = yield call(
        selectQuery,
        `${query} WHERE entries.entry_id = ?`,
        [entry?.id],
      )
      const queryEntriesEntry = entriesEntry.raw()
      const defaultPrices = yield call(
        setPrices,
        prices,
        currencies,
        currency_id,
      )

      const amount =
        queryEntriesEntry?.reduce((prev: any, next: any) => {
          const change = next?.prices ? JSON.parse(next?.prices)[String(user?.currency_id)] : defaultPrices[String(next?.currency_id)]
          if (next?.prices && change) {
            change.op = change.op === 'divide' ? 'multiply' : 'divide'
          }
          const newAmount = change
            ? operateChange(change?.op, change?.value, next.amount)
            : next.amount
          return prev + newAmount
        }, 0) || 0
      entry.total_amount = amount
    }

    return queryEntries
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export function* getGoalQuery(
  id: any,
  currencies: any,
  currency_id: any,
  prices: any,
  user: any
): any {
  try {
    const query =
      'SELECT entries.amount,\
      entries.comment,\
      entries.date,\
      entries.email,\
      entries.emissor,\
      entries.status,\
      entries.frecuency_time,\
      entries.frecuency_type,\
      entries.entry_type,\
      entries.id,\
      entries.payment_concept,\
      entries.payment_type,\
      entries.phone,\
      accounts.account_name,\
      accounts.account_number,\
      accounts.organization,\
      accounts.currency_id,\
      entries.category_id,\
      entries.status_level,\
      entries.limit_date,\
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      entries.prices,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id'

    const entry: any = yield call(
      selectQuery,
      `${query} WHERE entries.id = ?`,
      [id],
    )

    const queryEntry = entry.raw()[0]
    const entries: any = yield call(
      selectQuery,
      `${query} WHERE entries.entry_id = ? ORDER BY date desc`,
      [id],
    )
    queryEntry.entries = entries.raw()
    const defaultPrices = yield call(setPrices, prices, currencies, currency_id)
    const amount =
      queryEntry.entries?.reduce((prev: any, next: any) => {
        const change = next?.prices ? JSON.parse(next?.prices)[String(user?.currency_id)] : defaultPrices[String(next?.currency_id)]
        if (next?.prices && change) {
          change.op = change.op === 'divide' ? 'multiply' : 'divide'
        }
        const newAmount = change
          ? operateChange(change?.op, change?.value, next.amount)
          : next.amount
        return prev + newAmount
      }, 0) || 0

    queryEntry.total_amount = amount
    return queryEntry
  } catch (error) {
    console.log('error getting entry', error)
  }
}
