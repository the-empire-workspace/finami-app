import {DispatchProps} from 'interfaces'
import {
  SIGNIN_ASYNC,
  UPDATE_LANGUAGE_ASYNC,
  UPDATE_NOTIFICATION_TOKEN_ASYNC,
} from './action-types'

const initialState = {
  isAuth: false,
  user: {},
  tokenNotifications: null,
}

const AccountReducer = (
  state = initialState,
  {type, payload}: DispatchProps,
) => {
  switch (type) {
    case SIGNIN_ASYNC:
      return {...state, ...{user: payload, isAuth: true}}
    case UPDATE_LANGUAGE_ASYNC:
      return {
        ...state,
        ...{user: {...state.user, language: payload}, isAuth: true},
      }
    case UPDATE_NOTIFICATION_TOKEN_ASYNC:
      return {
        ...state,
        tokenNotifications: payload,
      }
    default:
      return state
  }
}

export default AccountReducer
