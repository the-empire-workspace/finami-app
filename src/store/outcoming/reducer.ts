import {DispatchProps} from 'interfaces'
import {
  CREATE_BASIC_EXPENSES_ASYNC,
  CREATE_DEBT_ASYNC,
  CREATE_DEBT_ENTRY_ASYNC,
  CREATE_OUTCOME_ASYNC,
  CREATE_OUTCOME_CATEGORY_ASYNC,
  DELETE_CATEGORY_OUTCOME_ASYNC,
  DELETE_DEBT_ASYNC,
  DELETE_OUTCOME_ASYNC,
  GET_BASIC_EXPENSES_ASYNC,
  GET_BASIC_EXPENSE_ASYNC,
  GET_CATEGORY_OUTCOME_ASYNC,
  GET_DEBTS_ASYNC,
  GET_DEBT_ASYNC,
  GET_OUTCOMES_ASYNC,
  REMOVE_EXPENSE_ITEM,
  UPDATE_BASIC_EXPENSE_ASYNC,
  UPDATE_CATEGORY_OUTCOME_ASYNC,
  UPDATE_DEBT_ASYNC,
} from './action-types'

const initialState = {
  items: [],
  itemsBasics: [],
  item: {},
  itemsDebts: [],
}

const reducer = (state = initialState, {type, payload}: DispatchProps) => {
  switch (type) {
    case CREATE_OUTCOME_ASYNC:
      return {...state, ...{items: payload}}
    case GET_OUTCOMES_ASYNC:
      return {...state, ...{items: payload}}
    case CREATE_OUTCOME_CATEGORY_ASYNC:
      return {...state, ...payload}
    case CREATE_BASIC_EXPENSES_ASYNC:
      return {...state, ...payload}
    case GET_BASIC_EXPENSES_ASYNC:
      return {...state, itemsBasics: payload}
    case GET_BASIC_EXPENSE_ASYNC:
      return {...state, item: payload}
    case REMOVE_EXPENSE_ITEM:
      return {...state, item: {}}
    case UPDATE_BASIC_EXPENSE_ASYNC:
      return {...state, ...payload}
    case GET_CATEGORY_OUTCOME_ASYNC:
      return {...state, item: payload}
    case DELETE_OUTCOME_ASYNC:
      return {...state, ...payload}
    case UPDATE_CATEGORY_OUTCOME_ASYNC:
      return {...state, ...payload}
    case DELETE_CATEGORY_OUTCOME_ASYNC:
      return {...state, ...payload}
    case GET_DEBTS_ASYNC:
      return {...state, itemsDebts: payload}
    case CREATE_DEBT_ASYNC:
      return {...state, ...payload}
    case GET_DEBT_ASYNC:
      return {...state, item: payload}
    case UPDATE_DEBT_ASYNC:
      return {...state, ...payload}
    case DELETE_DEBT_ASYNC:
      return {...state, ...payload}
    case CREATE_DEBT_ENTRY_ASYNC:
      return {...state, ...payload}
    default:
      return state
  }
}

export default reducer
