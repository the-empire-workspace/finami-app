import {DispatchProps} from 'interfaces'
import {GET_INCOMING_ASYNC, SET_INCOMING_ASYNC} from './action-types'

const initialState = {
  items: [],
}

const reducer = (state = initialState, {type, payload}: DispatchProps) => {
  switch (type) {
    case SET_INCOMING_ASYNC:
      return {...state, items: [...state.items, payload]}
    case GET_INCOMING_ASYNC:
      return {...state, items: payload}
    default:
      return state
  }
}

export default reducer
