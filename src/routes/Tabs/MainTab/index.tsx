import React, {FC} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MainTabComponent from './MainTabComponent'
import {Dashboard, Incoming} from '@screens'

const Tab = createBottomTabNavigator()

const MainTab: FC<any> = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Dashboard'}
      tabBar={props => <MainTabComponent {...props} />}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Incoming" component={Incoming} />
    </Tab.Navigator>
  )
}

export default MainTab
