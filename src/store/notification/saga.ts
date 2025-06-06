import {debugLog} from 'utils'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import notifee, {AndroidNotificationSetting} from '@notifee/react-native'
import {actionObject, translate} from 'utils'
import {finamiAPI} from 'utils/path'
import {useEntryService} from 'services'
import {useCurrencyService} from 'services'

import {selectAccount, selectCurrency, selectIntermitence} from '../selector'
import {PUSH_NOTIFICATION, SCHEDULE_NOTIFICATION} from './action-types'
import {GET_CURRENCIES_ASYNC} from 'store/currency/action-types'
import {Entry} from 'utils/database/models'

// Types
interface Payload {
  token?: string
  [key: string]: any
}

interface Action {
  payload: Payload
  type: string
}

interface Notification {
  id: string
  name: string
  type: string
  date: Date
  overdate: boolean
  difference?: number
  day?: boolean
}

// Helper functions
function* handleError(error: Error, context: string): Generator {
  debugLog(error, `Error in ${context}`)
}

const processNotification = (entries: Entry[]): Notification[] => {
  return entries.map(entry => ({
    id: entry.id.toString(),
    name: entry.payment_concept,
    type: entry.entry_type,
    date: new Date(entry.date),
    overdate: new Date(entry.date) < new Date(),
  }))
}

const processNotificationDebts = (entries: Entry[]): Notification[] => {
  return entries.map(entry => ({
    id: entry.id.toString(),
    name: entry.payment_concept,
    type: entry.entry_type,
    date: new Date(entry.date),
    overdate: new Date(entry.date) < new Date(),
    difference: Math.abs(Math.ceil((new Date(entry.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))),
    day: true,
  }))
}

const scheduleNotification = async (
  date: Date,
  title: string,
  body: string,
  id: string,
): Promise<void> => {
  await notifee.createTriggerNotification(
    {
      title,
      body,
      id,
    },
    {
      type: 0, // TIMESTAMP type
      timestamp: date.getTime(),
    },
  )
}

// Saga functions
function* pushNotificationAsync({payload}: Action): Generator<any, void, any> {
  try {
    const {tokenNotifications} = yield select(selectAccount)
    if (tokenNotifications) {
      const result = yield call(
        fetch,
        `${finamiAPI}notification/alarm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: tokenNotifications}),
        },
      )
      debugLog(result)
    }
  } catch (error) {
    yield* handleError(error as Error, 'pushNotificationAsync')
  }
}

function* scheduleNotificationsAsync(): Generator<any, void, any> {
  try {
    const entryService = useEntryService()
    const currencyService = useCurrencyService()
    
    let {currencies} = yield select(selectCurrency)
    const {user} = yield select(selectAccount)
    const {prices} = yield select(selectIntermitence)

    if (!currencies?.length) {
      currencies = yield call([currencyService, currencyService.fetchCurrencies])
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const fetchEntries = function* (filters: any): Generator<any, Entry[], any> {
      return yield call(entryService.fetchEntries, filters)
    }

    const incomes = yield call(fetchEntries, {entry_type: 'income'})
    const incomesReceivable = yield call(fetchEntries, {
      entry_type: 'receivable',
      currency_id: user?.currency_id,
    })
    const outcomeDebts = yield call(fetchEntries, {
      entry_type: 'debt',
      currency_id: user?.currency_id,
    })

    const notIncomes = processNotification(incomes)
    const notIncomesReceivable = processNotificationDebts([
      ...incomesReceivable,
      ...outcomeDebts,
    ])

    const notifications = [...notIncomes]
    const settings = yield call(notifee.getNotificationSettings)
    yield call(notifee.requestPermission)
    
    if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
      yield call(notifee.openAlarmPermissionSettings)
    }

    for (const notification of notIncomesReceivable) {
      const message = {
        title: notification.name,
        body: '',
      }

      if (notification.overdate) {
        message.body = translate(`overdate_${notification.type}_body`)
      }

      if (!notification.overdate) {
        message.body =
          translate(`no_overdate_${notification.type}_body`) +
          ` ${notification?.difference} ` +
          translate(notification?.day ? 'day' : 'month')
      }

      yield call(scheduleNotification,
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

      if (notification.overdate) {
        message.body = translate(`overdate_${notification.type}_body`)
      }

      if (!notification.overdate) {
        message.body = translate(`no_overdate_${notification.type}_body`)
      }

      yield call(scheduleNotification,
        notification.date,
        message.title,
        message.body,
        notification.id,
      )
    }
  } catch (error) {
    yield* handleError(error as Error, 'scheduleNotificationsAsync')
  }
}

// Watchers
export function* watchPushNotification(): Generator {
  yield takeLatest(PUSH_NOTIFICATION, pushNotificationAsync)
}

export function* watchScheduleNotification(): Generator {
  yield takeLatest(SCHEDULE_NOTIFICATION, scheduleNotificationsAsync)
}
