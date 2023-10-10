import { DispatchProps } from 'interfaces'
import {
  SET_LOADING
} from './action-types'

const initialState = {
  isLoading: false,
}

const AccountReducer = (
  state = initialState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload }
    default:
      return state
  }
}

export default AccountReducer
