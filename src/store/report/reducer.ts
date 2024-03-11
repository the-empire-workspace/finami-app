import {DispatchProps} from 'interfaces'
import {GENERATE_REPORT_ASYNC, DELETE_REPORT} from './action-types'

const initialState = {
  report: '',
}

const NotificationReducer = (
  state = initialState,
  {type, payload}: DispatchProps,
) => {
  switch (type) {
    case GENERATE_REPORT_ASYNC:
      return {...state, report: payload}

    case DELETE_REPORT:
      return {...state, report: ''}
    default:
      return state
  }
}

export default NotificationReducer
