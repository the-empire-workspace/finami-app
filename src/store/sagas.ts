import {all, fork} from 'redux-saga/effects'
import {watchGetCurrencies, watchGetDefaultPrice} from './currency/saga'
import {
  watchPushNotification,
  watchScheduleNotification,
} from './notification/saga'
import {watchCompleteOnboarding} from './onboarding/saga'
import {
  watchGetDashboardValues,
  watchGetItem,
  watchGetTotalBalance,
  watchSignIn,
} from './account/saga'

export default function* rootSaga() {
  yield all([
    fork(watchGetDefaultPrice),
    fork(watchPushNotification),
    fork(watchScheduleNotification),
    fork(watchGetCurrencies),
    fork(watchCompleteOnboarding),
    fork(watchSignIn),
    fork(watchGetTotalBalance),
    fork(watchGetDashboardValues),
    fork(watchGetItem),
  ])
}
