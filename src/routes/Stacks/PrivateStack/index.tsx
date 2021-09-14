import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTab } from '../../Tabs'
import { useTheme } from 'providers'

const Stack = createNativeStackNavigator()

export const PrivateStack = () => {
  const { colors } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="main"
    >
      <Stack.Screen
        name="main"
        component={MainTab}
        initialParams={{ colors }}
      />
    </Stack.Navigator>
  )
}

export default PrivateStack
