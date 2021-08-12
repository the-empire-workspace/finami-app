import { actionObject } from '@utils'
import { SIGNIN } from './action-types'

export const signin = (payload: any) => actionObject(SIGNIN, payload)
