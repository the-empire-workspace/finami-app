import {debugLog} from 'utils'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
  CREATE_CRYPTO_ACCOUNT,
  CREATE_CURRENCY_ACCOUNT,
  CREATE_CURRENCY_ACCOUNT_ASYNC,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ASYNC,
  DELETE_ENTRY,
  DELETE_ENTRY_ASYNC,
  DELETE_SINGLE_ACCOUNT,
  DELETE_SINGLE_ACCOUNT_ASYNC,
  EDIT_ENTRY,
  EDIT_ENTRY_ASYNC,
  GET_ACCOUNT,
  GET_ACCOUNTS,
  GET_ACCOUNTS_ASYNC,
  GET_ACCOUNT_ASYNC,
  GET_DASHBOARD_VALUES,
  GET_DASHBOARD_VALUES_ASYNC,
  GET_ITEM,
  GET_ITEM_ASYNC,
  GET_TOTAL_BALANCE,
  GET_TOTAL_BALANCE_ASYNC,
  SEND_COMMENTS,
  SIGNIN,
  SIGNIN_ASYNC,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_ASYNC,
  UPDATE_POSTPONE_ENTRY,
  UPDATE_POSTPONE_ENTRY_ASYNC,
  UPDATE_SINGLE_ACCOUNT,
  UPDATE_SINGLE_ACCOUNT_ASYNC,
  UPDATE_STATUS_ENTRY,
  UPDATE_STATUS_ENTRY_ASYNC,
  UPDATE_USER,
  UPDATE_USER_ASYNC,
} from './action-types'
import {
  FetchService,
  TruncateTables,
  actionObject,
  createAccountQuery,
  createEntryQuery,
  createOrUpdateCurrencyQuery,
  deleteAccountEntryQuery,
  deleteAccountQuery,
  deleteEntryQuery,
  getAccountQuery,
  getAccountsQuery,
  getBalancesMoralis,
  getCurrenciesQuery,
  getEntriesQuery,
  getEntry,
  getLastDate,
  getUserQuery,
  operateChange,
  updateAccountQuery,
  updateEntryQuery,
  updatePostponeEntryQuery,
  updateStatusEntryQuery,
  updateUserQuery,
} from 'utils'
import {selectAccount, selectCurrency, selectIntermitence} from 'store/selector'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'
import {getDashboardValues, getTotalBalance} from './action'
import {
  getDebt,
  getDebts,
  getEntriesGoals,
  getGoal,
  getIncomes,
  getOutcomes,
  getReceivableAccount,
  getReceivableAccounts,
} from 'store/actions'

function* signInAsync(): any {
  try {
    const user = yield call(getUserQuery)
    if (user) yield put(actionObject(SIGNIN_ASYNC, user))
  } catch (error) {
    debugLog('error signing in user', error)
  }
}

function* updateLanguageAsync({payload}: any): any {
  try {
    const {user} = yield select(selectAccount)
    yield call(updateUserQuery, {...user, language: payload})
    yield put(actionObject(UPDATE_LANGUAGE_ASYNC, payload))
  } catch (error) {
    debugLog(error, 'an error happend update language async')
  }
}

function* updateUserAsync({payload}: any): any {
  try {
    const {user} = yield select(selectAccount)
    yield call(updateUserQuery, {
      ...user,
      currency_id: payload.principal_currency,
      ...payload,
    })
    const updateUser = yield call(getUserQuery)
    yield put(actionObject(UPDATE_USER_ASYNC, updateUser))

    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getIncomes())
    yield put(getOutcomes())
    yield put(getDebts())
    yield put(getReceivableAccounts())
    yield put(getEntriesGoals('desire'))
    yield put(getEntriesGoals('compromise'))
  } catch (error) {
    debugLog(error, 'an error happend update user async')
  }
}

function* getTotalBalanceAsync(): any {
  try {
    const {defaultPrices} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)
    const entries = yield call(getEntriesQuery)
    const totalBalance = entries?.reduce((total: any, entry: any) => {
      const change = entry?.prices
        ? JSON.parse(entry?.prices)[String(user?.currency_id)]
        : defaultPrices[String(entry?.currency_id)]
      if (entry?.prices && change)
        change.op = change.op === 'divide' ? 'multiply' : 'divide'

      const amount = change
        ? operateChange(change?.op, change?.value, entry.amount)
        : entry.amount
      if (entry.entry_type === 'income' && entry?.status !== 'pending') {
        total += amount
        return total
      }
      if (entry?.status !== 'pending') total -= amount

      return total
    }, 0)
    yield put(actionObject(GET_TOTAL_BALANCE_ASYNC, totalBalance))
  } catch (error) {
    debugLog(error, 'an error happend total balance async')
  }
}

