import React, {FC} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import Dashboard from '@assets/img/Dashboard.svg'
import Incoming from '@assets/img/income.svg'
import Outcoming from '@assets/img/expense.svg'
import Calculator from '@assets/img/Calculator.svg'
import {useTheme} from 'providers'
import {translate} from 'utils'
import {useSelector} from 'react-redux'

const MainTabComponent: FC<any> = ({navigation, state}) => {
  const {colors} = useTheme()

  const {user} = useSelector((SelectorState: any) => SelectorState.account)

  const Nav = [
    {
      key: 'Dashboard',
      label: 'Dashboard',
      Icon: Dashboard,
      route: 'Dashboard',
      width: 30,
      height: 30,
      text: translate('home'),
      notUse: user,
    },
    {
      key: 'Incoming',
      label: 'Incoming',
      Icon: Incoming,
      route: 'Incoming',
      width: 32,
      height: 32,
      text: translate('incomes'),
    },
    {
      key: 'Outcoming',
      label: 'Outcoming',
      Icon: Outcoming,
      route: 'Outcoming',
      width: 32,
      height: 32,
      text: translate('outcomes'),
    },
    {
      key: 'Goals',
      label: 'Goals',
      Icon: Calculator,
      route: 'Goals',
      width: 30,
      height: 30,
      text: translate('goals'),
    },
  ]

  return (
    <View style={[styles.nav, {backgroundColor: colors?.background50}]}>
      {Nav.map((data: any, index: any) => {
        const Icon = data?.Icon
        return (
          <TouchableOpacity
            style={[
              styles.navItem,
              state?.index === index
                ? {backgroundColor: colors.background25}
                : {},
            ]}
            key={index}
            onPress={() => navigation.navigate(data.route)}>
            <Icon width={data?.width} height={data?.height} />
            <Text style={[styles.extraSmallBody, {color: colors.typography}]}>
              {data?.text}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default MainTabComponent
