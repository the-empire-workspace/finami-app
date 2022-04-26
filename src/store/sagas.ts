import {all, fork} from 'redux-saga/effects'
import {watchGetDefaultPrice} from './currency/saga'
import {
  watchPushNotification,
  watchScheduleNotification,
} from './notification/saga'

export default function* rootSaga() {
  yield all([
    fork(watchGetDefaultPrice),
    fork(watchPushNotification),
    fork(watchScheduleNotification),
  ])
}
