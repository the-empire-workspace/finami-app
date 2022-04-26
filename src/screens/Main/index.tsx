import React, {FC, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {styles} from './styles'
import AppNavigator from '@routes'
import RNLocalize from 'react-native-localize'
import {setI18nConfig} from '@utils'
import {useSelector, useDispatch} from 'react-redux'
import {scheduleNotification} from 'store/actions'

const Main: FC = () => {
  const {
    account: {user},
  } = useSelector((state: any) => state)
  const dispatch = useDispatch()
  const handleLocalizationChange = () => {
    setI18nConfig(user?.language)
  }

  useEffect(() => {
    setI18nConfig(user?.language)
    dispatch(scheduleNotification())
    RNLocalize.addEventListener('change', handleLocalizationChange)
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange)
    }
  }, [])

  return (
    <SafeAreaView style={[styles.root]}>
      <AppNavigator />
    </SafeAreaView>
  )
}

export default Main
