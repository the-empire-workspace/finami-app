import { DispatchProps } from 'interfaces'
import {
  CREATE_CRYPTO_ACCOUNT_ASYNC,
  CREATE_CURRENCY_ACCOUNT_ASYNC,
  GET_ACCOUNTS_ASYNC,
  GET_DASHBOARD_VALUES_ASYNC,
  GET_ITEM_ASYNC,
  GET_TOTAL_BALANCE_ASYNC,
  REMOVE_ITEM,
  SIGNIN_ASYNC,
  UPDATE_LANGUAGE_ASYNC,
  UPDATE_NOTIFICATION_TOKEN_ASYNC,
} from './action-types'

const initialState = {
  isAuth: false,
  user: {},
  tokenNotifications: null,
  totalBalance: 0,
  dashboardValues: {
    monthIncome: 0,
    monthExpenses: 0,
    monthProjected: 0,
    entries: [],
  },
  item: {},
  accounts: [],
}

const AccountReducer = (
  state = initialState,
  { type, payload }: DispatchProps,
) => {
  switch (type) {
    case SIGNIN_ASYNC:
      return { ...state, ...{ user: payload, isAuth: true } }
    case UPDATE_LANGUAGE_ASYNC:
      return {
        ...state,
        ...{ user: { ...state.user, language: payload }, isAuth: true },
      }
    case UPDATE_NOTIFICATION_TOKEN_ASYNC:
      return {
        ...state,
        tokenNotifications: payload,
      }
    case GET_TOTAL_BALANCE_ASYNC:
      return { ...state, totalBalance: payload }
    case GET_DASHBOARD_VALUES_ASYNC:
      return { ...state, dashboardValues: payload }
    case GET_ITEM_ASYNC:
      return { ...state, item: payload }
    case REMOVE_ITEM:
      return { ...state, item: {} }
    case GET_ACCOUNTS_ASYNC:
      return { ...state, accounts: payload }
    case CREATE_CRYPTO_ACCOUNT_ASYNC:
      return { ...state, accounts: payload }
    case CREATE_CURRENCY_ACCOUNT_ASYNC:
      return { ...state, accounts: payload }
    default:
      return state
  }
}

export default AccountReducer
