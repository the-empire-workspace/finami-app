import {debugLog} from 'utils'
import {call, put, select, takeLatest, SelectEffect, CallEffect, PutEffect} from 'redux-saga/effects'
import {
  CREATE_FIXED_INCOMES,
  CREATE_FIXED_INCOMES_ASYNC,
  CREATE_RECEIVABLE_ACCOUNT,
  CREATE_RECEIVABLE_ACCOUNT_ASYNC,
  CREATE_RECEIVABLE_ACCOUNT_ENTRY,
  CREATE_RECEIVABLE_ACCOUNT_ENTRY_ASYNC,
  CREATE_INCOME,
  CREATE_INCOME_ASYNC,
  CREATE_INCOME_CATEGORY,
  CREATE_INCOME_CATEGORY_ASYNC,
  DELETE_CATEGORY_INCOME,
  DELETE_RECEIVABLE_ACCOUNT,
  DELETE_RECEIVABLE_ACCOUNT_ASYNC,
  DELETE_INCOME,
  DELETE_INCOME_ASYNC,
  GET_FIXED_INCOME,
  GET_FIXED_INCOMES,
  GET_FIXED_INCOMES_ASYNC,
  GET_FIXED_INCOME_ASYNC,
  GET_CATEGORY_INCOME,
  GET_CATEGORY_INCOME_ASYNC,
  GET_RECEIVABLE_ACCOUNT,
  GET_RECEIVABLE_ACCOUNTS,
  GET_RECEIVABLE_ACCOUNTS_ASYNC,
  GET_RECEIVABLE_ACCOUNT_ASYNC,
  GET_INCOMES,
  GET_INCOMES_ASYNC,
  UPDATE_FIXED_INCOME,
  UPDATE_FIXED_INCOME_ASYNC,
  UPDATE_CATEGORY_INCOME,
  UPDATE_RECEIVABLE_ACCOUNT,
  UPDATE_RECEIVABLE_ACCOUNT_ASYNC,
} from './action-types'
import {actionObject} from 'utils'
import {getDashboardValues, getIncomes, getTotalBalance} from 'store/actions'
import {selectAccount, selectCurrency, selectIntermitence} from 'store/selector'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'
import {useEntryService} from 'services'
import {useCategoryService} from 'services'
import {useAccountService} from 'services'
import {useCurrencyService} from 'services'
import {Entry, Category, Account, EntryCreateParams, EntryUpdateParams, CategoryCreateParams} from 'utils/database/models'

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
  name?: string
  payment_type?: string
  payment_concept?: string
  [key: string]: any
}

interface Action {
  payload: Payload
  type: string
}

interface AccountState {
  user: {
    currency_id?: number
    [key: string]: any
  }
}

interface CurrencyState {
  currencies: any[]
  [key: string]: any
}

interface IntermitenceState {
  prices: any
  [key: string]: any
}

// Helper functions
function* handleError(error: Error, context: string): Generator<never, void, unknown> {
  debugLog(error, `Error in ${context}`)
}

// Service calls
function* fetchEntries(type: string): Generator<CallEffect<Entry[]>, Entry[], Entry[]> {
  const entryService = useEntryService()
  return yield call([entryService, entryService.fetchEntries], {entry_type: type})
}

function* fetchEntry(id: number): Generator<CallEffect<Entry | null>, Entry, Entry> {
  const entryService = useEntryService()
  const entry = yield call([entryService, entryService.fetchEntry], id)
  if (!entry) throw new Error(`Entry with id ${id} not found`)
  return entry
}

function* createEntry(params: EntryCreateParams): Generator<CallEffect<Entry | null>, Entry, Entry> {
  const entryService = useEntryService()
  const entry = yield call([entryService, entryService.createNewEntry], params)
  if (!entry) throw new Error('Failed to create entry')
  return entry
}

function* updateEntry(params: EntryUpdateParams): Generator<CallEffect<Entry | null>, Entry, Entry> {
  const entryService = useEntryService()
  const entry = yield call([entryService, entryService.updateExistingEntry], params)
  if (!entry) throw new Error(`Failed to update entry with id ${params.id}`)
  return entry
}

function* removeEntry(id: number): Generator<CallEffect<boolean>, void, void> {
  const entryService = useEntryService()
  yield call([entryService, entryService.removeEntry], id)
}

