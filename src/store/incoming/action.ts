import {actionObject} from '@utils'
import {
  CREATE_FIXED_INCOMES,
  CREATE_RECEIVABLE_ACCOUNT,
  CREATE_RECEIVABLE_ACCOUNT_ENTRY,
  CREATE_INCOME,
  CREATE_INCOME_CATEGORY,
  DELETE_CATEGORY_INCOME,
  DELETE_RECEIVABLE_ACCOUNT,
  DELETE_INCOME,
  GET_FIXED_INCOME,
  GET_FIXED_INCOMES,
  GET_CATEGORY_INCOME,
  GET_RECEIVABLE_ACCOUNT,
  GET_RECEIVABLE_ACCOUNTS,
  GET_INCOMES,
  REMOVE_INCOME_ITEM,
  UPDATE_FIXED_INCOME,
  UPDATE_CATEGORY_INCOME,
  UPDATE_RECEIVABLE_ACCOUNT,
} from './action-types'

export const createIncome = (payload: any) =>
  actionObject(CREATE_INCOME, payload)
export const getIncomes = () => actionObject(GET_INCOMES)
export const createIncomeCategory = (payload: any) =>
  actionObject(CREATE_INCOME_CATEGORY, payload)
export const createFixedIncomes = (payload: any) =>
  actionObject(CREATE_FIXED_INCOMES, payload)
export const getFixedIncomes = () => actionObject(GET_FIXED_INCOMES)
export const getFixedIncome = (payload: any) =>
  actionObject(GET_FIXED_INCOME, payload)
export const removeIncomeItem = () => actionObject(REMOVE_INCOME_ITEM)
export const updateFixedIncome = (payload: any) =>
  actionObject(UPDATE_FIXED_INCOME, payload)
export const deleteIncome = (payload: any) =>
  actionObject(DELETE_INCOME, payload)
export const getCategoryIncome = (payload: any) =>
  actionObject(GET_CATEGORY_INCOME, payload)
export const updateCategoryIncome = (payload: any) =>
  actionObject(UPDATE_CATEGORY_INCOME, payload)
export const deleteCategoryIncome = (payload: any) =>
  actionObject(DELETE_CATEGORY_INCOME, payload)
export const getReceivableAccounts = () => actionObject(GET_RECEIVABLE_ACCOUNTS)
export const getReceivableAccount = (payload: any) =>
  actionObject(GET_RECEIVABLE_ACCOUNT, payload)
export const updateReceivableAccount = (payload: any) =>
  actionObject(UPDATE_RECEIVABLE_ACCOUNT, payload)
export const createReceivableAccount = (payload: any) =>
  actionObject(CREATE_RECEIVABLE_ACCOUNT, payload)
export const deleteReceivableAccount = (payload: any) =>
  actionObject(DELETE_RECEIVABLE_ACCOUNT, payload)
export const createReceivableAccountEntry = (payload: any) =>
  actionObject(CREATE_RECEIVABLE_ACCOUNT_ENTRY, payload)
