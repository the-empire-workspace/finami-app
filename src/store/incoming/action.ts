import {actionObject} from '@utils'
import {SET_INCOMING_ASYNC, GET_INCOMING_ASYNC} from './action-types'

export const setIncoming = (payload: any) =>
  actionObject(SET_INCOMING_ASYNC, payload)
export const getIncoming = () => actionObject(GET_INCOMING_ASYNC)
