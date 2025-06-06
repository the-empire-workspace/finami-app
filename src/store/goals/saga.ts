import {debugLog} from 'utils'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
  CREATE_CATEGORY_GOALS,
  CREATE_CATEGORY_GOALS_ASYNC,
  CREATE_GOALS,
  CREATE_GOALS_ASYNC,
  CREATE_GOAL_ENTRY,
  CREATE_GOAL_ENTRY_ASYNC,
  DELETE_CATEGORY_GOAL,
  DELETE_CATEGORY_GOAL_ASYNC,
  DELETE_GOAL,
  DELETE_GOAL_ASYNC,
  GET_CATEGORY_GOAL,
  GET_CATEGORY_GOAL_ASYNC,
  GET_ENTRIES_GOALS,
  GET_ENTRIES_GOALS_ASYNC,
  GET_GOAL,
  GET_GOAL_ASYNC,
  UPDATE_CATEGORY_GOAL,
  UPDATE_CATEGORY_GOAL_ASYNC,
  UPDATE_GOAL,
  UPDATE_GOAL_ASYNC,
} from './action-types'
import {actionObject} from 'utils'
import {getDashboardValues, getTotalBalance} from 'store/actions'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'
import {useEntryService} from 'services'
import {useCategoryService} from 'services'
import {useCurrencyService} from 'services'
import {Entry, Category, EntryCreateParams, EntryUpdateParams, CategoryCreateParams} from 'utils/database/models'

// Types
interface Payload {
  id?: number
  account_id?: number
  category_id?: number
  amount?: number
  concept?: string
  comment?: string
  type?: string
  date?: Date
  limit_date?: Date
  status_level?: string
  entry_id?: number
  [key: string]: any
}

interface Action {
  payload: Payload
  type: string
}

// Helper functions
function* handleError(error: Error, context: string): Generator {
  debugLog(error, `Error in ${context}`)
}

// Service calls
function* fetchCurrencies(): Generator<any, any, any> {
  const currencyService = useCurrencyService()
  return yield call([currencyService, currencyService.fetchCurrencies])
}

function* fetchEntries(type: string): Generator<any, any, any> {
  const entryService = useEntryService()
  return yield call([entryService, entryService.fetchEntries], {
    entry_type: 'goals',
    payment_type: type
  })
}

function* fetchCategories(type: string): Generator<any, any, any> {
  const categoryService = useCategoryService()
  return yield call([categoryService, categoryService.fetchCategories], type)
}

// Saga functions
function* getEntriesGoalsAsync({payload}: Action): Generator<any, void, (Entry | Category)[]> {
  try {
    const currencies = yield* fetchCurrencies()
    yield put(actionObject(GET_CURRENCIES_ASYNC, currencies))

    const entries = yield* fetchEntries(payload.type || '')
    const categories = yield* fetchCategories(payload.type || '')

    const mix = [...entries, ...categories]
    const orderMix = mix.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    yield put(actionObject(GET_ENTRIES_GOALS_ASYNC, orderMix))
  } catch (error) {
    yield* handleError(error as Error, 'getEntriesGoalsAsync')
  }
}

function* createCategoryGoalsAsync({payload}: Action): Generator<any, void, Category | null> {
  try {
    const categoryService = useCategoryService()
    const category = yield call([categoryService, categoryService.createNewCategory], {
      name: payload.concept || '',
      type: payload.type || 'goals',
      comment: payload.comment || '',
      date: new Date(payload.date || Date.now())
    } as CategoryCreateParams)

    const currencies = yield* fetchCurrencies()
    yield put(actionObject(GET_CURRENCIES_ASYNC, currencies))

    const entries = yield* fetchEntries(payload.type || '')
    const categories = yield* fetchCategories(payload.type || '')

    const mix = [...entries, ...categories]
    const orderMix = mix.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    yield put(actionObject(CREATE_CATEGORY_GOALS_ASYNC, orderMix))
  } catch (error) {
    yield* handleError(error as Error, 'createCategoryGoalsAsync')
  }
}

function* createGoalsAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.createNewEntry], {
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: payload.type || 'goals',
      amount: payload.amount || 0,
      entry_type: 'goals',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryCreateParams)

    const currencies = yield* fetchCurrencies()
    yield put(actionObject(GET_CURRENCIES_ASYNC, currencies))

    const entries = yield* fetchEntries(payload.type || '')
    const categories = yield* fetchCategories(payload.type || '')

    const mix = [...entries, ...categories]
    const orderMix = mix.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    yield put(actionObject(CREATE_GOALS_ASYNC, orderMix))

    if (payload.category_id) {
      const categoryService = useCategoryService()
      const category = yield call([categoryService, categoryService.fetchCategory], payload.category_id || 0)
      if (category) {
        yield put(actionObject(GET_CATEGORY_GOAL_ASYNC, category))
      }
    }

    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'createGoalsAsync')
  }
}

function* getGoalAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.fetchEntry], payload.id || 0)
    yield put(actionObject(GET_GOAL_ASYNC, entry))
  } catch (error) {
    yield* handleError(error as Error, 'getGoalAsync')
  }
}

function* getCategoryGoalAsync({payload}: Action): Generator<any, void, Category | null> {
  try {
    const categoryService = useCategoryService()
    const category = yield call([categoryService, categoryService.fetchCategory], payload.id || 0)
    yield put(actionObject(GET_CATEGORY_GOAL_ASYNC, category))
  } catch (error) {
    yield* handleError(error as Error, 'getCategoryGoalAsync')
  }
}

function* createGoalsEntryAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.createNewEntry], {
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: 'general',
      amount: payload.amount || 0,
      entry_type: 'goals',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      entry_id: payload.entry_id,
      date: new Date(payload.date || Date.now())
    } as EntryCreateParams)

    yield put(actionObject(CREATE_GOAL_ENTRY_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'createGoalsEntryAsync')
  }
}

function* updateGoalAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.updateExistingEntry], {
      id: payload.id || 0,
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: payload.type || 'goals',
      amount: payload.amount || 0,
      entry_type: 'goals',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryUpdateParams)

    yield put(actionObject(UPDATE_GOAL_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'updateGoalAsync')
  }
}

function* updateCategoryGoalAsync({payload}: Action): Generator<any, void, Category | null> {
  try {
    const categoryService = useCategoryService()
    const category = yield call([categoryService, categoryService.updateExistingCategory], {
      id: payload.id || 0,
      name: payload.concept || '',
      type: payload.type || 'goals',
      comment: payload.comment || ''
    })

    yield put(actionObject(UPDATE_CATEGORY_GOAL_ASYNC, category))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'updateCategoryGoalAsync')
  }
}

function* deleteGoalAsync({payload}: Action): Generator<any, void, boolean> {
  try {
    const entryService = useEntryService()
    yield call([entryService, entryService.removeEntry], payload.id || 0)
    yield put(actionObject(DELETE_GOAL_ASYNC, payload))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'deleteGoalAsync')
  }
}

function* deleteCategoryGoalAsync({payload}: Action): Generator<any, void, boolean> {
  try {
    const categoryService = useCategoryService()
    yield call([categoryService, categoryService.removeCategory], payload.id || 0)
    yield put(actionObject(DELETE_CATEGORY_GOAL_ASYNC, payload))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'deleteCategoryGoalAsync')
  }
}

// Watchers
export function* watchGetEntriesGoals(): Generator {
  yield takeLatest(GET_ENTRIES_GOALS, getEntriesGoalsAsync)
}

export function* watchCreateCategoryGoals(): Generator {
  yield takeLatest(CREATE_CATEGORY_GOALS, createCategoryGoalsAsync)
}

export function* watchCreateGoals(): Generator {
  yield takeLatest(CREATE_GOALS, createGoalsAsync)
}

export function* watchGetGoal(): Generator {
  yield takeLatest(GET_GOAL, getGoalAsync)
}

export function* watchGetCategoryGoal(): Generator {
  yield takeLatest(GET_CATEGORY_GOAL, getCategoryGoalAsync)
}

export function* watchCreateGoalsEntry(): Generator {
  yield takeLatest(CREATE_GOAL_ENTRY, createGoalsEntryAsync)
}

export function* watchUpdateGoal(): Generator {
  yield takeLatest(UPDATE_GOAL, updateGoalAsync)
}

export function* watchUpdateCategoryGoal(): Generator {
  yield takeLatest(UPDATE_CATEGORY_GOAL, updateCategoryGoalAsync)
}

export function* watchDeleteGoal(): Generator {
  yield takeLatest(DELETE_GOAL, deleteGoalAsync)
}

export function* watchDeleteCategoryGoal(): Generator {
  yield takeLatest(DELETE_CATEGORY_GOAL, deleteCategoryGoalAsync)
}
