import {debugLog} from 'utils'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
  CREATE_BASIC_EXPENSES,
  CREATE_BASIC_EXPENSES_ASYNC,
  CREATE_DEBT,
  CREATE_DEBT_ASYNC,
  CREATE_DEBT_ENTRY,
  CREATE_DEBT_ENTRY_ASYNC,
  CREATE_OUTCOME,
  CREATE_OUTCOME_ASYNC,
  CREATE_OUTCOME_CATEGORY,
  CREATE_OUTCOME_CATEGORY_ASYNC,
  DELETE_CATEGORY_OUTCOME,
  DELETE_DEBT,
  DELETE_DEBT_ASYNC,
  DELETE_OUTCOME,
  DELETE_OUTCOME_ASYNC,
  GET_BASIC_EXPENSE,
  GET_BASIC_EXPENSES,
  GET_BASIC_EXPENSES_ASYNC,
  GET_BASIC_EXPENSE_ASYNC,
  GET_CATEGORY_OUTCOME,
  GET_CATEGORY_OUTCOME_ASYNC,
  GET_DEBT,
  GET_DEBTS,
  GET_DEBTS_ASYNC,
  GET_DEBT_ASYNC,
  GET_OUTCOMES,
  GET_OUTCOMES_ASYNC,
  UPDATE_BASIC_EXPENSE,
  UPDATE_BASIC_EXPENSE_ASYNC,
  UPDATE_CATEGORY_OUTCOME,
  UPDATE_DEBT,
  UPDATE_DEBT_ASYNC,
} from './action-types'
import {
  actionObject,
  createCategoryQuery,
  createEntryQuery,
  deleteCategoryQuery,
  deleteEntryQuery,
  getBasicExpenseQuery,
  getBasicsExpensesQuery,
  getCategoryQuery,
  getCurrenciesQuery,
  getDebtQuery,
  getDebtsQuery,
  getEntriesExpensesQuery,
  getLastDate,
  getOutcomeCategoriesQuery,
  operateChange,
  orderBy,
  updateCategoryQuery,
  updateEntryQuery,
} from 'utils'
import {getDashboardValues, getOutcomes, getTotalBalance} from 'store/actions'
import {selectAccount, selectCurrency, selectIntermitence} from 'store/selector'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'

function* createOutcomeAsync({payload}: any): any {
  try {
    const newDate = new Date()
    const today = new Date()
    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }
    const {prices} = yield select(selectIntermitence)
    let {currencies} = yield select(selectCurrency)
    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    yield call(
      createEntryQuery,
      {
        account: payload?.account,
        payment_type: 'general',
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'expense',
        comment: payload?.comments || '',
        emissor: payload?.receiver_name || '',
        email: payload?.email || '',
        phone: payload?.phonenumber || '',
        date: newDate.getTime(),
        status: today < newDate ? 'pending' : 'paid',
      },
      currencies,
      prices,
    )

    const outcomes = yield call(getEntriesExpensesQuery)
    yield put(actionObject(CREATE_OUTCOME_ASYNC, outcomes))

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create outcome async')
  }
}

function* createBasicExpensesAsync({payload}: any): any {
  try {
    const newDate = new Date()

    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }
    const {prices} = yield select(selectIntermitence)
    const {user} = yield select(selectAccount)
    let {currencies} = yield select(selectCurrency)
    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const newEntry = yield call(
      createEntryQuery,
      {
        account: payload?.account,
        payment_type: 'basic_expenses',
        category_id: payload?.category_id,
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'expense',
        comment: payload?.comment || '',
        emissor: payload?.receiver_name || '',
        email: payload?.email || '',
        phone: payload?.phonenumber || '',
        date: newDate?.getTime(),
        frecuency_type: payload?.frecuency_type || '',
        frecuency_time: payload?.frecuency_time || '',
      },
      currencies,
      prices,
    )
    const entryDate = (payload?.date || new Date())?.getTime()
    const date = new Date().getTime()

    const entryData = {
      entry_id: newEntry?.id,
      category_id: payload?.category_id,
      account: payload?.account,
      payment_type: 'general',
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'expense',
      comment: payload?.comment || '',
      emissor: payload?.receiver_name || '',
      email: payload?.email || '',
      phone: payload?.phonenumber || '',
      date: newDate.getTime(),
      status: 'pending',
    }

    let postEntryData = null

    if (entryDate < date) {
      entryData.status = 'paid'
      postEntryData = {
        entry_id: newEntry?.id,
        category_id: payload?.category_id,
        account: payload?.account,
        payment_type: 'general',
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'expense',
        comment: payload?.comment || '',
        emissor: payload?.receiver_name || '',
        email: payload?.email || '',
        phone: payload?.phonenumber || '',
        date: getLastDate(newEntry, entryData).getTime(),
        status: 'pending',
      }
    }

    yield call(createEntryQuery, entryData, currencies, prices)
    if (postEntryData)
      yield call(createEntryQuery, postEntryData, currencies, prices)

    const outcomes = yield call(getBasicsExpensesQuery)
    const categories = yield call(getOutcomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')
    if (payload?.category_id) {
      const category = yield call(
        getCategoryQuery,
        payload?.category_id,
        prices,
        user,
      )
      yield put(actionObject(GET_CATEGORY_OUTCOME_ASYNC, category))
    }
    yield put(
      actionObject(CREATE_BASIC_EXPENSES_ASYNC, {
        itemsBasics: orderMix,
      }),
    )

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create basic expenses async')
  }
}

