import {selectQuery} from './helpers'

export const getLastMovementsQuery = async (from: any, to: any) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getReportCurrenciesQuery = async (from: any, to: any, id: any) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE accounts.currency_id = ? AND entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [id, from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getReportAccountQuery = async (from: any, to: any, id: any) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE accounts.id = ? AND entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [id, from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getIncomesReportQuery = async (from: any, to: any) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entries.entry_type = "income" AND entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getExpensesReportQuery = async (from: any, to: any) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entries.entry_type = "expense" AND entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getReportFromEntryQuery = async (from: any, to: any, id: any) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entry.id = ? AND entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [id, from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getReportFromEntryCategoryQuery = async (
  from: any,
  to: any,
  id: any,
) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entries.category_id = ? AND entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [id, from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}

export const getGoalsReportQuery = async (from: any, to: any, type: any) => {
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
      currencies.symbol AS currency_symbol,\
      currencies.decimal,\
      currencies.name AS currency_name,\
      entry.type FROM entries\
      LEFT JOIN accounts ON accounts.id = entries.account_id\
      LEFT JOIN currencies ON currencies.id = accounts.currency_id\
      LEFT JOIN (SELECT id, payment_type as type FROM entries) as entry ON entries.entry_id = entry.id\
      WHERE entry.type = ? AND entries.payment_type = "general" AND entries.date BETWEEN ? AND ? ORDER BY entries.date DESC',
      [type, from, to],
    )
    return entries.raw()
  } catch (error) {
    console.log('error getting entries', error)
  }
}
