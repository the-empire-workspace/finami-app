import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainTabComponent from './MainTabComponent'
import { Dashboard, Incomings, Outcomings } from '@screens'
import { ProfileDrawer } from '../../Drawers'

const Tab = createBottomTabNavigator()

const MainTab: FC<any> = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Dashboard'}
      tabBar={props => <MainTabComponent {...props} />}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Incoming" component={Incomings} />
      <Tab.Screen name="Outcoming" component={Outcomings} />
      <Tab.Screen name="Profile" component={ProfileDrawer} />
    </Tab.Navigator>
  )
}

export default MainTab
