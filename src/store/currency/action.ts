import { actionObject } from '@utils'
import { GET_CURRENCY_PRICE, SET_CURRENCY } from './action-types'

export const setCurrency = (payload: any) => actionObject(SET_CURRENCY, payload)
export const getCurrencyPrice = () => actionObject(GET_CURRENCY_PRICE)