function* fetchCategory(id: number): Generator<CallEffect<Category | null>, Category, Category> {
  const categoryService = useCategoryService()
  const category = yield call([categoryService, categoryService.fetchCategory], id)
  if (!category) throw new Error(`Category with id ${id} not found`)
  return category
}

function* createCategory(params: CategoryCreateParams): Generator<CallEffect<Category | null>, Category, Category> {
  const categoryService = useCategoryService()
  const category = yield call([categoryService, categoryService.createNewCategory], params)
  if (!category) throw new Error('Failed to create category')
  return category
}

function* updateCategory(params: CategoryCreateParams & {id: number}): Generator<CallEffect<Category | null>, Category, Category> {
  const categoryService = useCategoryService()
  const category = yield call([categoryService, categoryService.updateExistingCategory], params)
  if (!category) throw new Error(`Failed to update category with id ${params.id}`)
  return category
}

function* removeCategory(id: number): Generator<CallEffect<boolean>, void, void> {
  const categoryService = useCategoryService()
  yield call([categoryService, categoryService.removeCategory], id)
}

function* fetchAccounts(currencies: any[], prices: any, user: any): Generator<CallEffect<Account[]>, Account[], Account[]> {
  const accountService = useAccountService()
  return yield call([accountService, accountService.fetchAccounts], currencies, prices, user)
}

function* fetchAccount(currencies: any[], id: number, prices: any, user: any): Generator<CallEffect<Account | null>, Account, Account> {
  const accountService = useAccountService()
  const account = yield call([accountService, accountService.fetchAccount], currencies, id, prices, user)
  if (!account) throw new Error(`Account with id ${id} not found`)
  return account
}

function* createAccount(params: any): Generator<CallEffect<Account | null>, Account, Account> {
  const accountService = useAccountService()
  const account = yield call([accountService, accountService.createNewAccount], params)
  if (!account) throw new Error('Failed to create account')
  return account
}

function* updateAccount(params: any): Generator<CallEffect<Account | null>, Account, Account> {
  const accountService = useAccountService()
  const account = yield call([accountService, accountService.updateExistingAccount], params)
  if (!account) throw new Error(`Failed to update account with id ${params.id}`)
  return account
}

// Saga functions
function* getIncomesAsync(): Generator<CallEffect<Entry[]> | PutEffect, void, Entry[]> {
  try {
    const entries = yield* fetchEntries('income')
    yield put(actionObject(GET_INCOMES_ASYNC, entries))
  } catch (error) {
    yield* handleError(error as Error, 'getIncomesAsync')
  }
}

