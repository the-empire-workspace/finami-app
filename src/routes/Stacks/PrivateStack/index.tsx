import React, {useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {MainTab} from '../../Tabs'
import {
  Entry,
  ConcurrentPayment,
  Profile,
  Currencies,
  Accounts,
  NewOutcome,
} from '@screens'
import {useDispatch} from 'react-redux'
import {getCurrencyPrice} from 'store/actions'
import {ProfileDelete} from 'screens/Profile/elements'
import {FixedIncome, PendingIncome} from 'screens/Incoming/elements'
import {
  NewFixedIncome,
  DetailsFixedIncome,
} from 'screens/Incoming/elements/FixedIncome/elements'
import {
  DetailsPendingIncome,
  NewPendingIncome,
} from 'screens/Incoming/elements/PendingIncome/elements/'
import DynamicCalculator from 'screens/DynamicCalculator'
import FinancialCalculator from 'screens/FinancialCalculator'
import Languages from 'screens/Language'

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
        options={{presentation: 'transparentModal'}}
      />
      <Stack.Screen
        name="deleteProfile"
        component={ProfileDelete}
        options={{presentation: 'transparentModal'}}
      />
      <Stack.Screen
        name="detailsPendingIncome"
        component={DetailsPendingIncome}
      />
      <Stack.Screen name="detailsFixedIncome" component={DetailsFixedIncome} />
      <Stack.Screen name="fixedIncoming" component={FixedIncome} />
      <Stack.Screen name="newFixedIncome" component={NewFixedIncome} />
      <Stack.Screen name="pendingIncoming" component={PendingIncome} />
      <Stack.Screen name="newPendingIncoming" component={NewPendingIncome} />
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
    </Stack.Navigator>
  )
}

export default PrivateStack