function* getDashboardValuesAsync(): any {
  try {
    const {defaultPrices} = yield select(selectCurrency)
    const entries = yield call(getEntriesQuery)
    const now = new Date()
    const {user} = yield select(selectAccount)
    const dashboardValues = entries?.reduce(
      (values: any, entry: any) => {
        const change = entry?.prices
          ? JSON.parse(entry?.prices)[String(user?.currency_id)]
          : defaultPrices[String(entry?.currency_id)]
        if (entry?.prices && change)
          change.op = change.op === 'divide' ? 'multiply' : 'divide'

        const amount = change
          ? operateChange(change?.op, change?.value, entry.amount)
          : entry.amount

        values.entries.push(entry)
        const actualDate = new Date(entry?.date)
        if (
          entry.entry_type === 'income' &&
          actualDate?.getMonth() === now?.getMonth() &&
          entry?.status !== 'pending'
        ) {
          values.monthIncome += amount
          return values
        }
        if (
          entry.entry_type === 'expense' &&
          actualDate?.getMonth() === now?.getMonth() &&
          entry?.status !== 'pending'
        ) {
          values.monthExpenses += amount
          return values
        }
        if (entry?.status !== 'pending') values.monthProjected += amount

        return values
      },
      {monthIncome: 0, monthExpenses: 0, monthProjected: 0, entries: []},
    )

    yield put(actionObject(GET_DASHBOARD_VALUES_ASYNC, dashboardValues))
  } catch (error) {
    debugLog(error, 'an error happend dashboard values')
  }
}

export function* getItemAsync({payload}: any): any {
  try {
    const item = yield call(getEntry, payload)
    yield put(actionObject(GET_ITEM_ASYNC, item))
  } catch (error) {
    debugLog(error, 'an error happend get item async')
  }
}

export function* getAccountsAsync(): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)

    const accounts = yield call(getAccountsQuery, currencies, prices, user)
    yield put(actionObject(GET_ACCOUNTS_ASYNC, accounts))
  } catch (error) {
    debugLog(error, 'an error happend get accounts async')
  }
}

export function* getAccountAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)
    const account = yield call(
      getAccountQuery,
      currencies,
      payload,
      prices,
      user,
    )
    yield put(actionObject(GET_ACCOUNT_ASYNC, account))
  } catch (error) {
    debugLog(error, 'an error happend get account async')
  }
}

export function* createCryptoAccountAsync({payload}: any): any {
  try {
    const balances = yield call(
      getBalancesMoralis,
      payload?.address,
      payload?.netId,
    )

    for (const balance of balances)
      if (!balance?.token?.possibleSpam) {
        const currencyData = {
          symbol: balance?.token?.symbol,
          name: balance?.token?.symbol,
          type: 'CRYPTO',
          decimal: balance?.token?.decimals,
          image: balance?.token?.image || '',
          address: balance?.token?.contractAddress?.lowercase || '',
          network: payload?.netId,
        }

        const currency = yield call(createOrUpdateCurrencyQuery, currencyData)

        const newAddress = {
          available_balance: balance?.value,
          account_currency: currency?.id,
          account_name: payload?.account_name,
          account_number: payload?.address,
          account_type: payload?.account_type,
          organization: payload?.netId,
          comments: payload?.comments,
        }

        yield put(actionObject(CREATE_CURRENCY_ACCOUNT, newAddress))
        yield put(getDashboardValues())
        yield put(getTotalBalance())
      }
  } catch (error) {
    debugLog(error, 'an error happend create crypto account async')
  }
}

export function* createCurrencyAccountAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {prices} = yield select(selectIntermitence)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const user = yield call(getUserQuery)
    const account = yield call(createAccountQuery, {user: user.id, ...payload})
    if (Number(payload?.available_balance))
      yield call(
        createEntryQuery,
        {
          account: account?.id,
          payment_type: 'general',
          amount: payload?.available_balance,
          payment_concept: `${payload?.concept} - ${payload?.account_name}`,
          entry_type: 'income',
          comment: '',
          emissor: '',
          email: '',
          phone: '',
          date: new Date()?.getTime(),
        },
        currencies,
        prices,
      )

    const accounts = yield call(getAccountsQuery, currencies, prices, user)
    yield put(actionObject(CREATE_CURRENCY_ACCOUNT_ASYNC, accounts))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend create currency account async')
  }
}

