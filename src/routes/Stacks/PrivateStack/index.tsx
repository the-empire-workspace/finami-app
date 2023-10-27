import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTab } from '../../Tabs'
import {
  Entry,
  ConcurrentPayment,
  Category,
  Profile,
  Currencies,
  Accounts,
} from '@screens'
import { useDispatch } from 'react-redux'
import { getCurrencyPrice } from 'store/actions'
import FixedIncome from 'screens/Incomings/FixedIncome'
import NewEntry from 'screens/Incomings/NewEntry'
import Incoming from 'screens/Incomings'
import { ProfileDelete } from 'screens/Profile/elements'

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
      <Stack.Screen
        name="entry"
        component={Entry}
        options={{ presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name="deleteProfile"
        component={ProfileDelete}
        options={{ presentation: 'transparentModal' }}
      />
      <Stack.Screen name="Incoming" options={{ presentation: 'transparentModal' }} component={Incoming} />
      <Stack.Screen name="fixedIncoming" component={FixedIncome} />
      <Stack.Screen name="newEntry" component={NewEntry} />
      <Stack.Screen name="concurrentPayment" component={ConcurrentPayment} />
      <Stack.Screen name="category" component={Category} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="currencies" component={Currencies} />
      <Stack.Screen name="accounts" component={Accounts} />
    </Stack.Navigator>
  )
}

export default PrivateStack
