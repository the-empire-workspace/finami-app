import {actionObject} from '@utils'
import {
  GET_DASHBOARD_VALUES,
  GET_TOTAL_BALANCE,
  SIGNIN,
  UPDATE_LANGUAGE,
  UPDATE_NOTIFICATION_TOKEN,
} from './action-types'

export const signin = () => actionObject(SIGNIN)

export const updateLanguage = (payload: any) =>
  actionObject(UPDATE_LANGUAGE, payload)

export const updateNotificationToken = (payload: any) =>
  actionObject(UPDATE_NOTIFICATION_TOKEN, payload)

export const getTotalBalance = () => actionObject(GET_TOTAL_BALANCE)
export const getDashboardValues = () => actionObject(GET_DASHBOARD_VALUES)
