import {call, put, takeLatest} from 'redux-saga/effects'
import {COMPLETE_ONBOARDING, COMPLETE_ONBOARDING_ASYNC} from './action-types'
import {
  actionObject,
  createAccountQuery,
  createEntryQuery,
  createUserQuery,
} from 'utils'
import {signin} from 'store/actions'

function* completeOnboardingAsync({payload}: any): any {
  try {
    const {username, image, ...data} = payload
    const user = yield call(createUserQuery, {username, picture: image || null})
    const account = yield call(createAccountQuery, {...data, user: user?.id})
    yield call(createEntryQuery, {
      user: user?.id,
      account: account?.id,
      payment_type: 'general',
      amount: data?.available_balance,
      payment_concept: 'initial',
      entry_type: 'income',
      comment: '',
      emissor: '',
      email: '',
      phone: '',
      date: new Date()?.getTime(),
    })
    yield put(signin())
    yield put(actionObject(COMPLETE_ONBOARDING_ASYNC, payload))
  } catch (error) {
    console.log('error getting currencies', error)
  }
}

export function* watchCompleteOnboarding() {
  yield takeLatest(COMPLETE_ONBOARDING, completeOnboardingAsync)
}
