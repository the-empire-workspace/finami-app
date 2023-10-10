import { DispatchProps } from 'interfaces'
import { GET_CURRENCY_PRICE_ASYNC, GET_CURRENCIES_ASYNC } from './action-types'

const initialState = {
  currencies: [],
  defaultPrices: [],
}

const AccountReducer = (
  state = initialState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case GET_CURRENCIES_ASYNC:
      return { ...state, ...{ currencies: payload } }
    case GET_CURRENCY_PRICE_ASYNC:
      return { ...state, defaultPrices: payload }
    default:
      return state
  }
}

export default AccountReducer