function* createOutcomeCategoryAsync({payload}: any): any {
  try {
    const newDate = new Date()
    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }
    yield call(createCategoryQuery, {
      name: payload?.concept,
      type: 'expense',
      comment: payload?.comment || '',
      date: newDate.getTime(),
    })

    const outcomes = yield call(getBasicsExpensesQuery)
    const categories = yield call(getOutcomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(CREATE_OUTCOME_CATEGORY_ASYNC, {
        itemsBasics: orderMix,
      }),
    )
    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create outcome category async')
  }
}

function* getOutcomesAsync(): any {
  try {
    const {defaultPrices} = yield select(selectCurrency)
    const outcomes = yield call(getEntriesExpensesQuery)
    const {user} = yield select(selectAccount)
    const dashboardValues = outcomes?.reduce(
      (values: any, entry: any) => {
        const change = entry?.prices
          ? JSON.parse(entry?.prices)[String(user?.currency_id)]
          : defaultPrices[String(entry?.currency_id)]
        if (entry?.prices && change)
          change.op = change.op === 'divide' ? 'multiply' : 'divide'

        const amount = change
          ? operateChange(change?.op, change?.value, entry.amount)
          : entry.amount
        if (entry?.payment_type === 'general') values.entries.push(entry)
        const date = new Date(entry?.date)
        const actualDate = new Date()
        if (
          date.getMonth() === actualDate.getMonth() &&
          entry?.payment_type !== 'basic_expenses' &&
          entry?.payment_type !== 'debt' &&
          entry?.status !== 'pending'
        )
          values.monthExpense += amount

        if (entry.payment_type === 'basic_expenses') {
          values.basicExpense += amount
          return values
        }
        if (entry?.payment_type === 'debt') {
          values.debts += amount
          return values
        }
        if (entry?.type_entry === 'debt') {
          values.debts -= amount
          return values
        }
        return values
      },
      {monthExpense: 0, basicExpense: 0, debts: 0, entries: []},
    )
    yield put(actionObject(GET_OUTCOMES_ASYNC, dashboardValues))
  } catch (error) {
    debugLog(error, 'an error happend get outcomes async')
  }
}

