import {DispatchProps} from 'interfaces'
import {PUSH_NOTIFICATION_ASYNC} from './action-types'

const initialState = {
  pushNotifications: [],
}

const NotificationReducer = (
  state = initialState,
  {type, payload}: DispatchProps,
) => {
  switch (type) {
    case PUSH_NOTIFICATION_ASYNC:
      return {...state, pushNotifications: payload}
    default:
      return state
  }
}

export default NotificationReducer
