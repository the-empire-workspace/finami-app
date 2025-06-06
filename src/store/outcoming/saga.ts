import {debugLog} from 'utils'
import {call, put, takeLatest} from 'redux-saga/effects'
import {
  CREATE_BASIC_EXPENSES,
  CREATE_BASIC_EXPENSES_ASYNC,
  CREATE_DEBT,
  CREATE_DEBT_ASYNC,
  CREATE_DEBT_ENTRY,
  CREATE_DEBT_ENTRY_ASYNC,
  CREATE_OUTCOME,
  CREATE_OUTCOME_ASYNC,
  CREATE_OUTCOME_CATEGORY,
  CREATE_OUTCOME_CATEGORY_ASYNC,
  DELETE_CATEGORY_OUTCOME,
  DELETE_DEBT,
  DELETE_DEBT_ASYNC,
  DELETE_OUTCOME,
  DELETE_OUTCOME_ASYNC,
  GET_BASIC_EXPENSE,
  GET_BASIC_EXPENSES,
  GET_BASIC_EXPENSES_ASYNC,
  GET_BASIC_EXPENSE_ASYNC,
  GET_CATEGORY_OUTCOME,
  GET_CATEGORY_OUTCOME_ASYNC,
  GET_DEBT,
  GET_DEBTS,
  GET_DEBTS_ASYNC,
  GET_DEBT_ASYNC,
  GET_OUTCOMES,
  GET_OUTCOMES_ASYNC,
  UPDATE_BASIC_EXPENSE,
  UPDATE_BASIC_EXPENSE_ASYNC,
  UPDATE_CATEGORY_OUTCOME,
  UPDATE_DEBT,
  UPDATE_DEBT_ASYNC,
} from './action-types'
import {actionObject} from 'utils'
import {getDashboardValues, getOutcomes, getTotalBalance} from 'store/actions'
import {useEntryService} from 'services'
import {useCategoryService} from 'services'
import {Entry, Category, EntryCreateParams, EntryUpdateParams, CategoryCreateParams} from 'utils/database/models'

// Types
interface Payload {
  id?: number
  account_id?: number
  category_id?: number
  amount?: number
  concept?: string
  comment?: string
  receiver_name?: string
  email?: string
  phonenumber?: string
  date?: Date
  frecuency_type?: string
  frecuency_time?: string
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

// Saga functions
function* getOutcomesAsync(): Generator<any, void, Entry[]> {
  try {
    const entryService = useEntryService()
    const entries = yield call([entryService, entryService.fetchEntries], {entry_type: 'expense'})
    yield put(actionObject(GET_OUTCOMES_ASYNC, entries))
  } catch (error) {
    yield* handleError(error as Error, 'getOutcomesAsync')
  }
}

function* createOutcomeAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.createNewEntry], {
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: 'general',
      amount: payload.amount || 0,
      entry_type: 'expense',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      emissor: payload.receiver_name,
      email: payload.email,
      phone: payload.phonenumber,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      frecuency_type: payload.frecuency_type,
      frecuency_time: payload.frecuency_time,
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryCreateParams)
    yield put(actionObject(CREATE_OUTCOME_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getOutcomes())
  } catch (error) {
    yield* handleError(error as Error, 'createOutcomeAsync')
  }
}

function* createOutcomeCategoryAsync({payload}: Action): Generator<any, void, Category | null> {
  try {
    const categoryService = useCategoryService()
    const category = yield call([categoryService, categoryService.createNewCategory], {
      name: payload.concept || '',
      type: 'expense',
      comment: payload.comment || '',
      date: new Date(payload.date || Date.now())
    } as CategoryCreateParams)
    yield put(actionObject(CREATE_OUTCOME_CATEGORY_ASYNC, category))
  } catch (error) {
    yield* handleError(error as Error, 'createOutcomeCategoryAsync')
  }
}

function* getBasicExpensesAsync(): Generator<any, void, Entry[]> {
  try {
    const entryService = useEntryService()
    const entries = yield call([entryService, entryService.fetchEntries], {entry_type: 'basic_expenses'})
    yield put(actionObject(GET_BASIC_EXPENSES_ASYNC, entries))
  } catch (error) {
    yield* handleError(error as Error, 'getBasicExpensesAsync')
  }
}

function* createBasicExpensesAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.createNewEntry], {
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: 'basic_expenses',
      amount: payload.amount || 0,
      entry_type: 'basic_expenses',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      emissor: payload.receiver_name,
      email: payload.email,
      phone: payload.phonenumber,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      frecuency_type: payload.frecuency_type,
      frecuency_time: payload.frecuency_time,
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryCreateParams)
    yield put(actionObject(CREATE_BASIC_EXPENSES_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getOutcomes())
  } catch (error) {
    yield* handleError(error as Error, 'createBasicExpensesAsync')
  }
}

function* getDebtsAsync(): Generator<any, void, Entry[]> {
  try {
    const entryService = useEntryService()
    const entries = yield call([entryService, entryService.fetchEntries], {entry_type: 'debt'})
    yield put(actionObject(GET_DEBTS_ASYNC, entries))
  } catch (error) {
    yield* handleError(error as Error, 'getDebtsAsync')
  }
}

function* createDebtAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.createNewEntry], {
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: 'debt',
      amount: payload.amount || 0,
      entry_type: 'debt',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      emissor: payload.receiver_name,
      email: payload.email,
      phone: payload.phonenumber,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      frecuency_type: payload.frecuency_type,
      frecuency_time: payload.frecuency_time,
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryCreateParams)
    yield put(actionObject(CREATE_DEBT_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getOutcomes())
  } catch (error) {
    yield* handleError(error as Error, 'createDebtAsync')
  }
}

function* getBasicExpenseAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.fetchEntry], payload.id || 0)
    yield put(actionObject(GET_BASIC_EXPENSE_ASYNC, entry))
  } catch (error) {
    yield* handleError(error as Error, 'getBasicExpenseAsync')
  }
}

function* updateBasicExpenseAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.updateExistingEntry], {
      id: payload.id || 0,
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: 'basic_expenses',
      amount: payload.amount || 0,
      entry_type: 'basic_expenses',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      emissor: payload.receiver_name,
      email: payload.email,
      phone: payload.phonenumber,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      frecuency_type: payload.frecuency_type,
      frecuency_time: payload.frecuency_time,
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryUpdateParams)
    yield put(actionObject(UPDATE_BASIC_EXPENSE_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getOutcomes())
  } catch (error) {
    yield* handleError(error as Error, 'updateBasicExpenseAsync')
  }
}

function* updateCategoryOutcomeAsync({payload}: Action): Generator<any, void, Category | null> {
  try {
    const categoryService = useCategoryService()
    const category = yield call([categoryService, categoryService.updateExistingCategory], {
      id: payload.id || 0,
      name: payload.concept || '',
      type: 'expense',
      comment: payload.comment || ''
    })
    yield put(actionObject(UPDATE_CATEGORY_OUTCOME, category))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'updateCategoryOutcomeAsync')
  }
}

function* deleteCategoryOutcomeAsync({payload}: Action): Generator<any, void, boolean> {
  try {
    const categoryService = useCategoryService()
    yield call([categoryService, categoryService.removeCategory], payload.id || 0)
    yield put(actionObject(DELETE_OUTCOME_ASYNC, payload))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'deleteCategoryOutcomeAsync')
  }
}

function* deleteOutcomeAsync({payload}: Action): Generator<any, void, boolean> {
  try {
    const entryService = useEntryService()
    yield call([entryService, entryService.removeEntry], payload.id || 0)
    yield put(actionObject(DELETE_OUTCOME_ASYNC, payload))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'deleteOutcomeAsync')
  }
}

function* getCategoryOutcomeAsync({payload}: Action): Generator<any, void, Category | null> {
  try {
    const categoryService = useCategoryService()
    const category = yield call([categoryService, categoryService.fetchCategory], payload.id || 0)
    yield put(actionObject(GET_CATEGORY_OUTCOME_ASYNC, category))
  } catch (error) {
    yield* handleError(error as Error, 'getCategoryOutcomeAsync')
  }
}

function* createDebtEntryAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.createNewEntry], {
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: 'general',
      amount: payload.amount || 0,
      entry_type: 'debt',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      emissor: payload.receiver_name,
      email: payload.email,
      phone: payload.phonenumber,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      frecuency_type: payload.frecuency_type,
      frecuency_time: payload.frecuency_time,
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryCreateParams)
    yield put(actionObject(CREATE_DEBT_ENTRY_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'createDebtEntryAsync')
  }
}

function* getDebtAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.fetchEntry], payload.id || 0)
    yield put(actionObject(GET_DEBT_ASYNC, entry))
  } catch (error) {
    yield* handleError(error as Error, 'getDebtAsync')
  }
}

function* updateDebtAsync({payload}: Action): Generator<any, void, Entry | null> {
  try {
    const entryService = useEntryService()
    const entry = yield call([entryService, entryService.updateExistingEntry], {
      id: payload.id || 0,
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: 'debt',
      amount: payload.amount || 0,
      entry_type: 'debt',
      payment_concept: payload.concept || '',
      comment: payload.comment,
      emissor: payload.receiver_name,
      email: payload.email,
      phone: payload.phonenumber,
      status: new Date(payload.date || Date.now()) <= new Date() ? 'paid' : 'pending',
      frecuency_type: payload.frecuency_type,
      frecuency_time: payload.frecuency_time,
      status_level: payload.status_level,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    } as EntryUpdateParams)
    yield put(actionObject(UPDATE_DEBT_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getOutcomes())
  } catch (error) {
    yield* handleError(error as Error, 'updateDebtAsync')
  }
}

function* deleteDebtAsync({payload}: Action): Generator<any, void, boolean> {
  try {
    const entryService = useEntryService()
    yield call([entryService, entryService.removeEntry], payload.id || 0)
    yield put(actionObject(DELETE_DEBT_ASYNC, payload))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getOutcomes())
  } catch (error) {
    yield* handleError(error as Error, 'deleteDebtAsync')
  }
}

// Watchers
export function* watchCreateOutcome(): Generator {
  yield takeLatest(CREATE_OUTCOME, createOutcomeAsync)
}

export function* watchGetOutcomes(): Generator {
  yield takeLatest(GET_OUTCOMES, getOutcomesAsync)
}

export function* watchCreateBasicExpenses(): Generator {
  yield takeLatest(CREATE_BASIC_EXPENSES, createBasicExpensesAsync)
}

export function* watchCreateOutcomeCategory(): Generator {
  yield takeLatest(CREATE_OUTCOME_CATEGORY, createOutcomeCategoryAsync)
}

export function* watchGetBasicExpenses(): Generator {
  yield takeLatest(GET_BASIC_EXPENSES, getBasicExpensesAsync)
}

export function* watchGetBasicExpense(): Generator {
  yield takeLatest(GET_BASIC_EXPENSE, getBasicExpenseAsync)
}

export function* watchUpdateBasicExpense(): Generator {
  yield takeLatest(UPDATE_BASIC_EXPENSE, updateBasicExpenseAsync)
}

export function* watchDeleteOutcome(): Generator {
  yield takeLatest(DELETE_OUTCOME, deleteOutcomeAsync)
}

export function* watchGetCategoryOutcome(): Generator {
  yield takeLatest(GET_CATEGORY_OUTCOME, getCategoryOutcomeAsync)
}

export function* watchUpdateCategoryOutcome(): Generator {
  yield takeLatest(UPDATE_CATEGORY_OUTCOME, updateCategoryOutcomeAsync)
}

export function* watchDeleteCategoryOutcome(): Generator {
  yield takeLatest(DELETE_CATEGORY_OUTCOME, deleteCategoryOutcomeAsync)
}

export function* watchGetDebts(): Generator {
  yield takeLatest(GET_DEBTS, getDebtsAsync)
}

export function* watchGetDebt(): Generator {
  yield takeLatest(GET_DEBT, getDebtAsync)
}

export function* watchCreateDebt(): Generator {
  yield takeLatest(CREATE_DEBT, createDebtAsync)
}

export function* watchUpdateDebt(): Generator {
  yield takeLatest(UPDATE_DEBT, updateDebtAsync)
}

export function* watchDeleteDebt(): Generator {
  yield takeLatest(DELETE_DEBT, deleteDebtAsync)
}

export function* watchCreateDebtEntry(): Generator {
  yield takeLatest(CREATE_DEBT_ENTRY, createDebtEntryAsync)
}
