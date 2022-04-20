import React, { FC } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import LogoI from '@assets/img/logoI.png'
import Dashboard from '@assets/img/dashboard.png'
import Incoming from '@assets/img/incoming.png'
import Outcoming from '@assets/img/outcoming.png'
import { useTheme } from 'providers'

const Nav = [
  {
    key: 'Dashboard',
    label: 'Dashboard',
    icon: Dashboard,
    route: 'Dashboard',
  },
  {
    key: 'Incoming',
    label: 'Incoming',
    icon: Incoming,
    route: 'Incoming',
  },
  {
    key: 'Outcoming',
    label: 'Outcoming',
    icon: Outcoming,
    route: 'Outcoming',
  },
  {
    key: 'Profile',
    label: 'Profile',
    icon: LogoI,
    route: 'Profile',
  },
]

const MainTabComponent: FC<any> = ({ navigation, state }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.nav, { backgroundColor: colors?.background }]}>
      {Nav.map((data: any, index: any) => {
        const { width, height } = Image.resolveAssetSource(data?.icon)

        return (
          <TouchableOpacity
            style={[
              styles.navItem,
              state?.index === index
                ? { backgroundColor: colors.secondary }
                : {},
            ]}
            key={index}
            onPress={() => navigation.navigate(data.route)}
          >
            <Image
              style={{ width: width / 18, height: height / 18 }}
              source={data.icon}
              width={width / 18}
              height={height / 18}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default MainTabComponent
