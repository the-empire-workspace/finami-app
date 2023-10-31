import { FetchService } from "utils"
import { ExchangeAPI, binanceAPI } from "./path"

export const getExchangeValues = async (currencies: any[], currency_id: any) => {

  const defaultCurrency = currencies.find((currency: any) => currency.id === currency_id)
  const exchangeResult = defaultCurrency?.type === 'FIAT' ? await FetchService(`${ExchangeAPI}latest/${defaultCurrency?.name}`) : null
 
  const prices: any = {}
  for (const currency of currencies)
    if (defaultCurrency?.id !== currency?.id) {
      let price = { value: 0, op: 'none' }
      if (currency?.type === 'CRYPTO' || defaultCurrency?.type === 'CRYPTO') {
        const currencyPair = currency?.name === 'USD' ? `B${currency?.name}` : currency?.name
        const defaultCurrencyPair = defaultCurrency?.name === 'USD' ? `B${defaultCurrency?.name}` : defaultCurrency?.name
        try {
          const PAIR = `${defaultCurrencyPair}${currencyPair}`
          const result = await FetchService(`${binanceAPI}avgPrice?symbol=${PAIR}`)
          price = { value: result?.price, op: 'divide' }
        } catch (error) {
          const XPAIR = `${currencyPair}${defaultCurrencyPair}`
          const result = await FetchService(`${binanceAPI}avgPrice?symbol=${XPAIR}`)
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
  return prices
}