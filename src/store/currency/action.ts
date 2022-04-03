import { actionObject } from '@utils'
import { SET_CURRENCY } from './action-types'

export const setCurrency = (payload: any) => actionObject(SET_CURRENCY, payload)
