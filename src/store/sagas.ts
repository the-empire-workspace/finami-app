import {all, fork} from 'redux-saga/effects'
import {watchGetCurrencies, watchGetDefaultPrice} from './currency/saga'
import {
  watchPushNotification,
  watchScheduleNotification,
} from './notification/saga'
import {watchCompleteOnboarding} from './onboarding/saga'
import {
  watchCreateCryptoAccount,
  watchCreateCurrencyAccount,
  watchDeleteAccount,
  watchDeleteSingleAccount,
  watchGetAccount,
  watchGetAccounts,
  watchGetDashboardValues,
  watchGetItem,
  watchGetTotalBalance,
  watchSignIn,
  watchUpdateLanguage,
  watchUpdateSingleAccount,
} from './account/saga'
import {
  watchCreateBasicExpenses,
  watchCreateDebt,
  watchCreateDebtEntry,
  watchCreateOutcome,
  watchCreateOutcomeCategory,
  watchDeleteCategoryOutcome,
  watchDeleteDebt,
  watchDeleteOutcome,
  watchGetBasicExpense,
  watchGetBasicExpenses,
  watchGetCategoryOutcome,
  watchGetDebt,
  watchGetDebts,
  watchGetOutcomes,
  watchUpdateBasicExpense,
  watchUpdateCategoryOutcome,
  watchUpdateDebt,
} from './outcoming/saga'

//import {watchGetIncoming, watchSetIncoming} from './incoming/saga'

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
    fork(watchGetAccounts),
    fork(watchCreateCryptoAccount),
    fork(watchCreateCurrencyAccount),
    fork(watchDeleteAccount),
    /* fork(watchGetIncoming),
    fork(watchSetIncoming), */
    fork(watchGetAccount),
    fork(watchDeleteSingleAccount),
    fork(watchUpdateSingleAccount),
    fork(watchUpdateLanguage),
    fork(watchCreateOutcome),
    fork(watchGetOutcomes),
    fork(watchCreateOutcomeCategory),
    fork(watchCreateBasicExpenses),
    fork(watchGetBasicExpenses),
    fork(watchGetBasicExpense),
    fork(watchUpdateBasicExpense),
    fork(watchDeleteOutcome),
    fork(watchGetCategoryOutcome),
    fork(watchUpdateCategoryOutcome),
    fork(watchDeleteCategoryOutcome),
    fork(watchGetDebts),
    fork(watchGetDebt),
    fork(watchCreateDebt),
    fork(watchUpdateDebt),
    fork(watchDeleteDebt),
    fork(watchCreateDebtEntry),
  ])
}
