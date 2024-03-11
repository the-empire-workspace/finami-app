import {actionObject} from '@utils'
import {SET_LOADING, SET_PRICE} from './action-types'

export const setLoading = (payload: any) => actionObject(SET_LOADING, payload)
export const setPrice = (payload: any) => actionObject(SET_PRICE, payload)