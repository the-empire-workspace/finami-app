import {debugLog} from 'utils'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
  CREATE_FIXED_INCOMES,
  CREATE_FIXED_INCOMES_ASYNC,
  CREATE_RECEIVABLE_ACCOUNT,
  CREATE_RECEIVABLE_ACCOUNT_ASYNC,
  CREATE_RECEIVABLE_ACCOUNT_ENTRY,
  CREATE_RECEIVABLE_ACCOUNT_ENTRY_ASYNC,
  CREATE_INCOME,
  CREATE_INCOME_CATEGORY,
  CREATE_INCOME_CATEGORY_ASYNC,
  DELETE_CATEGORY_INCOME,
  DELETE_RECEIVABLE_ACCOUNT,
  DELETE_RECEIVABLE_ACCOUNT_ASYNC,
  DELETE_INCOME,
  DELETE_INCOME_ASYNC,
  GET_FIXED_INCOME,
  GET_FIXED_INCOMES,
  GET_FIXED_INCOMES_ASYNC,
  GET_FIXED_INCOME_ASYNC,
  GET_CATEGORY_INCOME,
  GET_CATEGORY_INCOME_ASYNC,
  GET_RECEIVABLE_ACCOUNT,
  GET_RECEIVABLE_ACCOUNTS,
  GET_RECEIVABLE_ACCOUNTS_ASYNC,
  GET_RECEIVABLE_ACCOUNT_ASYNC,
  GET_INCOMES,
  GET_INCOMES_ASYNC,
  UPDATE_FIXED_INCOME,
  UPDATE_FIXED_INCOME_ASYNC,
  UPDATE_CATEGORY_INCOME,
  UPDATE_RECEIVABLE_ACCOUNT,
  UPDATE_RECEIVABLE_ACCOUNT_ASYNC,
} from './action-types'
import {
  actionObject,
  createCategoryQuery,
  createEntryQuery,
  deleteCategoryQuery,
  deleteEntryQuery,
  getFixedIncomeQuery,
  getFixedIncomesQuery,
  getCategoryQuery,
  getCurrenciesQuery,
  getReceivableAccountQuery,
  getReceivableAccountsQuery,
  getEntriesIncomesQuery,
  getIncomeCategoriesQuery,
  orderBy,
  updateCategoryQuery,
  updateEntryQuery,
  operateChange,
  getLastDate,
} from 'utils'
import {getDashboardValues, getIncomes, getTotalBalance} from 'store/actions'
import {selectAccount, selectCurrency, selectIntermitence} from 'store/selector'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'

function* createIncomeAsync({payload}: any): any {
  try {
    const newDate = new Date()
    const today = new Date()
    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }

    let {currencies} = yield select(selectCurrency)
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
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'income',
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

    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create income async')
  }
}

function* createFixedIncomesAsync({payload}: any): any {
  try {
    const newDate = new Date()

    const {prices} = yield select(selectIntermitence)
    const {user} = yield select(selectAccount)
    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }
    let {currencies} = yield select(selectCurrency)
    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const newEntry = yield call(
      createEntryQuery,
      {
        account: payload?.account,
        payment_type: 'fixed_incomes',
        category_id: payload?.category_id,
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'income',
        comment: payload?.comment || '',
        emissor: payload?.receiver_name || '',
        email: payload?.email || '',
        phone: payload?.phonenumber || '',
        date: newDate.getTime(),
        frecuency_type: payload?.frecuency_type || '',
        frecuency_time: payload?.frecuency_time || '',
      },
      currencies,
      prices,
    )

    const entryDate = (payload?.date || new Date())?.getTime()
    const date = new Date().getTime()
    const entryData: any = {
      entry_id: newEntry?.id,
      category_id: payload?.category_id,
      account: payload?.account,
      payment_type: 'general',
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'income',
      comment: payload?.comment || '',
      emissor: payload?.receiver_name || '',
      status: 'pending',
      email: payload?.email || '',
      phone: payload?.phonenumber || '',
      date: newDate.getTime(),
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
        entry_type: 'income',
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

    const outcomes = yield call(getFixedIncomesQuery)
    const categories = yield call(getIncomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')
    if (payload?.category_id) {
      const category = yield call(
        getCategoryQuery,
        payload?.category_id,
        prices,
        user,
      )
      yield put(actionObject(GET_CATEGORY_INCOME_ASYNC, category))
    }
    yield put(
      actionObject(CREATE_FIXED_INCOMES_ASYNC, {
        itemsFixed: orderMix,
      }),
    )

    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'error')
  }
}

