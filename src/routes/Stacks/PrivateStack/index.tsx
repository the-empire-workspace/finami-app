import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
export const PrivateStack = () => {


  return (
    <Stack.Navigator screenOptions={{ animationTypeForReplace: 'pop', animation: 'slide_from_bottom', headerShown: false }} initialRouteName='dashboard'>
    </Stack.Navigator>
  )
}

export default PrivateStack
