import {actionObject} from '@utils'
import {SET_LOADING} from './action-types'

export const setLoading = (payload: any) => actionObject(SET_LOADING, payload)
