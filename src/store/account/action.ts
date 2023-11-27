import {actionObject} from '@utils'
import {
  CREATE_CRYPTO_ACCOUNT,
  CREATE_CURRENCY_ACCOUNT,
  DELETE_ACCOUNT,
  DELETE_SINGLE_ACCOUNT,
  GET_ACCOUNT,
  GET_ACCOUNTS,
  GET_DASHBOARD_VALUES,
  GET_ITEM,
  GET_TOTAL_BALANCE,
  REMOVE_ITEM,
  SIGNIN,
  UPDATE_LANGUAGE,
  UPDATE_NOTIFICATION_TOKEN,
  UPDATE_SINGLE_ACCOUNT,
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
export const createCryptoAccount = (data: any) =>
  actionObject(CREATE_CRYPTO_ACCOUNT, data)
export const createCurrencyAccount = (data: any) =>
  actionObject(CREATE_CURRENCY_ACCOUNT, data)
export const deleteAccount = (data: any) => actionObject(DELETE_ACCOUNT, data)

export const getAccount = (id: any) => actionObject(GET_ACCOUNT, id)

export const deleteSingleAccount = (id: any) =>
  actionObject(DELETE_SINGLE_ACCOUNT, id)

export const updateSingleAccount = (data: any) =>
  actionObject(UPDATE_SINGLE_ACCOUNT, data)