function* createIncomeAsync({payload}: Action): Generator<CallEffect<Entry | null> | PutEffect, void, Entry> {
  try {
    const entry = yield* createEntry({
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: payload.payment_type || 'cash',
      amount: payload.amount || 0,
      entry_type: 'income',
      payment_concept: payload.payment_concept || 'income',
      comment: payload.comment,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    })
    yield put(actionObject(CREATE_INCOME_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getIncomes())
  } catch (error) {
    yield* handleError(error as Error, 'createIncomeAsync')
  }
}

function* createIncomeCategoryAsync({payload}: Action): Generator<CallEffect<Category | null> | PutEffect, void, Category> {
  try {
    const category = yield* createCategory({
      name: payload.name || 'New Income Category',
      type: 'income',
      comment: payload.comment || '',
      date: new Date(payload.date || Date.now())
    })
    yield put(actionObject(CREATE_INCOME_CATEGORY_ASYNC, category))
  } catch (error) {
    yield* handleError(error as Error, 'createIncomeCategoryAsync')
  }
}

function* getFixedIncomesAsync(): Generator<CallEffect<Entry[]> | PutEffect, void, Entry[]> {
  try {
    const entries = yield* fetchEntries('fixed_incomes')
    yield put(actionObject(GET_FIXED_INCOMES_ASYNC, entries))
  } catch (error) {
    yield* handleError(error as Error, 'getFixedIncomesAsync')
  }
}

function* createFixedIncomesAsync({payload}: Action): Generator<CallEffect<Entry | null> | PutEffect, void, Entry> {
  try {
    const entry = yield* createEntry({
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: payload.payment_type || 'cash',
      amount: payload.amount || 0,
      entry_type: 'fixed_incomes',
      payment_concept: payload.payment_concept || 'fixed_income',
      comment: payload.comment,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    })
    yield put(actionObject(CREATE_FIXED_INCOMES_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getIncomes())
  } catch (error) {
    yield* handleError(error as Error, 'createFixedIncomesAsync')
  }
}

function* getReceivableAccountsAsync(): Generator<SelectEffect | CallEffect<Account[]> | PutEffect, void, Account[]> {
  try {
    const currencyState = (yield select(selectCurrency)) as unknown as CurrencyState
    const intermitenceState = (yield select(selectIntermitence)) as unknown as IntermitenceState
    const accountState = (yield select(selectAccount)) as unknown as AccountState
    const {currencies} = currencyState
    const {prices} = intermitenceState
    const {user} = accountState

    const accounts = yield* fetchAccounts(currencies, prices, user)
    yield put(actionObject(GET_RECEIVABLE_ACCOUNTS_ASYNC, accounts))
  } catch (error) {
    yield* handleError(error as Error, 'getReceivableAccountsAsync')
  }
}

function* createReceivableAccountAsync({payload}: Action): Generator<CallEffect<Account | null> | PutEffect, void, Account> {
  try {
    const account = yield* createAccount({
      ...payload,
      account_type: 'receivable'
    })
    yield put(actionObject(CREATE_RECEIVABLE_ACCOUNT_ASYNC, account))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'createReceivableAccountAsync')
  }
}

function* getFixedIncomeAsync({payload}: Action): Generator<CallEffect<Entry | null> | PutEffect, void, Entry> {
  try {
    const entry = yield* fetchEntry(payload.id || 0)
    yield put(actionObject(GET_FIXED_INCOME_ASYNC, entry))
  } catch (error) {
    yield* handleError(error as Error, 'getFixedIncomeAsync')
  }
}

function* updateFixedIncomeAsync({payload}: Action): Generator<CallEffect<Entry | null> | PutEffect, void, Entry> {
  try {
    const entry = yield* updateEntry({
      id: payload.id || 0,
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: payload.payment_type || 'cash',
      amount: payload.amount || 0,
      entry_type: 'fixed_incomes',
      payment_concept: payload.payment_concept || 'fixed_income',
      comment: payload.comment,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    })
    yield put(actionObject(UPDATE_FIXED_INCOME_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
    yield put(getIncomes())
  } catch (error) {
    yield* handleError(error as Error, 'updateFixedIncomeAsync')
  }
}

function* updateCategoryIncomeAsync({payload}: Action): Generator<CallEffect<Category | null> | PutEffect, void, Category> {
  try {
    const category = yield* updateCategory({
      id: payload.id || 0,
      name: payload.name || 'Updated Income Category',
      type: 'income',
      comment: payload.comment || '',
      date: new Date(payload.date || Date.now())
    })
    yield put(actionObject(UPDATE_CATEGORY_INCOME, category))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'updateCategoryIncomeAsync')
  }
}

function* deleteCategoryIncomeAsync({payload}: Action): Generator<CallEffect<boolean> | PutEffect, void, void> {
  try {
    yield* removeCategory(payload.id || 0)
    yield put(actionObject(DELETE_INCOME_ASYNC, payload))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'deleteCategoryIncomeAsync')
  }
}

function* deleteIncomeAsync({payload}: Action): Generator<CallEffect<boolean> | PutEffect, void, void> {
  try {
    yield* removeEntry(payload.id || 0)
    yield put(actionObject(DELETE_INCOME_ASYNC, payload))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'deleteIncomeAsync')
  }
}

function* getCategoryIncomeAsync({payload}: Action): Generator<CallEffect<Category | null> | PutEffect, void, Category> {
  try {
    const category = yield* fetchCategory(payload.id || 0)
    yield put(actionObject(GET_CATEGORY_INCOME_ASYNC, category))
  } catch (error) {
    yield* handleError(error as Error, 'getCategoryIncomeAsync')
  }
}

