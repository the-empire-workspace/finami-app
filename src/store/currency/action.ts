import {actionObject} from '@utils'
import {
  GET_CURRENCY_PRICE,
  GET_CURRENCIES,
  GET_CRYPTO_CURRENCIES,
} from './action-types'

export const getCurrencies = () => actionObject(GET_CURRENCIES)
export const getCurrencyPrice = () => actionObject(GET_CURRENCY_PRICE)
export const getCryptoCurrencies = () => actionObject(GET_CRYPTO_CURRENCIES)
