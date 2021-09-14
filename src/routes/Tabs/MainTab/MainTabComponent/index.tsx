import React, { FC } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import LogoI from '@assets/img/logoI.png'
import { useTheme } from 'providers'

const Nav = [
  {
    key: 'Dashboard',
    label: 'Dashboard',
    icon: LogoI,
    route: 'Dashboard',
  },
  {
    key: 'Incoming',
    label: 'Incoming',
    icon: LogoI,
    route: 'Incoming',
  },
  {
    key: 'Outcoming',
    label: 'Outcoming',
    icon: LogoI,
    route: 'Outcoming',
  },
  {
    key: 'Profile',
    label: 'Profile',
    icon: LogoI,
    route: 'Profile',
  },
]

const MainTabComponent: FC<any> = ({ navigation }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.nav, { backgroundColor: colors?.background }]}>
      {Nav.map((data: any, index: any) => (
        <TouchableOpacity
          style={styles.navItem}
          key={index}
          onPress={() => navigation.navigate(data.route)}
        >
          <Image style={styles.navImage} source={data.icon} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MainTabComponent