function* getBasicExpensesAsync(): any {
  try {
    const outcomes = yield call(getBasicsExpensesQuery)
    const categories = yield call(getOutcomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')
    yield put(actionObject(GET_BASIC_EXPENSES_ASYNC, orderMix))
  } catch (error) {
    debugLog(error, 'an error happend get basic expenses async')
  }
}

function* getBasicExpenseAsync({payload}: any): any {
  try {
    const outcome = yield call(getBasicExpenseQuery, payload)
    yield put(actionObject(GET_BASIC_EXPENSE_ASYNC, outcome))
  } catch (error) {
    debugLog(error, 'an error happend get basic expense async')
  }
}

function* updateBasicExpenseAsync({payload}: any): any {
  try {
    yield call(updateEntryQuery, payload?.id, {
      account: payload?.account,
      payment_type: 'basic_expenses',
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'expense',
      comment: payload?.comment || '',
      emissor: payload?.receiver_name || '',
      email: payload?.email || '',
      phone: payload?.phonenumber || '',
      date: (payload?.date || new Date())?.getTime(),
      frecuency_type: payload?.frecuency_type || '',
      frecuency_time: payload?.frecuency_time || '',
    })

    const outcomes = yield call(getBasicsExpensesQuery)
    const categories = yield call(getOutcomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    const item = yield call(getBasicExpenseQuery, payload?.id)

    yield put(
      actionObject(UPDATE_BASIC_EXPENSE_ASYNC, {
        itemsBasics: orderMix,
        item: item,
      }),
    )
    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update basic expense async')
  }
}

function* updateCategoryOutcomeAsync({payload}: any): any {
  try {
    yield call(
      updateCategoryQuery,
      {
        name: payload?.concept,
        comment: payload?.comment || '',
      },
      payload?.id,
    )

    const outcomes = yield call(getBasicsExpensesQuery)
    const categories = yield call(getOutcomeCategoriesQuery)
    const {user} = yield select(selectAccount)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    const {prices} = yield select(selectIntermitence)
    const category = yield call(getCategoryQuery, payload?.id, prices, user)

    yield put(
      actionObject(CREATE_OUTCOME_CATEGORY_ASYNC, {
        itemsBasics: orderMix,
        item: category,
      }),
    )
    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update category outcome async')
  }
}

function* deleteCategoryOutcomeAsync({payload}: any): any {
  try {
    yield call(deleteCategoryQuery, payload)

    const outcomes = yield call(getBasicsExpensesQuery)
    const categories = yield call(getOutcomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(DELETE_OUTCOME_ASYNC, {
        itemsBasics: orderMix,
        item: {},
      }),
    )

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete category outcome async')
  }
}

function* deleteOutcomeAsync({payload}: any): any {
  try {
    yield call(deleteEntryQuery, payload)

    const outcomes = yield call(getBasicsExpensesQuery)
    const categories = yield call(getOutcomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(DELETE_OUTCOME_ASYNC, {
        itemsBasics: orderMix,
        item: {},
      }),
    )

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete outcomes')
  }
}

function* getCategoryOutcomeASync({payload}: any): any {
  try {
    const {prices} = yield select(selectIntermitence)
    const {user} = yield select(selectAccount)
    const category = yield call(getCategoryQuery, payload, prices, user)
    yield put(actionObject(GET_CATEGORY_OUTCOME_ASYNC, category))
  } catch (error) {
    debugLog(error, 'an error happend get category outcomes async')
  }
}

function* createDebtAsync({payload}: any): any {
  try {
    const newDate = new Date()
    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)

    yield call(
      createEntryQuery,
      {
        account: payload?.account,
        payment_type: 'debt',
        category_id: payload?.category_id,
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'expense',
        comment: payload?.comment || '',
        emissor: payload?.receiver_name || '',
        email: payload?.email || '',
        phone: payload?.phonenumber || '',
        date: newDate.getTime(),
        limit_date: (payload?.limit_date || new Date())?.getTime(),
        status_level: payload?.status_level || '',
        frecuency_type: payload?.frecuency_type || '',
        frecuency_time: payload?.frecuency_time || '',
      },
      currencies,
      prices,
    )
    const outcomes = yield call(
      getDebtsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )
    const entriesOutcomes = yield call(getEntriesExpensesQuery)

    yield put(
      actionObject(CREATE_DEBT_ASYNC, {
        items: entriesOutcomes,
        itemsDebts: outcomes,
      }),
    )

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create debt async')
  }
}

function* createDebtEntryAsync({payload}: any): any {
  try {
    const newDate = new Date()
    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)

    yield call(
      createEntryQuery,
      {
        account: payload?.account,
        payment_type: 'general',
        category_id: payload?.category_id,
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'expense',
        comment: payload?.comment || '',
        emissor: payload?.receiver_name || payload?.emissor || '',
        email: payload?.email || '',
        phone: payload?.phonenumber || '',
        date: newDate.getTime(),
        frecuency_type: payload?.frecuency_type || '',
        frecuency_time: payload?.frecuency_time || '',
        entry_id: payload?.entry_id || '',
      },
      currencies,
      prices,
    )

    const outcomes = yield call(
      getDebtsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    const item = yield call(
      getDebtQuery,
      payload?.id,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    yield put(
      actionObject(CREATE_DEBT_ENTRY_ASYNC, {
        itemsDebts: outcomes,
        item: item,
      }),
    )

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create debt entry async')
  }
}

function* getDebtsAsync(): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)
    const outcomes = yield call(
      getDebtsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )
    yield put(actionObject(GET_DEBTS_ASYNC, outcomes))
  } catch (error) {
    debugLog(error, 'an error happend get debts async')
  }
}

function* getDebtAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const {prices} = yield select(selectIntermitence)
    const outcome = yield call(
      getDebtQuery,
      payload,
      currencies,
      user?.currency_id,
      prices,
      user,
    )
    yield put(actionObject(GET_DEBT_ASYNC, outcome))
  } catch (error) {
    debugLog(error, 'an error happend get debt async')
  }
}

function* updateDebtAsync({payload}: any): any {
  try {
    yield call(updateEntryQuery, payload?.id, {
      account: payload?.account,
      payment_type: 'debt',
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'expense',
      comment: payload?.comment || '',
      emissor: payload?.receiver_name || '',
      email: payload?.email || '',
      phone: payload?.phonenumber || '',
      date: (payload?.date || new Date())?.getTime(),
      limit_date: (payload?.limit_date || new Date())?.getTime(),
      status_level: payload?.status_level || '',
      frecuency_type: payload?.frecuency_type || '',
      frecuency_time: payload?.frecuency_time || '',
    })

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)
    const outcomes = yield call(
      getDebtsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    const item = yield call(
      getDebtQuery,
      payload?.id,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    yield put(
      actionObject(UPDATE_DEBT_ASYNC, {
        itemsDebts: outcomes,
        item: item,
      }),
    )

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update debt async')
  }
}

function* deleteDebtAsync({payload}: any): any {
  try {
    yield call(deleteEntryQuery, payload)

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)
    const outcomes = yield call(
      getDebtsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    yield put(
      actionObject(DELETE_DEBT_ASYNC, {
        itemsDebts: outcomes,
        item: {},
      }),
    )

    yield put(getOutcomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete debt async')
  }
}

export function* watchCreateOutcome() {
  yield takeLatest(CREATE_OUTCOME, createOutcomeAsync)
}

export function* watchGetOutcomes() {
  yield takeLatest(GET_OUTCOMES, getOutcomesAsync)
}

export function* watchCreateBasicExpenses() {
  yield takeLatest(CREATE_BASIC_EXPENSES, createBasicExpensesAsync)
}

export function* watchCreateOutcomeCategory() {
  yield takeLatest(CREATE_OUTCOME_CATEGORY, createOutcomeCategoryAsync)
}

export function* watchGetBasicExpenses() {
  yield takeLatest(GET_BASIC_EXPENSES, getBasicExpensesAsync)
}

export function* watchGetBasicExpense() {
  yield takeLatest(GET_BASIC_EXPENSE, getBasicExpenseAsync)
}

export function* watchUpdateBasicExpense() {
  yield takeLatest(UPDATE_BASIC_EXPENSE, updateBasicExpenseAsync)
}

export function* watchDeleteOutcome() {
  yield takeLatest(DELETE_OUTCOME, deleteOutcomeAsync)
}

export function* watchGetCategoryOutcome() {
  yield takeLatest(GET_CATEGORY_OUTCOME, getCategoryOutcomeASync)
}

export function* watchUpdateCategoryOutcome() {
  yield takeLatest(UPDATE_CATEGORY_OUTCOME, updateCategoryOutcomeAsync)
}

export function* watchDeleteCategoryOutcome() {
  yield takeLatest(DELETE_CATEGORY_OUTCOME, deleteCategoryOutcomeAsync)
}

export function* watchGetDebts() {
  yield takeLatest(GET_DEBTS, getDebtsAsync)
}

export function* watchGetDebt() {
  yield takeLatest(GET_DEBT, getDebtAsync)
}

export function* watchUpdateDebt() {
  yield takeLatest(UPDATE_DEBT, updateDebtAsync)
}

export function* watchDeleteDebt() {
  yield takeLatest(DELETE_DEBT, deleteDebtAsync)
}

export function* watchCreateDebt() {
  yield takeLatest(CREATE_DEBT, createDebtAsync)
}

export function* watchCreateDebtEntry() {
  yield takeLatest(CREATE_DEBT_ENTRY, createDebtEntryAsync)
}
