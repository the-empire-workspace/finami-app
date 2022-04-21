import {actionObject} from '@utils'
import {SET_OUTCOMING} from './action-types'

export const setOutcoming = (payload: any) =>
  actionObject(SET_OUTCOMING, payload)
