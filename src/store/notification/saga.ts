import {call, select, takeLatest} from 'redux-saga/effects'
import {
  FetchService,
  processNotification,
  scheduleNofitication,
  translate,
} from 'utils'
import {finamiAPI} from 'utils/path'

import {selectAccount, selectIncoming, selectOutcoming} from '../selector'
import {PUSH_NOTIFICATION, SCHEDULE_NOTIFICATION} from './action-types'

function* pushNotificationAsync(): any {
  try {
    const {tokenNotifications} = yield select(selectAccount)
    if (tokenNotifications) {
      const result = yield call(
        FetchService,
        `${finamiAPI}notification/alarm`,
        'POST',
        {token: tokenNotifications},
      )
      console.log(result)
    }
  } catch (error) {
    console.log(error)
  }
}

function* scheduleNotificationsAsync(): any {
  try {
    const {items: incomings} = yield select(selectIncoming)
    const {items: outcomings} = yield select(selectOutcoming)

    const notIncomings = processNotification(incomings, 'incomings', 'in')
    const notOutcomings = processNotification(outcomings, 'outcomings', 'out')

    const notifications = [...notIncomings, ...notOutcomings]

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
