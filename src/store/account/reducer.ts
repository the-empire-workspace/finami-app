
import { DispatchProps } from 'interfaces'
import { SIGNIN } from './action-types'

const initialState = {
  isAuth: false,
  user: {}
}

const AccountReducer = (state = initialState, { type, payload }: DispatchProps) => {
  switch (type) {
    case SIGNIN:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default AccountReducer