function* createIncomeCategoryAsync({payload}: any): any {
  try {
    const newDate = new Date()
    if (payload?.date) {
      newDate.setDate(payload?.date?.getDate())
      newDate.setMonth(payload?.date?.getMonth())
      newDate.setFullYear(payload?.date?.getFullYear())
    }
    yield call(createCategoryQuery, {
      name: payload?.concept,
      type: 'income',
      comment: payload?.comment || '',
      date: newDate.getTime(),
    })

    const outcomes = yield call(getFixedIncomesQuery)
    const categories = yield call(getIncomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(CREATE_INCOME_CATEGORY_ASYNC, {
        itemsFixed: orderMix,
      }),
    )
    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create income category async')
  }
}

function* getIncomesAsync(): any {
  try {
    const {defaultPrices} = yield select(selectCurrency)
    const incomes = yield call(getEntriesIncomesQuery)
    const {user} = yield select(selectAccount)

    const actualDate = new Date()
    const dashboardValues = incomes?.reduce(
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
        if (
          date.getMonth() === actualDate.getMonth() &&
          entry.payment_type !== 'fixed_incomes' &&
          entry.payment_type !== 'receivable_account' &&
          entry?.status !== 'pending'
        )
          values.monthIncome += amount

        if (entry.payment_type === 'fixed_incomes') {
          values.fixedIncome += amount
          return values
        }

        if (entry?.payment_type === 'receivable_account') {
          values.receivableAccount += amount
          return values
        }
        if (entry?.type_entry === 'receivable_account') {
          values.receivableAccount -= amount
          return values
        }
        return values
      },
      {monthIncome: 0, fixedIncome: 0, receivableAccount: 0, entries: []},
    )
    yield put(actionObject(GET_INCOMES_ASYNC, dashboardValues))
  } catch (error) {
    debugLog(error, 'an error happend get incomes async')
  }
}

