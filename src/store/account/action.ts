import { actionObject } from '@utils'
import {
  GET_ACCOUNTS,
  GET_DASHBOARD_VALUES,
  GET_ITEM,
  GET_TOTAL_BALANCE,
  REMOVE_ITEM,
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
export const getItem = (payload: any) => actionObject(GET_ITEM, payload)
export const removeItem = () => actionObject(REMOVE_ITEM)
export const getAccounts = () => actionObject(GET_ACCOUNTS)