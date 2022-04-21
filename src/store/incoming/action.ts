import {actionObject} from '@utils'
import {SET_INCOMING} from './action-types'

export const setIncoming = (payload: any) => actionObject(SET_INCOMING, payload)
