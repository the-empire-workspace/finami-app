import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  DetailPendingOutcome,
  EditPendingOutcome,
  MainPendingOutcome,
  NewPendingOutcome,
} from './elements'
import DeleteOutcome from './elements/DeleteOutcome'

const Stack = createNativeStackNavigator()

const PendingOutcome: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="pendingOutcomeMain">
      <Stack.Screen name="pendingOutcomeMain" component={MainPendingOutcome} />
      <Stack.Screen name="newPendingOutcome" component={NewPendingOutcome} />
      <Stack.Screen
        name="detailPendingOutcome"
        component={DetailPendingOutcome}
      />
      <Stack.Screen name="editPendingOutcome" component={EditPendingOutcome} />
      <Stack.Screen name="deleteOutcome" component={DeleteOutcome} />
    </Stack.Navigator>
  )
}

export default PendingOutcome
