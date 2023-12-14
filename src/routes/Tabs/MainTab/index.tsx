import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainTabComponent from './MainTabComponent'
import { Dashboard, Goals, Incoming, Outcoming } from '@screens'

const Tab = createBottomTabNavigator()

const MainTab: FC<any> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Dashboard'}
      tabBar={props => <MainTabComponent {...props} />}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Incoming" component={Incoming} />
      <Tab.Screen name="Outcoming" component={Outcoming} />
      <Tab.Screen name="Goals" component={Goals} />
    </Tab.Navigator>
  )
}

export default MainTab
