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
import {useDispatch} from 'react-redux'
import {getCurrencyPrice} from 'store/actions'
import { ProfileDelete } from 'screens/Profile/elements'
import FixedIncome from 'screens/Incoming/FixedIncome'
import NewFixedIncome from 'screens/Incoming/NewFixedIncome'
import Incoming from 'screens/Incoming'
import PendingIncome from 'screens/Incoming/PendingIncome'
import NewPendingIncome from 'screens/Incoming/NewPendingIncome'


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
      <Stack.Screen name="Incoming" component={Incoming} />
      <Stack.Screen name="fixedIncoming" component={FixedIncome}/>
      <Stack.Screen name="newFixedIncome" component={NewFixedIncome}/>
      <Stack.Screen name="pendingIncoming" component={PendingIncome}/>
      <Stack.Screen name="newPendingIncoming" component={NewPendingIncome}/>
      <Stack.Screen name="concurrentPayment" component={ConcurrentPayment} />
      <Stack.Screen name="category" component={Category} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="currencies" component={Currencies} />
      <Stack.Screen name="accounts" component={Accounts} />
    </Stack.Navigator>
  )
}

export default PrivateStack
