/* import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native'

export const displayNotification = async () => {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  })

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
    },
  })
}

export const scheduleNofitication = async (
  date: number,
  title: any,
  body: any,
  id: any,
) => {
  const now = new Date().getTime()

  if (date < now) date = now + 5000

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date,
  }

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  })

  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
    },
    trigger,
  )
}
 */

export {}