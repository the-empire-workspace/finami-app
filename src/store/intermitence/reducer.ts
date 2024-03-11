import { DispatchProps } from 'interfaces'
import { SET_LOADING, SET_PRICE } from './action-types'

const initialState = {
  isLoading: false,
  prices: {}
}

const AccountReducer = (
  state = initialState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload }
    case SET_PRICE:
      return { ...state, prices: payload }
    default:
      return state
  }
}

export default AccountReducer
