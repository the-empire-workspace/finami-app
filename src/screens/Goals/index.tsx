import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DeleteGoals, DetailGoals, EditGoals, MainGoals, NewGoals } from './elements'

const Stack = createNativeStackNavigator()

const Goals: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="mainGoals">
      <Stack.Screen name="mainGoals" component={MainGoals} />
      <Stack.Screen name="newGoals" component={NewGoals} />
      <Stack.Screen name="detailGoals" component={DetailGoals} />
      <Stack.Screen name="editGoals" component={EditGoals} />
      <Stack.Screen name="deleteGoals" component={DeleteGoals} />
    </Stack.Navigator>
  )
}

export default Goals
