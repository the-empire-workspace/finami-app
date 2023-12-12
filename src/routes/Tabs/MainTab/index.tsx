import React, {FC} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MainTabComponent from './MainTabComponent'
import {Dashboard, Incoming, Outcoming} from '@screens'

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
    </Tab.Navigator>
  )
}

export default MainTab
