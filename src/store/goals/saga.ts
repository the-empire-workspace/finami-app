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
import {
  actionObject,
  createCategoryQuery,
  createEntryQuery,
  deleteCategoryQuery,
  deleteEntryQuery,
  getCategoryQuery,
  getCurrenciesQuery,
  getEntriesGoalsQuery,
  getGoalQuery,
  getGoalsCategoriesQuery,
  orderBy,
  updateCategoryQuery,
  updateEntryQuery,
} from 'utils'
import {getDashboardValues, getTotalBalance} from 'store/actions'
import {selectAccount, selectCurrency} from 'store/selector'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'

function* getEntriesGoalsAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const goals = yield call(
      getEntriesGoalsQuery,
      payload,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(getGoalsCategoriesQuery, payload)
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(actionObject(GET_ENTRIES_GOALS_ASYNC, orderMix))
  } catch (error) {
    console.log(error)
  }
}

function* createCategoryGoalsAsync({payload}: any): any {
  try {
    yield call(createCategoryQuery, {
      name: payload?.concept,
      type: payload?.type,
      comment: payload?.comment || '',
      date: (payload?.date || new Date())?.getTime(),
    })

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const goals = yield call(
      getEntriesGoalsQuery,
      payload?.type,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(getGoalsCategoriesQuery, payload?.type)
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(actionObject(CREATE_CATEGORY_GOALS_ASYNC, orderMix))
  } catch (error) {
    console.log(error)
  }
}

function* createGoalsAsync({payload}: any): any {
  try {
    yield call(createEntryQuery, {
      account: payload?.account,
      payment_type: payload?.type,
      category_id: payload?.category_id,
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'goals',
      comment: payload?.comment || '',
      date: (payload?.date || new Date())?.getTime(),
      limit_date: (payload?.limit_date || new Date())?.getTime(),
      status_level: payload?.status_level || '',
    })

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const goals = yield call(
      getEntriesGoalsQuery,
      payload?.type,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(getGoalsCategoriesQuery, payload?.type)
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(actionObject(CREATE_GOALS_ASYNC, orderMix))
    if (payload?.category_id) {
      const category = yield call(
        getCategoryQuery,
        payload?.category_id,
        currencies,
        user?.currency_id,
      )
      yield put(actionObject(GET_CATEGORY_GOAL_ASYNC, category))
    }
    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    console.log(error)
  }
}

function* getGoalAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)
    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const goal = yield call(
      getGoalQuery,
      payload,
      currencies,
      user?.currency_id,
    )
    yield put(actionObject(GET_GOAL_ASYNC, goal))
  } catch (error) {
    console.log(error)
  }
}

function* getCategoryGoalAsync({payload}: any): any {
  try {
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)
    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const category = yield call(
      getCategoryQuery,
      payload,
      currencies,
      user?.currency_id,
    )
    yield put(actionObject(GET_CATEGORY_GOAL_ASYNC, category))
  } catch (error) {
    console.log(error)
  }
}

function* createGoalsEntryAsync({payload}: any): any {
  try {
    yield call(createEntryQuery, {
      account: payload?.account,
      payment_type: 'general',
      category_id: payload?.category_id,
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'goals',
      comment: payload?.comment || '',
      entry_id: payload?.entry_id || '',
    })

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const goals = yield call(
      getEntriesGoalsQuery,
      payload?.type,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(getGoalsCategoriesQuery, payload?.type)
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    const item = yield call(
      getGoalQuery,
      payload?.id,
      currencies,
      user?.currency_id,
    )

    yield put(
      actionObject(CREATE_GOAL_ENTRY_ASYNC, {
        item: item,
        items: orderMix,
      }),
    )

    yield put(getDashboardValues())
    yield put(getTotalBalance())
  } catch (error) {
    console.log(error)
  }
}

function* updateGoalsAsync({payload}: any): any {
  try {
    yield call(updateEntryQuery, payload?.id, {
      account: payload?.account,
      payment_type: payload?.payment_type,
      category_id: payload?.category_id,
      amount: payload?.amount,
      payment_concept: payload?.concept,
      entry_type: 'goals',
      comment: payload?.comment || '',
      date: (payload?.date || new Date())?.getTime(),
      limit_date: (payload?.limit_date || new Date())?.getTime(),
      status_level: payload?.status_level || '',
    })

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const goals = yield call(
      getEntriesGoalsQuery,
      payload?.payment_type,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(
      getGoalsCategoriesQuery,
      payload?.payment_type,
    )
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    const item = yield call(
      getGoalQuery,
      payload?.id,
      currencies,
      user?.currency_id,
    )

    yield put(
      actionObject(UPDATE_GOAL_ASYNC, {
        item: item,
        items: orderMix,
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

function* updateCategoryGoalAsync({payload}: any): any {
  try {
    yield call(
      updateCategoryQuery,
      {
        name: payload?.concept,
        comment: payload?.comment || '',
      },
      payload?.id,
    )

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const goals = yield call(
      getEntriesGoalsQuery,
      payload?.type,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(getGoalsCategoriesQuery, payload?.type)
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    const category = yield call(
      getCategoryQuery,
      payload?.id,
      currencies,
      user?.currency_id,
    )

    yield put(
      actionObject(UPDATE_CATEGORY_GOAL_ASYNC, {
        items: orderMix,
        item: category,
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

function* deleteCategoryGoalAsync({payload}: any): any {
  try {
    yield call(deleteCategoryQuery, payload?.id)

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const goals = yield call(
      getEntriesGoalsQuery,
      payload?.type,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(getGoalsCategoriesQuery, payload?.type)
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(DELETE_CATEGORY_GOAL_ASYNC, {
        items: orderMix,
        item: {},
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

function* deleteGoalAsync({payload}: any): any {
  try {
    yield call(deleteEntryQuery, payload?.id)

    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const goals = yield call(
      getEntriesGoalsQuery,
      payload?.type,
      currencies,
      user?.currency_id,
    )
    const categories = yield call(getGoalsCategoriesQuery, payload?.type)
    const mix = [...goals, ...categories]
    const orderMix = orderBy(mix, 'date', 'desc')

    yield put(
      actionObject(DELETE_GOAL_ASYNC, {
        items: orderMix,
        item: {},
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

export function* watchGetEntriesGoals() {
  yield takeLatest(GET_ENTRIES_GOALS, getEntriesGoalsAsync)
}
export function* watchCreateCategoryGoals() {
  yield takeLatest(CREATE_CATEGORY_GOALS, createCategoryGoalsAsync)
}

export function* watchCreateGoals() {
  yield takeLatest(CREATE_GOALS, createGoalsAsync)
}

export function* watchGetGoal() {
  yield takeLatest(GET_GOAL, getGoalAsync)
}

export function* watchGetCategoryGoal() {
  yield takeLatest(GET_CATEGORY_GOAL, getCategoryGoalAsync)
}

export function* watchCreateGoalsEntry() {
  yield takeLatest(CREATE_GOAL_ENTRY, createGoalsEntryAsync)
}

export function* watchUpdateGoals() {
  yield takeLatest(UPDATE_GOAL, updateGoalsAsync)
}

export function* watchUpdateCategoryGoal() {
  yield takeLatest(UPDATE_CATEGORY_GOAL, updateCategoryGoalAsync)
}

export function* watchDeleteGoal() {
  yield takeLatest(DELETE_GOAL, deleteGoalAsync)
}

export function* watchDeleteCategoryGoal() {
  yield takeLatest(DELETE_CATEGORY_GOAL, deleteCategoryGoalAsync)
}
