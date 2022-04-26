import React, {FC} from 'react'
import {Text, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {getUTCFullTime, orderBy, translate} from 'utils'
import {Props} from './interface'

const ConcurrentInfo: FC<Props> = ({item}) => {
  const {colors} = useTheme()

  const reduceEntries = (prev: any, next: any) => {
    if (next.status === 'paid') prev += next.amount
    return prev
  }

  const orderDate = orderBy(item?.entries, 'date', 'desc') || []
  const lastPayment = orderDate?.filter((entry: any) => entry.status === 'paid')

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, {color: colors.secondaryText}]}>
          {translate('fix_income')}:
        </Text>
        <Text style={[styles.infoText, {color: colors.text}]}>
          ${item?.amount}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, {color: colors.secondaryText}]}>
          {translate('total_income')}:
        </Text>
        <Text style={[styles.infoText, {color: colors.text}]}>
          ${item?.entries?.reduce(reduceEntries, 0)}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, {color: colors.secondaryText}]}>
          {translate('payment_frequency')}:
        </Text>
        <Text style={[styles.infoText, {color: colors.text}]}>
          {item?.amount_frequency} {translate(item?.frequency)}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, {color: colors.secondaryText}]}>
          {translate('last_payment')}:
        </Text>
        <Text style={[styles.infoText, {color: colors.text}]}>
          {lastPayment
            ? translate('none')
            : getUTCFullTime(lastPayment.date, '-')}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, {color: colors.secondaryText}]}>
          {translate('next_payment')}:
        </Text>
        <Text style={[styles.infoText, {color: colors.text}]}>
          {!!orderDate[0]?.date && getUTCFullTime(orderDate[0]?.date, '-')}
        </Text>
      </View>
    </View>
  )
}

export default ConcurrentInfo
