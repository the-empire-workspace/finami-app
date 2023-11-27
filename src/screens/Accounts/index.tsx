import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AccountDelete, AccountDetail, AccountMain, CreateAccount, EditAccount } from './elements'

const Stack = createNativeStackNavigator()

const Accounts: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: 'pop',
        animation: 'slide_from_bottom',
        headerShown: false,
      }}
      initialRouteName="accountMain">
      <Stack.Screen name="accountMain" component={AccountMain} />
      <Stack.Screen name="createAccount" component={CreateAccount} />
      <Stack.Screen name="accountDetail" component={AccountDetail} />
      <Stack.Screen name="accountDelete" component={AccountDelete} />
      <Stack.Screen name="editAccount" component={EditAccount} />
    </Stack.Navigator>
  )
}

export default Accounts
