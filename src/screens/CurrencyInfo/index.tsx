import {useRoute} from '@react-navigation/native'
import {BackHandler} from 'components'
import {useTheme} from 'providers'
import React, {FC} from 'react'
import {Text, View} from 'react-native'
import {useSelector} from 'react-redux'
import {styles} from './styles'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {CurrencyList, CurrencyReport, CurrencyTabIndicator} from './elements'
import {Avatar} from 'theme'

const Tab = createMaterialTopTabNavigator()

const CurrencyInfo: FC = () => {
  const {colors} = useTheme()
  const route: any = useRoute()
  const {
    currency: {items: currencies},
  } = useSelector((state: any) => state)

  const currency = currencies.find(
    (current: any) => current.id === route.params?.id,
  )

  const CurrencyListWithCurrency = (props: any) => (
    <CurrencyList {...props} currency={currency} />
  )
  const CurrencyReportWithCurrency = (props: any) => (
    <CurrencyReport {...props} currency={currency} />
  )

  return (
    <View style={[styles.root, {backgroundColor: colors.background}]}>
      <View style={[{backgroundColor: colors.secondary}]}>
        <BackHandler />
        <View style={styles.infoCurrency}>
          <Avatar defaultAvatar={currency?.image} />
          <Text style={[styles.currencyTitle, {color: colors.text}]}>
            {currency?.name}
          </Text>
        </View>
      </View>
      <Tab.Navigator tabBar={props => <CurrencyTabIndicator {...props} />}>
        <Tab.Screen name="CurrencyList" component={CurrencyListWithCurrency} />
        <Tab.Screen
          name="CurrencyReport"
          component={CurrencyReportWithCurrency}
        />
      </Tab.Navigator>
    </View>
  )
}

export default CurrencyInfo