export function* updateAccountAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const user = yield call(getUserQuery)
    yield call(updateAccountQuery, {user: user.id, ...payload})

    const {prices} = yield select(selectIntermitence)
    const account = yield call(
      getAccountQuery,
      currencies,
      payload?.id,
      prices,
      user,
    )
    const accounts = yield call(getAccountsQuery, currencies, prices, user)
    yield put(actionObject(UPDATE_SINGLE_ACCOUNT_ASYNC, {accounts, account}))
  } catch (error) {
    debugLog(error, 'an error happend update account async')
  }
}

export function* deleteSingleAccountAsync({payload}: any): any {
  try {
    yield call(deleteAccountEntryQuery, payload)
    yield call(deleteAccountQuery, payload)

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const {prices} = yield select(selectIntermitence)
    const accounts = yield call(getAccountsQuery, currencies, prices, user)
    yield put(actionObject(DELETE_SINGLE_ACCOUNT_ASYNC, accounts))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete single account async')
  }
}

export function* deleteAccountAsync({payload}: any): any {
  try {
    const user = yield call(getUserQuery)
    if (
      user?.username?.replaceAll(' ', '') ===
      payload?.username?.replaceAll(' ', '')
    ) {
      yield call(TruncateTables)
      yield put(actionObject(DELETE_ACCOUNT_ASYNC, payload))
    }
  } catch (error) {
    debugLog(error, 'an error happend delete account async')
  }
}

function* deleteEntryAsync({payload}: any): any {
  try {
    const entry = yield call(getEntry, payload)
    const updates: any = {
      compromise: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      desire: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      debt: {
        all: getDebts,
        entry: getDebt,
        type: getOutcomes,
      },
      receivable_account: {
        all: getReceivableAccounts,
        entry: getReceivableAccount,
        type: getIncomes,
      },
      income: {
        all: getIncomes,
      },
      expense: {
        all: getOutcomes,
      },
    }
    yield call(deleteEntryQuery, payload)
    yield put(actionObject(DELETE_ENTRY_ASYNC))
    const toUpdate = updates[entry?.type || entry?.entry_type]
    if (toUpdate) {
      yield put(
        entry?.type === 'compromise' || entry?.type === 'desire'
          ? toUpdate?.all(entry?.type)
          : toUpdate?.all(),
      )
      if (entry?.entry_id) yield put(toUpdate?.entry(entry?.entry_id))
      if (toUpdate?.type) yield put(toUpdate?.type())
    }
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend delete entry async')
  }
}

function* editEntryAsync({payload}: any): any {
  try {
    yield call(updateEntryQuery, payload?.id, {
      account: payload?.account,
      payment_type: 'general',
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: payload?.entry_type,
      comment: payload?.comments || '',
      emissor: payload?.receiver_name || '',
      email: payload?.email || '',
      phone: payload?.phonenumber || '',
      entry_id: payload?.entry_id || null,
      date: (payload?.date || new Date())?.getTime(),
    })
    const updates: any = {
      compromise: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      desire: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      debt: {
        all: getDebts,
        entry: getDebt,
        type: getOutcomes,
      },
      receivable_account: {
        all: getReceivableAccounts,
        entry: getReceivableAccount,
        type: getIncomes,
      },
      income: {
        all: getIncomes,
      },
      expense: {
        all: getOutcomes,
      },
    }
    const entry = yield call(getEntry, payload?.id)
    yield put(actionObject(EDIT_ENTRY_ASYNC, entry))

    const toUpdate = updates[entry?.type || entry?.entry_type]
    if (toUpdate) {
      yield put(
        entry?.type === 'compromise' || entry?.type === 'desire'
          ? toUpdate?.all(entry?.type)
          : toUpdate?.all(),
      )
      if (entry?.entry_id && toUpdate?.entry)
        yield put(toUpdate?.entry(entry?.entry_id))
      if (toUpdate?.type) yield put(toUpdate?.type())
    }
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend edit entry async')
  }
}

function* updatePostponeEntryAsync({payload}: any): any {
  try {
    yield call(updatePostponeEntryQuery, payload?.id, {
      date: (payload?.date || new Date())?.getTime(),
    })
    const updates: any = {
      compromise: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      desire: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      debt: {
        all: getDebts,
        entry: getDebt,
        type: getOutcomes,
      },
      receivable_account: {
        all: getReceivableAccounts,
        entry: getReceivableAccount,
        type: getIncomes,
      },
      income: {
        all: getIncomes,
      },
      expense: {
        all: getOutcomes,
      },
    }
    const entry = yield call(getEntry, payload?.id)
    yield put(actionObject(UPDATE_POSTPONE_ENTRY_ASYNC, entry))

    const toUpdate = updates[entry?.type || entry?.entry_type]
    if (toUpdate) {
      yield put(
        entry?.type === 'compromise' || entry?.type === 'desire'
          ? toUpdate?.all(entry?.type)
          : toUpdate?.all(),
      )
      if (entry?.entry_id && toUpdate?.entry)
        yield put(toUpdate?.entry(entry?.entry_id))
      if (toUpdate?.type) yield put(toUpdate?.type())
    }
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update postpone entry async')
  }
}

