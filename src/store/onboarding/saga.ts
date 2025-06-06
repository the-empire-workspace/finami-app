import {debugLog} from 'utils'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import {COMPLETE_ONBOARDING, COMPLETE_ONBOARDING_ASYNC} from './action-types'
import {
  actionObject,
  createAccountQuery,
  createEntryQuery,
  createUserQuery,
  getCurrenciesQuery,
} from 'utils'
import {signin} from 'store/actions'
import {selectCurrency, selectIntermitence} from 'store/selector'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'

function* completeOnboardingAsync({payload}: any): any {
  try {
    const {username, image, ...data} = payload

    const user = yield call(createUserQuery, {
      username,
      picture: image || null,
      currency: data?.principal_currency,
    })

    const account = yield call(createAccountQuery, {...data, user: user?.id})
    const {prices} = yield select(selectIntermitence)
    let {currencies} = yield select(selectCurrency)
    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    if (Number(payload?.available_balance))
      yield call(
        createEntryQuery,
        {
          account: account?.id,
          payment_type: 'general',
          amount: Number(payload?.available_balance),
          payment_concept: payload?.concept,
          entry_type: 'income',
          comment: '',
          emissor: '',
          email: '',
          phone: '',
          status: 'paid',
          date: new Date()?.getTime(),
        },
        currencies,
        prices,
      )
    yield put(signin())
    yield put(actionObject(COMPLETE_ONBOARDING_ASYNC, payload))
  } catch (error) {
    debugLog('error getting currencies', error)
  }
}

export function* watchCompleteOnboarding() {
  yield takeLatest(COMPLETE_ONBOARDING, completeOnboardingAsync)
}
