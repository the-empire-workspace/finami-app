import { call, put, select, takeLatest } from 'redux-saga/effects'
import { actionObject, FetchService, getCurrenciesQuery, getEntriesQuery } from 'utils'
import { binanceAPI, ExchangeAPI } from 'utils/path'
import { selectAccount, selectCurrency } from '../selector'
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
    const { user } = yield select(selectAccount)
    let { currencies } = yield select(selectCurrency)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const defaultCurrency = currencies.find(
      (currency: any) => currency.id === user.currency_id,
    )
    const exchangeResult =
      defaultCurrency?.type === 'FIAT'
        ? yield call(
          FetchService,
          `${ExchangeAPI}latest/${defaultCurrency?.name}`,
        )
        : null
    const prices: any = {}

    for (const currency of currencies)
      if (defaultCurrency?.id !== currency?.id) {
        let price = { value: 0, op: 'none' }
        if (currency?.type === 'CRYPTO' || defaultCurrency?.type === 'CRYPTO') {
          const currencyPair =
            currency?.name === 'USD' ? `B${currency?.name}` : currency?.name
          const defaultCurrencyPair =
            defaultCurrency?.name === 'USD'
              ? `B${defaultCurrency?.name}`
              : defaultCurrency?.name
          try {
            const PAIR = `${defaultCurrencyPair}${currencyPair}`
            const result = yield call(
              FetchService,
              `${binanceAPI}avgPrice?symbol=${PAIR}`,
            )
            price = { value: result?.price, op: 'divide' }
          } catch (error) {
            const XPAIR = `${currencyPair}${defaultCurrencyPair}`
            const result = yield call(
              FetchService,
              `${binanceAPI}avgPrice?symbol=${XPAIR}`,
            )
            price = price = { value: result?.price, op: 'multiply' }
          }
        }

        if (currency?.type === 'FIAT' && exchangeResult)
          price = {
            value: exchangeResult.conversion_rates[currency.name],
            op: 'divide',
          }

        prices[currency?.id] = price
      }

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
