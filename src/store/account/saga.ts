import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  CREATE_CRYPTO_ACCOUNT,
  CREATE_CURRENCY_ACCOUNT,
  CREATE_CURRENCY_ACCOUNT_ASYNC,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ASYNC,
  GET_ACCOUNTS,
  GET_ACCOUNTS_ASYNC,
  GET_DASHBOARD_VALUES,
  GET_DASHBOARD_VALUES_ASYNC,
  GET_ITEM,
  GET_ITEM_ASYNC,
  GET_TOTAL_BALANCE,
  GET_TOTAL_BALANCE_ASYNC,
  SIGNIN,
  SIGNIN_ASYNC,
} from './action-types'
import {
  TruncateTables,
  actionObject,
  chainConnection,
  createAccountQuery,
  createEntryQuery,
  getAccountsQuery,
  getBalancesMoralis,
  getEntriesQuery,
  getEntry,
  getUserQuery,
  operateChange,
} from 'utils'
import { selectCurrency } from 'store/selector'
import { formatEther } from 'viem'

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
    const { defaultPrices } = yield select(selectCurrency)
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
    const { defaultPrices } = yield select(selectCurrency)
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
      { monthIncome: 0, monthExpenses: 0, monthProjected: 0, entries: [] },
    )

    yield put(actionObject(GET_DASHBOARD_VALUES_ASYNC, dashboardValues))
  } catch (error) {
    console.log(error)
  }
}

export function* getItemAsync({ payload }: any): any {
  try {
    const item = yield call(getEntry, payload)
    yield put(actionObject(GET_ITEM_ASYNC, item))
  } catch (error) {
    console.log(error)
  }
}

export function* getAccountsAsync(): any {
  try {
    const accounts = yield call(getAccountsQuery)
    yield put(actionObject(GET_ACCOUNTS_ASYNC, accounts))
  } catch (error) {
    console.log(error)
  }
}

export function* createCryptoAccountAsync({ payload }: any): any {
  try {
    const balances = yield call(getBalancesMoralis, payload?.address, payload?.netId)
   
    for (const balance of balances) {
      
    }
    /* const accounts = yield call(createAccountQuery, { user: 1, account_currency: 1, account_name: 'crypto wallet', })
    yield put(actionObject(CREATE_CRYPTO_ACCOUNT_ASYNC, accounts)) */
  } catch (error) {
    console.log(error)
  }
}

export function* createCurrencyAccountAsync({ payload }: any): any {
  try {
    const user = yield call(getUserQuery)
    const account = yield call(createAccountQuery, { user: user.id, ...payload })
    if (Number(payload?.available_balance)) yield call(createEntryQuery, {
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
    const accounts = yield call(getAccountsQuery)
    yield put(actionObject(CREATE_CURRENCY_ACCOUNT_ASYNC, accounts))
  } catch (error) {
    console.log(error)
  }
}

export function* deleteAccountAsync({ payload }: any): any {
  try {
    const user = yield call(getUserQuery)
    if (user?.username?.replaceAll(' ', '') === payload?.username?.replaceAll(' ', '')) {
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

export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountAsync)
}