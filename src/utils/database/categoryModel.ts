import {setPrices} from 'utils/exchangeData'
import {insertQuery, selectQuery} from './helpers'
import {operateChange} from 'utils/dataTransform'
import {call} from 'redux-saga/effects'

export const createCategoryQuery = async (data: any) => {
  try {
    const {name, comment, type, date} = data

    const query = `INSERT INTO categories \
    (name,\
      comment,\
      type,\
      date) \
      VALUES (?, ?, ?, ?)`

    const newCategory: any = await insertQuery(query, [
      name,
      comment,
      type,
      date,
    ])
    const category: any = await selectQuery(
      'SELECT * FROM categories WHERE id = ?',
      [newCategory?.insertId],
    )
    return category.raw()[0]
  } catch (error) {
    console.log('error category creation', error)
    return null
  }
}

export const updateCategoryQuery = async (data: any, id: any) => {
  try {
    const {name, comment} = data

    const query = 'UPDATE categories SET name = ?, comment = ? WHERE id = ?'

    await insertQuery(query, [name, comment, id])
  } catch (error) {
    console.log('error category update', error)
  }
}

export const deleteCategoryQuery = async (id: any) => {
  try {
    await selectQuery('DELETE FROM categories WHERE id = ?', [id])
    await selectQuery('DELETE FROM entries WHERE category_id = ?', [id])
    return true
  } catch (error) {
    console.log('error deleting category', error)
    return null
  }
}

export const getOutcomeCategoriesQuery = async () => {
  try {
    const categories: any = await selectQuery(
      'SELECT * FROM categories WHERE type = "expense"',
    )
    return categories.raw()
  } catch (error) {
    console.log('error category selection', error)
  }
}

export const getIncomeCategoriesQuery = async () => {
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
    currencies.symbol AS currency_symbol,\
    currencies.decimal FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id'

    const categories: any = await selectQuery(
      'SELECT * FROM categories WHERE type = "income"',
    )

    const categoriesArray = categories.raw()

    for (const category of categoriesArray) {
      const entriesCategory: any = await selectQuery(
        `${query} WHERE category_id = ? ORDER BY entries.date DESC`,
        [category?.id],
      )
      for (const entry of entriesCategory.raw()) {
        const entries: any = await selectQuery(
          `${query} WHERE entry_id = ? ORDER BY entries.date DESC`,
          [entry?.id],
        )
        entry.entries = entries.raw()
      }
      category.entries = entriesCategory.raw()
    }
    return categories.raw()
  } catch (error) {
    console.log('error category selection', error)
  }
}

export const getGoalsCategoriesQuery = async (type: any) => {
  try {
    const categories: any = await selectQuery(
      `SELECT * FROM categories WHERE type = "${type}"`,
    )
    return categories.raw()
  } catch (error) {
    console.log('error category selection', error)
  }
}

export function* getCategoryQuery(
  id: any,
  prices: any,
  currencies: any = null,
  currency_id: any = null,
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
    currencies.symbol AS currency_symbol,\
    currencies.decimal FROM entries\
    LEFT JOIN accounts ON accounts.id = entries.account_id\
    LEFT JOIN currencies ON currencies.id = accounts.currency_id'

    const category: any = yield call(
      selectQuery,
      'SELECT * FROM categories WHERE id = ?',
      [id],
    )
    const queryCategory = category.raw()[0]

    const entriesCategory: any = yield call(
      selectQuery,
      `${query} WHERE category_id = ? AND entries.payment_type != "general" ORDER BY entries.date DESC`,
      [queryCategory?.id],
    )
    const queryEntries = entriesCategory.raw()
    if (currencies && currency_id)
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
            const change = defaultPrices[String(next?.currency_id)]
            const newAmount = change
              ? operateChange(change?.op, change?.value, next.amount)
              : next.amount
            return prev + newAmount
          }, 0) || 0
        entry.total_amount = amount
      }

    queryCategory.entries = queryEntries
    return queryCategory
  } catch (error) {
    console.log('error category selection', error)
  }
}
