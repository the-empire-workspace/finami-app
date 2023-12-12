import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  DetailPendingIncome,
  EditPendingIncome,
  MainPendingIncome,
  NewPendingIncome,
} from './elements'
import DeleteIncome from './elements/DeleteIncome'

const Stack = createNativeStackNavigator()

const PendingIncome: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="pendingIncomeMain">
      <Stack.Screen name="pendingIncomeMain" component={MainPendingIncome} />
      <Stack.Screen name="newPendingIncome" component={NewPendingIncome} />
      <Stack.Screen
        name="detailPendingIncome"
        component={DetailPendingIncome}
      />
      <Stack.Screen name="editPendingIncome" component={EditPendingIncome} />
      <Stack.Screen name="deleteIncome" component={DeleteIncome} />
    </Stack.Navigator>
  )
}

export default PendingIncome
