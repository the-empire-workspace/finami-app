import {DispatchProps} from 'interfaces'
import {GET_INCOMING, SET_INCOMING} from './action-types'

const initialState = {
  items: [],
}

const reducer = (state = initialState, {type, payload}: DispatchProps) => {
  switch (type) {
    case SET_INCOMING:
      return {...state, ...{items: payload}}
    case GET_INCOMING:
      return {...state, items: payload}
    default:
      return state
  }
}

export default reducer