function* createReceivableAccountEntryAsync({payload}: Action): Generator<CallEffect<Entry | null> | PutEffect, void, Entry> {
  try {
    const entry = yield* createEntry({
      account_id: payload.account_id || 0,
      category_id: payload.category_id || 0,
      payment_type: payload.payment_type || 'cash',
      amount: payload.amount || 0,
      entry_type: 'receivable_account',
      payment_concept: payload.payment_concept || 'receivable',
      comment: payload.comment,
      date: new Date(payload.date || Date.now()),
      limit_date: payload.limit_date
    })
    yield put(actionObject(CREATE_RECEIVABLE_ACCOUNT_ENTRY_ASYNC, entry))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'createReceivableAccountEntryAsync')
  }
}

function* getReceivableAccountAsync({payload}: Action): Generator<SelectEffect | CallEffect<Account | null> | PutEffect, void, Account> {
  try {
    const currencyState = (yield select(selectCurrency)) as unknown as CurrencyState
    const intermitenceState = (yield select(selectIntermitence)) as unknown as IntermitenceState
    const accountState = (yield select(selectAccount)) as unknown as AccountState
    const {currencies} = currencyState
    const {prices} = intermitenceState
    const {user} = accountState

    const account = yield* fetchAccount(currencies, payload.id || 0, prices, user)
    yield put(actionObject(GET_RECEIVABLE_ACCOUNT_ASYNC, account))
  } catch (error) {
    yield* handleError(error as Error, 'getReceivableAccountAsync')
  }
}

function* updateReceivableAccountAsync({payload}: Action): Generator<CallEffect<Account | null> | PutEffect, void, Account> {
  try {
    const account = yield* updateAccount({
      id: payload.id || 0,
      ...payload,
      account_type: 'receivable'
    })
    yield put(actionObject(UPDATE_RECEIVABLE_ACCOUNT_ASYNC, account))
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    yield* handleError(error as Error, 'updateReceivableAccountAsync')
  }
}

// Watchers
export function* watchGetIncomes(): Generator {
  yield takeLatest(GET_INCOMES, getIncomesAsync)
}

export function* watchCreateIncome(): Generator {
  yield takeLatest(CREATE_INCOME, createIncomeAsync)
}

export function* watchCreateIncomeCategory(): Generator {
  yield takeLatest(CREATE_INCOME_CATEGORY, createIncomeCategoryAsync)
}

export function* watchGetFixedIncomes(): Generator {
  yield takeLatest(GET_FIXED_INCOMES, getFixedIncomesAsync)
}

export function* watchCreateFixedIncomes(): Generator {
  yield takeLatest(CREATE_FIXED_INCOMES, createFixedIncomesAsync)
}

export function* watchGetReceivableAccounts(): Generator {
  yield takeLatest(GET_RECEIVABLE_ACCOUNTS, getReceivableAccountsAsync)
}

export function* watchCreateReceivableAccount(): Generator {
  yield takeLatest(CREATE_RECEIVABLE_ACCOUNT, createReceivableAccountAsync)
}

export function* watchGetFixedIncome(): Generator {
  yield takeLatest(GET_FIXED_INCOME, getFixedIncomeAsync)
}

export function* watchUpdateFixedIncome(): Generator {
  yield takeLatest(UPDATE_FIXED_INCOME, updateFixedIncomeAsync)
}

export function* watchUpdateCategoryIncome(): Generator {
  yield takeLatest(UPDATE_CATEGORY_INCOME, updateCategoryIncomeAsync)
}

export function* watchDeleteCategoryIncome(): Generator {
  yield takeLatest(DELETE_CATEGORY_INCOME, deleteCategoryIncomeAsync)
}

export function* watchDeleteIncome(): Generator {
  yield takeLatest(DELETE_INCOME, deleteIncomeAsync)
}

export function* watchGetCategoryIncome(): Generator {
  yield takeLatest(GET_CATEGORY_INCOME, getCategoryIncomeAsync)
}

export function* watchCreateReceivableAccountEntry(): Generator {
  yield takeLatest(CREATE_RECEIVABLE_ACCOUNT_ENTRY, createReceivableAccountEntryAsync)
}

export function* watchGetReceivableAccount(): Generator {
  yield takeLatest(GET_RECEIVABLE_ACCOUNT, getReceivableAccountAsync)
}

export function* watchUpdateReceivableAccount(): Generator {
  yield takeLatest(UPDATE_RECEIVABLE_ACCOUNT, updateReceivableAccountAsync)
}
