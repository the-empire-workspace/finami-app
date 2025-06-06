import React, { FC, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import AppNavigator from '@routes'
import { setI18nConfig } from '@utils'
import { useSelector, useDispatch } from 'react-redux'
import { scheduleNotification, signin } from 'store/actions'
import notifee, { EventType } from '@notifee/react-native'
import { emitter } from 'utils/eventEmitter'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform } from 'react-native'

const Main: FC = () => {
  const { user, isAuth, dashboardValues } = useSelector(
    (state: any) => state.account,
  )
  const dispatch = useDispatch()
  const router: any = useNavigation()

  const checkInformation = useCallback(
    (data: string) => {
      const dataArray = data.split('-')
      if (dataArray[2]) {
        if (dataArray[2] === 'receivable_account')
          router?.navigate('Incoming', {
            screen: 'pendingIncome',
            params: {
              screen: 'detailPendingIncome',
              params: { id: dataArray[1], type: 'income' },
            },
          })
        if (dataArray[2] === 'debt')
          router.navigate('Outcoming', {
            screen: 'pendingOutcome',
            params: {
              screen: 'detailPendingOutcome',
              params: { id: dataArray[1], type: 'outcome' },
            },
          })
        return
      }
      if (dataArray[1]) router?.navigate('entry', { id: dataArray[1] })
    },
    [dashboardValues],
  )

  useEffect(() => {
    dispatch(scheduleNotification())
  }, [])

  useEffect(() => {
    const listener = emitter.addListener('check_notification', checkInformation)

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          checkInformation(detail?.notification?.id || '')
          break
      }
    })

    return () => {
      listener.remove()
      unsubscribe()
    }
  }, [checkInformation])

  useEffect(() => {
    if (!isAuth) {
      dispatch(signin())
      setI18nConfig()
    }
    if (isAuth) setI18nConfig(user?.language)
  }, [isAuth, user])

  return (
    <KeyboardAvoidingView style={[styles.root]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={[styles.root]}>
        <AppNavigator />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Main
