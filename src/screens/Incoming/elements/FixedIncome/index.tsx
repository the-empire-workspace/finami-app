import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  DetailFixesIncome,
  EditFixedIncome,
  MainFixesIncome,
  NewFixedIncome,
} from './elements'
import DeleteIncome from './elements/DeleteIncome'

const Stack = createNativeStackNavigator()

const FixedIncome: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="fixedIncomeMain">
      <Stack.Screen name="fixedIncomeMain" component={MainFixesIncome} />
      <Stack.Screen name="newFixedIncome" component={NewFixedIncome} />
      <Stack.Screen name="detailFixesIncome" component={DetailFixesIncome} />
      <Stack.Screen name="editFixedIncome" component={EditFixedIncome} />
      <Stack.Screen name="deleteIncome" component={DeleteIncome} />
    </Stack.Navigator>
  )
}

export default FixedIncome
