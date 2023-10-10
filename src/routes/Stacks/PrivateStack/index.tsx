import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTab } from '../../Tabs'
import { Entry, ConcurrentPayment, Category } from '@screens'
import { useDispatch } from 'react-redux'
import { getCurrencyPrice } from 'store/actions'

const Stack = createNativeStackNavigator()

export const PrivateStack = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrencyPrice())
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="main">
      <Stack.Screen name="main" component={MainTab} />
      <Stack.Screen name="entry" component={Entry} />
      <Stack.Screen name="concurrentPayment" component={ConcurrentPayment} />
      <Stack.Screen name="category" component={Category} />
    </Stack.Navigator>
  )
}

export default PrivateStack
