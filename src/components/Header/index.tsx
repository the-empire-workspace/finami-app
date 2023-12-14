import React, {FC, useEffect, useMemo} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {styles} from './styles'
import {Props} from './interface'
import SvgNotification from '@assets/img/Notifications.svg'
import {useNavigation} from '@react-navigation/core'
import {useDispatch} from 'react-redux'
import {getCurrencyPrice, getTotalBalance} from 'store/actions'
import {useSelector} from 'react-redux'
import {Avatar} from 'theme'
import {useTheme} from 'providers'
import {translate} from 'utils'
const Header: FC<Props> = () => {
  const router: any = useNavigation()
  const dispatch = useDispatch()
  const {defaultPrices, currencies} = useSelector(
    (state: any) => state.currency,
  )
  const {user, totalBalance} = useSelector((state: any) => state.account)
  const {colors} = useTheme()

  useEffect(() => {
    if (!Object.keys(defaultPrices)?.length) dispatch(getCurrencyPrice())
    if (Object.keys(defaultPrices)?.length) dispatch(getTotalBalance())
  }, [defaultPrices])

  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === user?.currency_id)
  }, [currencies?.length, user?.currency_id])

  return (
    <View style={styles.root}>
      <Avatar
        defaultAvatar={{uri: user?.picture}}
        statical={true}
        height={42}
        width={42}
        actionAvatar={() => {
          router.navigate('profile')
        }}
      />
      <View style={styles.container}>
        <Text
          style={[
            styles.subtitle,
            styles.sub,
            {color: totalBalance >= 0 ? colors.positive : colors.negative},
          ]}>
          {currency?.symbol || ''}{' '}
          {totalBalance?.toLocaleString('en-US', {
            maximumFractionDigits: currency?.decimal,
          })}
        </Text>
        <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
          {translate('available_balance')}
        </Text>
      </View>
      <TouchableOpacity style={styles.notification} onPress={() => {}}>
        {/* <SvgNotification width={30} height={30} /> */}
      </TouchableOpacity>
    </View>
  )
}

export default Header
