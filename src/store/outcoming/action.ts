import {actionObject} from '@utils'
import {
  CREATE_BASIC_EXPENSES,
  CREATE_DEBT,
  CREATE_DEBT_ENTRY,
  CREATE_OUTCOME,
  CREATE_OUTCOME_CATEGORY,
  DELETE_CATEGORY_OUTCOME,
  DELETE_DEBT,
  DELETE_OUTCOME,
  GET_BASIC_EXPENSE,
  GET_BASIC_EXPENSES,
  GET_CATEGORY_OUTCOME,
  GET_DEBT,
  GET_DEBTS,
  GET_OUTCOMES,
  REMOVE_EXPENSE_ITEM,
  UPDATE_BASIC_EXPENSE,
  UPDATE_CATEGORY_OUTCOME,
  UPDATE_DEBT,
} from './action-types'

export const createOutcome = (payload: any) =>
  actionObject(CREATE_OUTCOME, payload)
export const getOutcomes = () => actionObject(GET_OUTCOMES)
export const createOutcomeCategory = (payload: any) =>
  actionObject(CREATE_OUTCOME_CATEGORY, payload)
export const createBasicExpenses = (payload: any) =>
  actionObject(CREATE_BASIC_EXPENSES, payload)
export const getBasicExpenses = () => actionObject(GET_BASIC_EXPENSES)
export const getBasicExpense = (payload: any) =>
  actionObject(GET_BASIC_EXPENSE, payload)
export const removeExpenseItem = () => actionObject(REMOVE_EXPENSE_ITEM)
export const updateBasicExpense = (payload: any) =>
  actionObject(UPDATE_BASIC_EXPENSE, payload)
export const deleteOutcome = (payload: any) =>
  actionObject(DELETE_OUTCOME, payload)
export const getCategoryOutcome = (payload: any) =>
  actionObject(GET_CATEGORY_OUTCOME, payload)
export const updateCategoryOutcome = (payload: any) =>
  actionObject(UPDATE_CATEGORY_OUTCOME, payload)
export const deleteCategoryOutcome = (payload: any) =>
  actionObject(DELETE_CATEGORY_OUTCOME, payload)
export const getDebts = () => actionObject(GET_DEBTS)
export const getDebt = (payload: any) => actionObject(GET_DEBT, payload)
export const updateDebt = (payload: any) => actionObject(UPDATE_DEBT, payload)
export const createDebt = (payload: any) => actionObject(CREATE_DEBT, payload)
export const deleteDebt = (payload: any) => actionObject(DELETE_DEBT, payload)
export const createDebtEntry = (payload: any) =>
  actionObject(CREATE_DEBT_ENTRY, payload)
