import {call, put, select, takeLatest} from 'redux-saga/effects'
import {actionObject, getCurrenciesQuery, getExchangeValues} from 'utils'
import {selectAccount, selectCurrency} from '../selector'
import {
  GET_CURRENCIES,
  GET_CURRENCIES_ASYNC,
  GET_CURRENCY_PRICE,
  GET_CURRENCY_PRICE_ASYNC,
} from './action-types'

function* getCurrenciesAsync(): any {
  try {
    const currencies = yield call(getCurrenciesQuery)
    yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
  } catch (error) {
    console.log('error getting currencies', error)
  }
}

function* getDefaultPriceAsync(): any {
  try {
    const {user} = yield select(selectAccount)
    let {currencies} = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const prices = yield call(getExchangeValues, currencies, user?.currency_id)

    yield put(actionObject(GET_CURRENCY_PRICE_ASYNC, prices))
  } catch (error) {
    console.log(error)
  }
}

export function* watchGetCurrencies() {
  yield takeLatest(GET_CURRENCIES, getCurrenciesAsync)
}
export function* watchGetDefaultPrice() {
  yield takeLatest(GET_CURRENCY_PRICE, getDefaultPriceAsync)
}
