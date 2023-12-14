import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTab } from '../../Tabs'
import {
  Entry,
  ConcurrentPayment,
  Profile,
  Currencies,
  Accounts,
  NewOutcome,
  NewIncome,
  EditEntry,
  EditProfile,
} from '@screens'
import { useDispatch } from 'react-redux'
import { getCurrencyPrice } from 'store/actions'
import { ProfileDelete } from 'screens/Profile/elements'
import DynamicCalculator from 'screens/DynamicCalculator'
import FinancialCalculator from 'screens/FinancialCalculator'
import Languages from 'screens/Language'
import DeleteEntry from 'screens/DeleteEntry'

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
      <Stack.Screen name="concurrentPayment" component={ConcurrentPayment} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="currencies" component={Currencies} />
      <Stack.Screen name="accounts" component={Accounts} />
      <Stack.Screen name="dynamicCalculator" component={DynamicCalculator} />
      <Stack.Screen
        name="financialCalculator"
        component={FinancialCalculator}
      />
      <Stack.Screen name="language" component={Languages} />
      <Stack.Screen name="newOutcome" component={NewOutcome} />
      <Stack.Screen name="newIncome" component={NewIncome} />
      <Stack.Screen name="deleteEntry" component={DeleteEntry} />
      <Stack.Screen name="editEntry" component={EditEntry} />
      <Stack.Screen name="editProfile" component={EditProfile} />
    </Stack.Navigator>
  )
}

export default PrivateStack
