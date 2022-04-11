import { call, put, select, takeLatest } from "redux-saga/effects";
import { actionObject, FetchService } from "utils";
import { binanceAPI, ExchangeAPI } from "utils/path";
import { selectAccount, selectCurrency } from "../selector";
import { GET_CURRENCY_PRICE, GET_CURRENCY_PRICE_ASYNC } from "./action-types";

function* getDefaultPriceAsync() {
  const { user } = yield select(selectAccount)
  const { items: currencies } = yield select(selectCurrency)

  const defaultCurrency = currencies.find((currency: any) => currency.id === user.currency)
  const exchangeResult = (defaultCurrency.type === 'FIAT') ? yield call(FetchService, `${ExchangeAPI}latest/${defaultCurrency.name}`) : null
  const prices: any = {}
  
  for (const currency of currencies) {
    if (defaultCurrency.id !== currency.id) {
      let price = 0
      if (currency.type === 'CRYPTO' || defaultCurrency.type === 'CRYPTO') {

        const currencyPair = (currency.name === 'USD') ? `B${currency.name}` : currency.name
        const defaultCurrencyPair = (defaultCurrency.name === 'USD') ? `B${defaultCurrency.name}` : defaultCurrency.name
        try {
          const PAIR = `${defaultCurrencyPair}${currencyPair}`
          const result = yield call(FetchService, `${binanceAPI}avgPrice?symbol=${PAIR}`)
          price = result.price
        } catch (error) {
          const XPAIR = `${currencyPair}${defaultCurrencyPair}`
          const result = yield call(FetchService, `${binanceAPI}avgPrice?symbol=${XPAIR}`)
          price = result.price
        }
      }

      if (currency.type === 'FIAT' && exchangeResult) {
        price = exchangeResult['conversion_rates'][currency.name]
      }
      prices[currency.name] = price
    }
  }

  yield put(actionObject(GET_CURRENCY_PRICE_ASYNC, prices))

}

export function* watchGetDefaultPrice() {
  yield takeLatest(GET_CURRENCY_PRICE, getDefaultPriceAsync)
}