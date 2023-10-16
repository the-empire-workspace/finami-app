import React, {FC} from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Profile from '../../../screens/Profile'
import ProfileMenu from './ProfileMenu'
import {CurrencyInfo} from 'screens'

const Drawer = createDrawerNavigator()

const ProfileDrawer: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="profile"
      screenOptions={{
        headerShown: false,
        drawerStatusBarAnimation: 'slide',
        drawerPosition: 'right',
      }}
      drawerContent={() => <ProfileMenu />}>
      <Drawer.Screen name="profile" component={Profile} />
      <Drawer.Screen name="currencyInfo" component={CurrencyInfo} />
    </Drawer.Navigator>
  )
}

export default ProfileDrawer
