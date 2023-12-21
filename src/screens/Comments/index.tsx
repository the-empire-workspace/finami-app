import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Greetings, HiWelcome, Questions} from './elements'

const Stack = createNativeStackNavigator()

const Comments: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="hiWelcome">
      <Stack.Screen name="hiWelcome" component={HiWelcome} />
      <Stack.Screen name="questions" component={Questions} />
      <Stack.Screen name="greetings" component={Greetings} />
    </Stack.Navigator>
  )
}

export default Comments
