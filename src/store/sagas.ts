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
  watchDeleteEntry,
  watchDeleteSingleAccount,
  watchEditEntry,
  watchGetAccount,
  watchGetAccounts,
  watchGetDashboardValues,
  watchGetItem,
  watchGetTotalBalance,
  watchSendComments,
  watchSignIn,
  watchUpdateLanguage,
  watchUpdatePostponeEntry,
  watchUpdateSingleAccount,
  watchUpdateStatusEntry,
  watchUpdateUser,
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
import {
  watchCreateFixedIncomes,
  watchCreateIncome,
  watchCreateIncomeCategory,
  watchCreateReceivableAccount,
  watchCreateReceivableAccountEntry,
  watchDeleteCategoryIncome,
  watchDeleteIncome,
  watchDeleteReceivableAccount,
  watchGetCategoryIncome,
  watchGetFixedIncome,
  watchGetFixedIncomes,
  watchGetIncomes,
  watchGetReceivableAccount,
  watchGetReceivableAccounts,
  watchUpdateCategoryIncome,
  watchUpdateFixedIncome,
  watchUpdateReceivableAccount,
} from './incoming/saga'
import {
  watchCreateCategoryGoals,
  watchCreateGoals,
  watchCreateGoalsEntry,
  watchDeleteCategoryGoal,
  watchDeleteGoal,
  watchGetCategoryGoal,
  watchGetEntriesGoals,
  watchGetGoal,
  watchUpdateCategoryGoal,
  watchUpdateGoals,
} from './goals/saga'
import {watchGenerateReport} from './report/saga'

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

    fork(watchCreateIncome),
    fork(watchGetIncomes),
    fork(watchCreateIncomeCategory),
    fork(watchCreateFixedIncomes),
    fork(watchGetFixedIncomes),
    fork(watchGetFixedIncome),
    fork(watchUpdateFixedIncome),
    fork(watchDeleteIncome),
    fork(watchGetCategoryIncome),
    fork(watchUpdateCategoryIncome),
    fork(watchDeleteCategoryIncome),
    fork(watchGetReceivableAccounts),
    fork(watchGetReceivableAccount),
    fork(watchCreateReceivableAccount),
    fork(watchUpdateReceivableAccount),
    fork(watchDeleteReceivableAccount),
    fork(watchCreateReceivableAccountEntry),

    fork(watchGetEntriesGoals),
    fork(watchCreateCategoryGoals),
    fork(watchCreateGoals),
    fork(watchGetGoal),
    fork(watchGetCategoryGoal),
    fork(watchCreateGoalsEntry),
    fork(watchUpdateGoals),
    fork(watchUpdateCategoryGoal),
    fork(watchDeleteGoal),
    fork(watchDeleteCategoryGoal),

    fork(watchDeleteEntry),
    fork(watchEditEntry),
    fork(watchUpdateUser),
    fork(watchSendComments),
    fork(watchUpdatePostponeEntry),
    fork(watchUpdateStatusEntry),
    fork(watchGenerateReport),
  ])
}
