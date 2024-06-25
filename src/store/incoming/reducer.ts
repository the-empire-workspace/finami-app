import { DispatchProps } from 'interfaces'
import {
  CREATE_FIXED_INCOMES_ASYNC,
  CREATE_RECEIVABLE_ACCOUNT_ASYNC,
  CREATE_RECEIVABLE_ACCOUNT_ENTRY_ASYNC,
  CREATE_INCOME_ASYNC,
  CREATE_INCOME_CATEGORY_ASYNC,
  DELETE_CATEGORY_INCOME_ASYNC,
  DELETE_RECEIVABLE_ACCOUNT_ASYNC,
  DELETE_INCOME_ASYNC,
  GET_FIXED_INCOMES_ASYNC,
  GET_FIXED_INCOME_ASYNC,
  GET_CATEGORY_INCOME_ASYNC,
  GET_RECEIVABLE_ACCOUNTS_ASYNC,
  GET_RECEIVABLE_ACCOUNT_ASYNC,
  GET_INCOMES_ASYNC,
  REMOVE_INCOME_ITEM,
  UPDATE_FIXED_INCOME_ASYNC,
  UPDATE_CATEGORY_INCOME_ASYNC,
  UPDATE_RECEIVABLE_ACCOUNT_ASYNC,
  CREATE_FIXED_INCOMES_ENTRY_ASYNC,
} from './action-types'

const initialState = {
  items: [],
  itemsFixed: [],
  item: {},
  itemsReceivableAccounts: [],
}

const reducer = (state = initialState, { type, payload }: DispatchProps) => {
  switch (type) {
    case CREATE_INCOME_ASYNC:
      return { ...state, ...{ items: payload } }
    case GET_INCOMES_ASYNC:
      return { ...state, ...{ items: payload } }
    case CREATE_INCOME_CATEGORY_ASYNC:
      return { ...state, ...payload }
    case CREATE_FIXED_INCOMES_ASYNC:
      return { ...state, ...payload }
    case GET_FIXED_INCOMES_ASYNC:
      return { ...state, itemsFixed: payload }
    case GET_FIXED_INCOME_ASYNC:
      return { ...state, item: payload }
    case REMOVE_INCOME_ITEM:
      return { ...state, item: {} }
    case UPDATE_FIXED_INCOME_ASYNC:
      return { ...state, ...payload }
    case GET_CATEGORY_INCOME_ASYNC:
      return { ...state, item: payload }
    case DELETE_INCOME_ASYNC:
      return { ...state, ...payload }
    case UPDATE_CATEGORY_INCOME_ASYNC:
      return { ...state, ...payload }
    case DELETE_CATEGORY_INCOME_ASYNC:
      return { ...state, ...payload }
    case GET_RECEIVABLE_ACCOUNTS_ASYNC:
      return { ...state, itemsReceivableAccounts: payload }
    case CREATE_RECEIVABLE_ACCOUNT_ASYNC:
      return { ...state, ...payload }
    case GET_RECEIVABLE_ACCOUNT_ASYNC:
      return { ...state, item: payload }
    case UPDATE_RECEIVABLE_ACCOUNT_ASYNC:
      return { ...state, ...payload }
    case DELETE_RECEIVABLE_ACCOUNT_ASYNC:
      return { ...state, ...payload }
    case CREATE_RECEIVABLE_ACCOUNT_ENTRY_ASYNC:
      return { ...state, ...payload }
    case CREATE_FIXED_INCOMES_ENTRY_ASYNC:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default reducer
