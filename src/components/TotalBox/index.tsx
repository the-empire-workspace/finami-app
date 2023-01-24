import React, {FC} from 'react'
import {View, Text} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'
import {useSelector} from 'react-redux'
import {translate} from 'utils'

const TotalBox: FC<Props> = ({total, type = 'incomings'}) => {
  const {colors} = useTheme()
  const {
    currency: {items: currencies},
    account: {user},
  } = useSelector((state: any) => state)
  const currency = currencies.find((cur: any) => cur.id === user.currency)
  return (
    <View style={styles.infoBox}>
      <View>
        <Text
          style={[
            styles.amountText,
            {color: type === 'incomings' ? colors.success : colors.unsuccess},
          ]}>
          {currency?.symbol}
          {total?.total?.toFixed(2) || '0'}
        </Text>
        <Text style={[styles.labelText, {color: colors.text}]}>
          {translate(type)}
        </Text>
        <Text style={[styles.labelText, {color: colors.text}]}>
          {translate('totals')}
        </Text>
      </View>
      <View style={[styles.infoLine, {backgroundColor: colors.text}]} />
      <View>
        <Text
          style={[
            styles.amountText,
            {color: type === 'incomings' ? colors.success : colors.unsuccess},
          ]}>
          {currency?.symbol}
          {total?.monthly?.toFixed(2) || '0'}
        </Text>
        <Text style={[styles.labelText, {color: colors.text}]}>
          {translate(type)}
        </Text>
        <Text style={[styles.labelText, {color: colors.text}]}>
          {translate('monthly')}
        </Text>
      </View>
      <View style={[styles.infoLine, {backgroundColor: colors.text}]} />
      <View>
        <Text style={[styles.amountText, {color: colors.pending}]}>
          {currency?.symbol}
          {total?.pending?.toFixed(2) || '0'}
        </Text>
        <Text style={[styles.labelText, {color: colors.text}]}>
          {translate(type)}
        </Text>
        <Text style={[styles.labelText, {color: colors.text}]}>
          {translate('pendings')}
        </Text>
      </View>
    </View>
  )
}

export default TotalBox
