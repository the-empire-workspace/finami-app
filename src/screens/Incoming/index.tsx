import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {FixedIncome, MainIncoming, PendingIncome} from './elements'

const Stack = createNativeStackNavigator()

const Incoming: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="incomingMain">
      <Stack.Screen name="incomingMain" component={MainIncoming} />
      <Stack.Screen name="fixedIncome" component={FixedIncome} />
      <Stack.Screen name="pendingIncome" component={PendingIncome} />
    </Stack.Navigator>
  )
}

export default Incoming
