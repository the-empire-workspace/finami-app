import {actionObject} from '@utils'
import {
  PUSH_NOTIFICATION,
  ALARM_NOTIFICATION,
  SCHEDULE_NOTIFICATION,
} from './action-types'

export const pushNotification = () => actionObject(PUSH_NOTIFICATION)

export const alarmNotification = () => actionObject(ALARM_NOTIFICATION)

export const scheduleNotification = () => actionObject(SCHEDULE_NOTIFICATION)
