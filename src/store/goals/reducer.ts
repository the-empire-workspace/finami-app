import { DispatchProps } from 'interfaces'
import {
  CREATE_CATEGORY_GOALS_ASYNC,
  CREATE_GOALS_ASYNC,
  CREATE_GOAL_ENTRY_ASYNC,
  DELETE_CATEGORY_GOAL_ASYNC,
  DELETE_GOAL_ASYNC,
  GET_CATEGORY_GOAL_ASYNC,
  GET_ENTRIES_GOALS_ASYNC,
  GET_GOAL_ASYNC,
  REMOVE_GOAL_ITEM,
  UPDATE_CATEGORY_GOAL_ASYNC,
  UPDATE_GOAL_ASYNC
} from './action-types'

const initialState = {
  items: [],
  item: {},
}

const reducer = (state = initialState, { type, payload }: DispatchProps) => {
  switch (type) {
    case GET_ENTRIES_GOALS_ASYNC:
      return { ...state, items: payload }
    case CREATE_GOALS_ASYNC:
      return { ...state, items: payload }
    case CREATE_CATEGORY_GOALS_ASYNC:
      return { ...state, items: payload }
    case GET_GOAL_ASYNC:
      return { ...state, item: payload }
    case GET_CATEGORY_GOAL_ASYNC:
      return { ...state, item: payload }
    case REMOVE_GOAL_ITEM:
      return { ...state, item: {} }
    case CREATE_GOAL_ENTRY_ASYNC:
      return { ...state, ...payload }
    case UPDATE_GOAL_ASYNC:
      return { ...state, ...payload }
    case UPDATE_CATEGORY_GOAL_ASYNC:
      return { ...state, ...payload }
    case DELETE_GOAL_ASYNC:
      return { ...state, ...payload }
    case DELETE_CATEGORY_GOAL_ASYNC:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default reducer
