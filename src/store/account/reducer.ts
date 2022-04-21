import {DispatchProps} from 'interfaces'
import {SIGNIN, UPDATE_LANGUAGE} from './action-types'

const initialState = {
  isAuth: false,
  user: {
    name: null,
    profession: null,
    avatar: null,
    currency: null,
    language: null,
  },
}

const AccountReducer = (
  state = initialState,
  {type, payload}: DispatchProps,
) => {
  switch (type) {
    case SIGNIN:
      return {...state, ...{user: payload, isAuth: true}}
    case UPDATE_LANGUAGE:
      return {
        ...state,
        ...{user: {...state.user, language: payload}, isAuth: true},
      }
    default:
      return state
  }
}

export default AccountReducer
