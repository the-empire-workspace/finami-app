import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {StepFour, StepOne, StepThree, StepTwo, Welcome} from '@screens'

const Stack = createNativeStackNavigator()

export const PublicStack = () => (
  <Stack.Navigator
    screenOptions={{
      animationTypeForReplace: 'pop',
      animation: 'slide_from_right',
      headerShown: false,
    }}
    initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="StepOne" component={StepOne} />
    <Stack.Screen name="StepTwo" component={StepTwo} />
    <Stack.Screen name="StepThree" component={StepThree} />
    <Stack.Screen name="StepFour" component={StepFour} />
  </Stack.Navigator>
)

export default PublicStack
