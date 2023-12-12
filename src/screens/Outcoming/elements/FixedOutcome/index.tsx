import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  DetailFixesOutcome,
  EditFixedOutcome,
  MainFixesOutcome,
  NewFixedOutcome,
} from './elements'
import DeleteOutcome from './elements/DeleteOutcome'

const Stack = createNativeStackNavigator()

const FixedOutcome: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="fixedOutcomeMain">
      <Stack.Screen name="fixedOutcomeMain" component={MainFixesOutcome} />
      <Stack.Screen name="newFixedOutcome" component={NewFixedOutcome} />
      <Stack.Screen name="detailFixesOutcome" component={DetailFixesOutcome} />
      <Stack.Screen name="editFixedOutcome" component={EditFixedOutcome} />
      <Stack.Screen name="deleteOutcome" component={DeleteOutcome} />
    </Stack.Navigator>
  )
}

export default FixedOutcome
