import {actionObject} from '@utils'
import {SIGNIN, UPDATE_LANGUAGE} from './action-types'

export const signin = (payload: any) => actionObject(SIGNIN, payload)

export const updateLanguage = (payload: any) =>
  actionObject(UPDATE_LANGUAGE, payload)
