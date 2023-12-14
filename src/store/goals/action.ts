import { actionObject } from '@utils'
import {
  CREATE_CATEGORY_GOALS,
  CREATE_GOALS,
  CREATE_GOAL_ENTRY,
  DELETE_CATEGORY_GOAL,
  DELETE_GOAL,
  GET_CATEGORY_GOAL,
  GET_ENTRIES_GOALS,
  GET_GOAL,
  REMOVE_GOAL_ITEM,
  UPDATE_CATEGORY_GOAL,
  UPDATE_GOAL
} from './action-types'


export const getEntriesGoals = (type: any) => actionObject(GET_ENTRIES_GOALS, type)

export const createGoals = (data: any) => actionObject(CREATE_GOALS, data)
export const createCategoryGoals = (data: any) => actionObject(CREATE_CATEGORY_GOALS, data)

export const getGoal = (id: any) => actionObject(GET_GOAL, id)

export const getCategoryGoal = (id: any) => actionObject(GET_CATEGORY_GOAL, id)

export const removeGoalItem = () => actionObject(REMOVE_GOAL_ITEM)

export const createGoalEntry = (data: any) => actionObject(CREATE_GOAL_ENTRY, data)

export const updateGoal = (data: any) => actionObject(UPDATE_GOAL, data)
export const updateCategoryGoal = (data: any) => actionObject(UPDATE_CATEGORY_GOAL, data)

export const deleteGoal = (data: any) => actionObject(DELETE_GOAL, data)
export const deleteCategoryGoal = (data: any) => actionObject(DELETE_CATEGORY_GOAL, data)