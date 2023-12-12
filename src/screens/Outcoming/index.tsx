import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {FixedOutcome, MainOutcoming, PendingOutcome} from './elements'

const Stack = createNativeStackNavigator()

const Outcoming: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="outcomingMain">
      <Stack.Screen name="outcomingMain" component={MainOutcoming} />
      <Stack.Screen name="fixedOutcome" component={FixedOutcome} />
      <Stack.Screen name="pendingOutcome" component={PendingOutcome} />
    </Stack.Navigator>
  )
}

export default Outcoming
