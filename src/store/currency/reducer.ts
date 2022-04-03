import { DispatchProps } from 'interfaces'
import { SET_CURRENCY } from './action-types'

const initialState = {
  items: [],
}

const AccountReducer = (
  state = initialState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case SET_CURRENCY:
      return { ...state, ...{ items: payload } }
    default:
      return state
  }
}

export default AccountReducer
