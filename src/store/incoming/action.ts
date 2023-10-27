import { actionObject } from '@utils'
import { SET_INCOMING,GET_INCOMING } from './action-types'

export const setIncoming = (payload: any) => actionObject(SET_INCOMING, payload)
export const getIncoming = () => actionObject(GET_INCOMING)