function* getFixedIncomesAsync(): any {
  try {
    const outcomes = yield call(getFixedIncomesQuery)
    const categories = yield call(getIncomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')
    yield put(actionObject(GET_FIXED_INCOMES_ASYNC, orderMix))
  } catch (error) {
    debugLog(error, 'an error happend get fixed incomes async')
  }
}

function* getFixedIncomeAsync({payload}: any): any {
  try {
    const outcome = yield call(getFixedIncomeQuery, payload)
    yield put(actionObject(GET_FIXED_INCOME_ASYNC, outcome))
  } catch (error) {
    debugLog(error, 'an error happend get fixed income async')
  }
}

function* updateFixedIncomeAsync({payload}: any): any {
  try {
    yield call(updateEntryQuery, payload?.id, {
      account: payload?.account,
      payment_type: 'fixed_incomes',
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'income',
      comment: payload?.comment || '',
      emissor: payload?.receiver_name || '',
      email: payload?.email || '',
      phone: payload?.phonenumber || '',
      date: (payload?.date || new Date())?.getTime(),
      frecuency_type: payload?.frecuency_type || '',
      frecuency_time: payload?.frecuency_time || '',
    })

    const outcomes = yield call(getFixedIncomesQuery)
    const categories = yield call(getIncomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    const item = yield call(getFixedIncomeQuery, payload?.id)

    yield put(
      actionObject(UPDATE_FIXED_INCOME_ASYNC, {
        itemsFixed: orderMix,
        item: item,
      }),
    )
    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update fixes incomes async')
  }
}

function* updateCategoryIncomeAsync({payload}: any): any {
  try {
    yield call(
      updateCategoryQuery,
      {
        name: payload?.concept,
        comment: payload?.comment || '',
      },
      payload?.id,
    )
    const {prices} = yield select(selectIntermitence)
    const {user} = yield select(selectAccount)

    const outcomes = yield call(getFixedIncomesQuery)
    const categories = yield call(getIncomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')
    const category = yield call(getCategoryQuery, payload?.id, prices, user)

    yield put(
      actionObject(CREATE_INCOME_CATEGORY_ASYNC, {
        itemsFixed: orderMix,
        item: category,
      }),
    )
    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update category income async')
  }
}

function* deleteCategoryIncomeAsync({payload}: any): any {
  try {
    yield call(deleteCategoryQuery, payload)

    const outcomes = yield call(getFixedIncomesQuery)
    const categories = yield call(getIncomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(DELETE_INCOME_ASYNC, {
        itemsFixed: orderMix,
        item: {},
      }),
    )

    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete category income async')
  }
}

function* deleteIncomeAsync({payload}: any): any {
  try {
    yield call(deleteEntryQuery, payload)

    const outcomes = yield call(getFixedIncomesQuery)
    const categories = yield call(getIncomeCategoriesQuery)
    const mix = [...outcomes, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(DELETE_INCOME_ASYNC, {
        itemsFixed: orderMix,
        item: {},
      }),
    )

    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete incomes')
  }
}

function* getCategoryIncomeASync({payload}: any): any {
  try {
    const {prices} = yield select(selectIntermitence)
    const {user} = yield select(selectAccount)
    const category = yield call(getCategoryQuery, payload, prices, user)
    yield put(actionObject(GET_CATEGORY_INCOME_ASYNC, category))
  } catch (error) {
    debugLog(error, 'an error happend get category incomes async')
  }
}

function* createReceivableAccountAsync({payload}: any): any {
  try {
    const {prices} = yield select(selectIntermitence)
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

    yield call(
      createEntryQuery,
      {
        account: payload?.account || '',
        payment_type: 'receivable_account',
        category_id: payload?.category_id,
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'income',
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
      getReceivableAccountsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    yield put(
      actionObject(CREATE_RECEIVABLE_ACCOUNT_ASYNC, {
        itemsReceivableAccounts: outcomes,
      }),
    )

    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create receivable account async')
  }
}

function* createReceivableAccountEntryAsync({payload}: any): any {
  try {
    const newDate = new Date()

    const {prices} = yield select(selectIntermitence)
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
    yield call(
      createEntryQuery,
      {
        account: payload?.account,
        payment_type: 'general',
        category_id: payload?.category_id,
        amount: payload?.amount,
        payment_concept: payload?.concept,
        entry_type: 'income',
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
      getReceivableAccountsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    const item = yield call(
      getReceivableAccountQuery,
      payload?.id,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    yield put(
      actionObject(CREATE_RECEIVABLE_ACCOUNT_ENTRY_ASYNC, {
        itemsReceivableAccounts: outcomes,
        item: item,
      }),
    )

    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create receivable account query')
  }
}

function* getReceivableAccountsAsync(): any {
  try {
    const {prices} = yield select(selectIntermitence)
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const outcomes = yield call(
      getReceivableAccountsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )
    yield put(actionObject(GET_RECEIVABLE_ACCOUNTS_ASYNC, outcomes))
  } catch (error) {
    debugLog(error, 'an error happend getting receivable account query')
  }
}

function* getReceivableAccountAsync({payload}: any): any {
  try {
    const {prices} = yield select(selectIntermitence)
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const outcome = yield call(
      getReceivableAccountQuery,
      payload,
      currencies,
      user?.currency_id,
      prices,
      user,
    )
    yield put(actionObject(GET_RECEIVABLE_ACCOUNT_ASYNC, outcome))
  } catch (error) {
    debugLog(error, 'an error happend getting a receivable account async')
  }
}

function* updateReceivableAccountAsync({payload}: any): any {
  try {
    const {prices} = yield select(selectIntermitence)
    yield call(updateEntryQuery, payload?.id, {
      account: payload?.account,
      payment_type: 'receivable_account',
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'income',
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

    const outcomes = yield call(
      getReceivableAccountsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    const item = yield call(
      getReceivableAccountQuery,
      payload?.id,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    yield put(
      actionObject(UPDATE_RECEIVABLE_ACCOUNT_ASYNC, {
        itemsReceivableAccounts: outcomes,
        item: item,
      }),
    )
    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update a recevable account async')
  }
}

function* deleteReceivableAccountAsync({payload}: any): any {
  try {
    const {prices} = yield select(selectIntermitence)
    yield call(deleteEntryQuery, payload)

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const outcomes = yield call(
      getReceivableAccountsQuery,
      currencies,
      user?.currency_id,
      prices,
      user,
    )

    yield put(
      actionObject(DELETE_RECEIVABLE_ACCOUNT_ASYNC, {
        itemsReceivableAccounts: outcomes,
        item: {},
      }),
    )

    yield put(getIncomes())
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete a receivable account async')
  }
}

export function* watchCreateIncome() {
  yield takeLatest(CREATE_INCOME, createIncomeAsync)
}

export function* watchGetIncomes() {
  yield takeLatest(GET_INCOMES, getIncomesAsync)
}

export function* watchCreateFixedIncomes() {
  yield takeLatest(CREATE_FIXED_INCOMES, createFixedIncomesAsync)
}

export function* watchCreateIncomeCategory() {
  yield takeLatest(CREATE_INCOME_CATEGORY, createIncomeCategoryAsync)
}

export function* watchGetFixedIncomes() {
  yield takeLatest(GET_FIXED_INCOMES, getFixedIncomesAsync)
}

export function* watchGetFixedIncome() {
  yield takeLatest(GET_FIXED_INCOME, getFixedIncomeAsync)
}

export function* watchUpdateFixedIncome() {
  yield takeLatest(UPDATE_FIXED_INCOME, updateFixedIncomeAsync)
}

export function* watchDeleteIncome() {
  yield takeLatest(DELETE_INCOME, deleteIncomeAsync)
}

export function* watchGetCategoryIncome() {
  yield takeLatest(GET_CATEGORY_INCOME, getCategoryIncomeASync)
}

export function* watchUpdateCategoryIncome() {
  yield takeLatest(UPDATE_CATEGORY_INCOME, updateCategoryIncomeAsync)
}

export function* watchDeleteCategoryIncome() {
  yield takeLatest(DELETE_CATEGORY_INCOME, deleteCategoryIncomeAsync)
}

export function* watchGetReceivableAccounts() {
  yield takeLatest(GET_RECEIVABLE_ACCOUNTS, getReceivableAccountsAsync)
}

export function* watchGetReceivableAccount() {
  yield takeLatest(GET_RECEIVABLE_ACCOUNT, getReceivableAccountAsync)
}

export function* watchUpdateReceivableAccount() {
  yield takeLatest(UPDATE_RECEIVABLE_ACCOUNT, updateReceivableAccountAsync)
}

export function* watchDeleteReceivableAccount() {
  yield takeLatest(DELETE_RECEIVABLE_ACCOUNT, deleteReceivableAccountAsync)
}

export function* watchCreateReceivableAccount() {
  yield takeLatest(CREATE_RECEIVABLE_ACCOUNT, createReceivableAccountAsync)
}

export function* watchCreateReceivableAccountEntry() {
  yield takeLatest(
    CREATE_RECEIVABLE_ACCOUNT_ENTRY,
    createReceivableAccountEntryAsync,
  )
}
