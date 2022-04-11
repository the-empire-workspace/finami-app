import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../../../screens/Profile';
import ProfileMenu from './ProfileMenu';


const Drawer = createDrawerNavigator();

const ProfileDrawer: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="profile" screenOptions={{
      headerShown: false,
      drawerStatusBarAnimation: 'slide',
      drawerPosition: 'right'
    }} drawerContent={() => <ProfileMenu />} >
      <Drawer.Screen name="profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default ProfileDrawer