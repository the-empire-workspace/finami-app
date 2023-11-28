import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
  CREATE_CRYPTO_ACCOUNT,
  CREATE_CURRENCY_ACCOUNT,
  CREATE_CURRENCY_ACCOUNT_ASYNC,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ASYNC,
  DELETE_SINGLE_ACCOUNT,
  DELETE_SINGLE_ACCOUNT_ASYNC,
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
  SIGNIN,
  SIGNIN_ASYNC,
  UPDATE_SINGLE_ACCOUNT,
  UPDATE_SINGLE_ACCOUNT_ASYNC,
} from './action-types'
import {
  TruncateTables,
  actionObject,
  createAccountQuery,
  createEntryQuery,
  createOrUpdateCurrencyQuery,
  deleteAccountEntryQuery,
  deleteAccountQuery,
  getAccountQuery,
  getAccountsQuery,
  getBalancesMoralis,
  getCurrenciesQuery,
  getEntriesQuery,
  getEntry,
  getUserQuery,
  operateChange,
  updateAccountQuery,
} from 'utils'
import {selectCurrency} from 'store/selector'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'

function* signInAsync(): any {
  try {
    const user = yield call(getUserQuery)
    if (user) yield put(actionObject(SIGNIN_ASYNC, user))
  } catch (error) {
    console.log('error signing in user', error)
  }
}

function* getTotalBalanceAsync(): any {
  try {
    const {defaultPrices} = yield select(selectCurrency)
    const entries = yield call(getEntriesQuery)
    const totalBalance = entries?.reduce((total: any, entry: any) => {
      const change = defaultPrices[String(entry?.currency_id)]
      const amount = change
        ? operateChange(change?.op, change?.value, entry.amount)
        : entry.amount
      if (entry.entry_type === 'income') {
        total += amount
        return total
      }
      total -= amount
      return total
    }, 0)
    yield put(actionObject(GET_TOTAL_BALANCE_ASYNC, totalBalance))
  } catch (error) {
    console.log(error)
  }
}

function* getDashboardValues(): any {
  try {
    const {defaultPrices} = yield select(selectCurrency)
    const entries = yield call(getEntriesQuery)
    const dashboardValues = entries?.reduce(
      (values: any, entry: any) => {
        const change = defaultPrices[String(entry?.currency_id)]
        const amount = change
          ? operateChange(change?.op, change?.value, entry.amount)
          : entry.amount
        values.entries.push(entry)
        if (entry.entry_type === 'income') {
          values.monthIncome += amount
          return values
        }
        if (entry.entry_type === 'expense') {
          values.monthExpenses += amount
          return values
        }
        values.monthProjected += amount
        return values
      },
      {monthIncome: 0, monthExpenses: 0, monthProjected: 0, entries: []},
    )

    yield put(actionObject(GET_DASHBOARD_VALUES_ASYNC, dashboardValues))
  } catch (error) {
    console.log(error)
  }
}

export function* getItemAsync({payload}: any): any {
  try {
    const item = yield call(getEntry, payload)
    yield put(actionObject(GET_ITEM_ASYNC, item))
  } catch (error) {
    console.log(error)
  }
}

export function* getAccountsAsync(): any {
  try {
    let {currencies} = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const accounts = yield call(getAccountsQuery, currencies)
    yield put(actionObject(GET_ACCOUNTS_ASYNC, accounts))
  } catch (error) {
    console.log(error)
  }
}

export function* getAccountAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const account = yield call(getAccountQuery, currencies, payload)
    yield put(actionObject(GET_ACCOUNT_ASYNC, account))
  } catch (error) {
    console.log(error)
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
      }
  } catch (error) {
    console.log(error)
  }
}

export function* createCurrencyAccountAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const user = yield call(getUserQuery)
    const account = yield call(createAccountQuery, {user: user.id, ...payload})
    if (Number(payload?.available_balance))
      yield call(createEntryQuery, {
        account: account?.id,
        payment_type: 'general',
        amount: payload?.available_balance,
        payment_concept: 'initial',
        entry_type: 'income',
        comment: '',
        emissor: '',
        email: '',
        phone: '',
        date: new Date()?.getTime(),
      })
    const accounts = yield call(getAccountsQuery, currencies)
    yield put(actionObject(CREATE_CURRENCY_ACCOUNT_ASYNC, accounts))
    yield put(getDashboardValues())
  } catch (error) {
    console.log(error)
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
    const accounts = yield call(getAccountsQuery, currencies)
    yield put(actionObject(UPDATE_SINGLE_ACCOUNT_ASYNC, accounts))
  } catch (error) {
    console.log(error)
  }
}

export function* deleteSingleAccountAsync({payload}: any): any {
  try {
    yield call(deleteAccountEntryQuery, payload)
    yield call(deleteAccountQuery, payload)

    let {currencies} = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const accounts = yield call(getAccountsQuery, currencies)
    yield put(actionObject(DELETE_SINGLE_ACCOUNT_ASYNC, accounts))
    yield put(getDashboardValues())
  } catch (error) {
    console.log(error)
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
    console.log(error)
  }
}
export function* watchSignIn() {
  yield takeLatest(SIGNIN, signInAsync)
}

export function* watchGetTotalBalance() {
  yield takeLatest(GET_TOTAL_BALANCE, getTotalBalanceAsync)
}

export function* watchGetDashboardValues() {
  yield takeLatest(GET_DASHBOARD_VALUES, getDashboardValues)
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
