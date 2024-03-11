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
    let {currencies, defaultPrices} = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const date = new Date()
    date.setHours(0, 0, 0, 0)
    if (
      !defaultPrices?.date ||
      defaultPrices?.date !== date.getTime() ||
      user?.currency_id !== defaultPrices?.id
    ) {
      const prices = yield call(
        getExchangeValues,
        currencies,
        user?.currency_id,
      )
      if (prices)
        yield put(
          actionObject(GET_CURRENCY_PRICE_ASYNC, {
            ...prices,
            date: date.getTime(),
            id: user?.currency_id,
          }),
        )
    }
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
