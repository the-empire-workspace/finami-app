import {DispatchProps} from 'interfaces'
import {
  SIGNIN,
  UPDATE_LANGUAGE,
  UPDATE_NOTIFICATION_TOKEN,
} from './action-types'

const initialState = {
  isAuth: false,
  user: {
    name: null,
    profession: null,
    avatar: null,
    currency: null,
    language: null,
  },
  tokenNotifications: null,
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
    case UPDATE_NOTIFICATION_TOKEN:
      return {
        ...state,
        tokenNotifications: payload,
      }
    default:
      return state
  }
}

export default AccountReducer
