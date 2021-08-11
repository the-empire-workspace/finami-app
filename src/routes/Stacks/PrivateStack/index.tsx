import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Dashboard } from '@screens'

const Stack = createNativeStackNavigator()

export const PrivateStack = () => {
  return (
    <Stack.Navigator screenOptions={{ animationTypeForReplace: 'pop', animation: 'slide_from_bottom', headerShown: false }} initialRouteName='Dashboard'>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  )
}

export default PrivateStack
