import { all, fork } from 'redux-saga/effects'
import { watchGetDefaultPrice } from './currency/saga'

export default function* rootSaga() {
  yield all([
    fork(watchGetDefaultPrice)
  ])
}
