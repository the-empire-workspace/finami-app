import { DispatchProps } from 'interfaces'
import { GET_CURRENCY_PRICE_ASYNC, SET_CURRENCY } from './action-types'
import USD from '@assets/img/Iconografia-finami-12.png'
import EUR from '@assets/img/Iconografia-finami-09.png'
import BTC from '@assets/img/Iconografia-finami-16.png'
import ETH from '@assets/img/Iconografia-finami-07.png'

const initialState = {
  items: [
    {
      id: 0,
      name: 'USD',
      symbol: '$',
      type: 'FIAT',
      image: USD,
    },
    {
      id: 1,
      name: 'EUR',
      symbol: '€',
      type: 'FIAT',
      image: EUR,
    },
    {
      id: 2,
      name: 'BTC',
      symbol: '₿',
      type: 'CRYPTO',
      image: BTC,
    },
    {
      id: 3,
      name: 'USDT',
      symbol: '$',
      type: 'CRYPTO',
      image: ETH
    },
  ],
  defaultPrices: []
}

const AccountReducer = (
  state = initialState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case SET_CURRENCY:
      return { ...state, ...{ items: payload } }
    case GET_CURRENCY_PRICE_ASYNC:
      return { ...state, defaultPrices: payload }
    default:
      return state
  }
}

export default AccountReducer
