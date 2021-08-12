import { DispatchProps } from 'interfaces'
import { SIGNIN } from './action-types'

const initialState = {
  isAuth: false,
  user: {
    name: null,
    profession: null,
    avatar: null,
    currency: null,
  },
}

const AccountReducer = (
  state = initialState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case SIGNIN:
      return { ...state, ...{ user: payload, isAuth: true } }
    default:
      return state
  }
}

export default AccountReducer
