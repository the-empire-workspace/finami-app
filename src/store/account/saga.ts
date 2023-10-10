import {call, put, takeLatest} from 'redux-saga/effects'
import {SIGNIN, SIGNIN_ASYNC} from './action-types'
import {actionObject, getUserQuery} from 'utils'

function* signInAsync(): any {
  try {
    const user = yield call(getUserQuery)
    if (user) yield put(actionObject(SIGNIN_ASYNC, user))
  } catch (error) {
    console.log('error signing in user', error)
  }
}

export function* watchSignIn() {
  yield takeLatest(SIGNIN, signInAsync)
}
