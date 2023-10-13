import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
  GET_DASHBOARD_VALUES,
  GET_DASHBOARD_VALUES_ASYNC,
  GET_TOTAL_BALANCE,
  GET_TOTAL_BALANCE_ASYNC,
  SIGNIN,
  SIGNIN_ASYNC,
} from './action-types'
import {actionObject, getEntriesQuery, getUserQuery, operateChange} from 'utils'
import {selectCurrency} from 'store/selector'

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

export function* watchSignIn() {
  yield takeLatest(SIGNIN, signInAsync)
}

export function* watchGetTotalBalance() {
  yield takeLatest(GET_TOTAL_BALANCE, getTotalBalanceAsync)
}

export function* watchGetDashboardValues() {
  yield takeLatest(GET_DASHBOARD_VALUES, getDashboardValues)
}
