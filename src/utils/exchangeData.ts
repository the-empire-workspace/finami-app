import {FetchService, actionObject} from 'utils'
import {ExchangeAPI, binanceAPI} from './path'
import {call, put} from 'redux-saga/effects'
import {SET_PRICE} from 'store/intermitence/action-types'

export const getExchangeValues = async (
  currencies: any[],
  currency_id: any,
) => {
  try {
    const defaultCurrency = currencies.find(
      (currency: any) => currency.id === currency_id,
    )
    const exchangeResult =
      defaultCurrency?.type === 'FIAT'
        ? await FetchService(`${ExchangeAPI}latest/${defaultCurrency?.name}`)
        : null

    const prices: any = {}
    for (const currency of currencies)
      if (defaultCurrency?.id !== currency?.id) {
        let price = {value: 0, op: 'none'}
        if (currency?.type === 'CRYPTO' || defaultCurrency?.type === 'CRYPTO') {
          const currencyPair =
            currency?.name === 'USD' ? `B${currency?.name}` : currency?.name
          const defaultCurrencyPair =
            defaultCurrency?.name === 'USD'
              ? `B${defaultCurrency?.name}`
              : defaultCurrency?.name
          try {
            const PAIR = `${defaultCurrencyPair}${currencyPair}`
            const result = await FetchService(
              `${binanceAPI}avgPrice?symbol=${PAIR}`,
            )
            price = {value: result?.price, op: 'divide'}
          } catch (error) {
            const XPAIR = `${currencyPair}${defaultCurrencyPair}`
            const result = await FetchService(
              `${binanceAPI}avgPrice?symbol=${XPAIR}`,
            )
            price = price = {value: result?.price, op: 'multiply'}
          }
        }
        if (currency?.type === 'FIAT' && exchangeResult)
          price = {
            value: exchangeResult.conversion_rates[currency.name],
            op: 'divide',
          }
        prices[currency?.id] = price
      }
    return prices
  } catch (error) {
    return null
  }
}

export function* setPrices(
  prices: any,
  currencies: any,
  currency_id: any,
): any {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (prices[currency_id]?.date !== today.getTime()) {
    const defaultPrices = yield call(getExchangeValues, currencies, currency_id)
    if (!defaultPrices) return prices[currency_id]
    prices[currency_id] = {...defaultPrices, date: today.getTime()}
    yield put(actionObject(SET_PRICE, prices))
  }
  return prices[currency_id]
}