function* updateStatusEntryAsync({payload}: any): any {
  try {
    yield call(updateStatusEntryQuery, payload?.id, {
      account: payload?.account,
      amount: payload?.amount,
      date: (payload?.date || new Date())?.getTime(),
    })
    const updates: any = {
      compromise: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      desire: {
        all: getEntriesGoals,
        entry: getGoal,
      },
      debt: {
        all: getDebts,
        entry: getDebt,
        type: getOutcomes,
      },
      receivable_account: {
        all: getReceivableAccounts,
        entry: getReceivableAccount,
        type: getIncomes,
      },
      income: {
        all: getIncomes,
      },
      expense: {
        all: getOutcomes,
      },
    }
    const entry = yield call(getEntry, payload?.id)
    yield put(actionObject(UPDATE_STATUS_ENTRY_ASYNC, entry))
    let {currencies} = yield select(selectCurrency)
    const {prices} = yield select(selectIntermitence)
    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    if (entry?.type === 'fixed_incomes' || entry?.type === 'basic_expenses') {
      const mainEntry = yield call(getEntry, entry?.entry_id)
      const newEntry = {...entry}
      newEntry.status = 'pending'
      newEntry.date = getLastDate(mainEntry, entry).getTime()
      yield call(createEntryQuery, newEntry, currencies, prices)
    }
    const toUpdate = updates[entry?.type || entry?.entry_type]
    if (toUpdate) {
      yield put(
        entry?.type === 'compromise' || entry?.type === 'desire'
          ? toUpdate?.all(entry?.type)
          : toUpdate?.all(),
      )
      if (entry?.entry_id && toUpdate?.entry)
        yield put(toUpdate?.entry(entry?.entry_id))

      if (toUpdate?.type) yield put(toUpdate?.type())
    }
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    debugLog(error, 'an error happend update status entry async')
  }
}

function* sendCommentsAsync({payload}: any): any {
  try {
    yield call(
      FetchService,
      'https://api.finami.app/api/comments',
      'POST',
      payload,
    )
  } catch (error) {
    debugLog(error, 'an error happend send comments async')
  }
}
export function* watchSignIn() {
  yield takeLatest(SIGNIN, signInAsync)
}

export function* watchUpdateLanguage() {
  yield takeLatest(UPDATE_LANGUAGE, updateLanguageAsync)
}

export function* watchGetTotalBalance() {
  yield takeLatest(GET_TOTAL_BALANCE, getTotalBalanceAsync)
}

export function* watchGetDashboardValues() {
  yield takeLatest(GET_DASHBOARD_VALUES, getDashboardValuesAsync)
}

export function* watchGetItem() {
  yield takeLatest(GET_ITEM, getItemAsync)
}

export function* watchGetAccounts() {
  yield takeLatest(GET_ACCOUNTS, getAccountsAsync)
}

export function* watchCreateCryptoAccount() {
  yield takeLatest(CREATE_CRYPTO_ACCOUNT, createCryptoAccountAsync)
}
export function* watchCreateCurrencyAccount() {
  yield takeLatest(CREATE_CURRENCY_ACCOUNT, createCurrencyAccountAsync)
}

export function* watchGetAccount() {
  yield takeLatest(GET_ACCOUNT, getAccountAsync)
}

export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountAsync)
}

export function* watchDeleteSingleAccount() {
  yield takeLatest(DELETE_SINGLE_ACCOUNT, deleteSingleAccountAsync)
}

export function* watchUpdateSingleAccount() {
  yield takeLatest(UPDATE_SINGLE_ACCOUNT, updateAccountAsync)
}

export function* watchDeleteEntry() {
  yield takeLatest(DELETE_ENTRY, deleteEntryAsync)
}

export function* watchEditEntry() {
  yield takeLatest(EDIT_ENTRY, editEntryAsync)
}

export function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER, updateUserAsync)
}

export function* watchSendComments() {
  yield takeLatest(SEND_COMMENTS, sendCommentsAsync)
}
export function* watchUpdatePostponeEntry() {
  yield takeLatest(UPDATE_POSTPONE_ENTRY, updatePostponeEntryAsync)
}

export function* watchUpdateStatusEntry() {
  yield takeLatest(UPDATE_STATUS_ENTRY, updateStatusEntryAsync)
}
