import { call, put, select, takeLatest } from 'redux-saga/effects'
import notifee, { AndroidNotificationSetting } from '@notifee/react-native'
import {
  FetchService,
  actionObject,
  getCurrenciesQuery,
  getDebtsQuery,
  getEntriesQuery,
  getReceivableAccountsQuery,
  processNotification,
  processNotificationDebts,
  scheduleNofitication,
  translate,
} from 'utils'
import { finamiAPI } from 'utils/path'

import { selectAccount, selectCurrency, selectIntermitence } from '../selector'
import { PUSH_NOTIFICATION, SCHEDULE_NOTIFICATION } from './action-types'
import { GET_CURRENCIES_ASYNC } from 'store/currency/action-types'

function* pushNotificationAsync(): any {
  try {
    const { tokenNotifications } = yield select(selectAccount)
    if (tokenNotifications) {
      const result = yield call(
        FetchService,
        `${finamiAPI}notification/alarm`,
        'POST',
        { token: tokenNotifications },
      )
      console.log(result)
    }
  } catch (error) {
    console.log(error)
  }
}

function* scheduleNotificationsAsync(): any {
  try {
    let { currencies } = yield select(selectCurrency)
    const { user } = yield select(selectAccount)
    const { prices } = yield select(selectIntermitence)

    if (!currencies?.length) {
      currencies = yield call(getCurrenciesQuery)
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }
    const incomes = yield call(getEntriesQuery)

    const incomesReceivable = yield call(
      getReceivableAccountsQuery,
      currencies,
      user?.currency_id,
      prices
    )

    const outcomeDebts = yield call(
      getDebtsQuery,
      currencies,
      user?.currency_id,
      prices
    )

    const notIncomes = processNotification(incomes)

    const notIncomesReceivable = processNotificationDebts([
      ...incomesReceivable,
      ...outcomeDebts,
    ])

    const notifications = [...notIncomes]
    const settings = yield call(notifee.getNotificationSettings)
    yield call(notifee.requestPermission)
    if (settings.android.alarm !== AndroidNotificationSetting.ENABLED)
      yield call(notifee.openAlarmPermissionSettings)

    for (const notification of notIncomesReceivable) {
      const message = {
        title: notification.name,
        body: '',
      }

      if (notification.overdate)
        message.body = translate(`overdate_${notification.type}_body`)

      if (!notification.overdate)
        message.body =
          translate(`no_overdate_${notification.type}_body`) +
          ` ${notification?.difference} ` +
          translate(notification?.day ? 'day' : 'month')

      scheduleNofitication(
        notification.date,
        message.title,
        message.body,
        notification.id,
      )
    }

    for (const notification of notifications) {
      const message = {
        title: notification.name,
        body: '',
      }

      if (notification.overdate)
        message.body = translate(`overdate_${notification.type}_body`)

      if (!notification.overdate)
        message.body = translate(`no_overdate_${notification.type}_body`)

      scheduleNofitication(
        notification.date,
        message.title,
        message.body,
        notification.id,
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export function* watchPushNotification() {
  yield takeLatest(PUSH_NOTIFICATION, pushNotificationAsync)
}

export function* watchScheduleNotification() {
  yield takeLatest(SCHEDULE_NOTIFICATION, scheduleNotificationsAsync)
}
