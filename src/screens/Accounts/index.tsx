import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountMain } from "./elements";


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
    </Stack.Navigator>
  )
}

export default Accounts;