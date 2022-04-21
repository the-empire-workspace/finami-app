import {DispatchProps} from 'interfaces'
import {SET_OUTCOMING} from './action-types'

const initialState = {
  items: [],
}

const reducer = (state = initialState, {type, payload}: DispatchProps) => {
  switch (type) {
    case SET_OUTCOMING:
      return {...state, ...{items: payload}}
    default:
      return state
  }
}

export default reducer
