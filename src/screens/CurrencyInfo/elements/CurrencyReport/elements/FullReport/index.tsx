import {useTheme} from 'providers'
import React, {FC} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {getUTCFullTime, translate} from 'utils'
import {styles} from './styles'
import Arrow from '@assets/img/arrow.png'
const FullReport: FC<any> = ({totals, onClose, dates}) => {
  const {colors} = useTheme()

  return (
    <ScrollView style={styles.root}>
      <TouchableOpacity style={styles.arrowBack} onPress={() => onClose()}>
        <Image style={styles.arrow} source={Arrow} />
      </TouchableOpacity>
      <Text style={[styles.titleText, {color: colors.secondaryText}]}>
        {translate('account_status')}
      </Text>
      <View style={[styles.line, {backgroundColor: colors.secondary}]} />
      <View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('transactions_from_date')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {getUTCFullTime(dates.from_date?.value, '/')}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('transactions_to_date')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {getUTCFullTime(dates.to_date?.value, '/')}
          </Text>
        </View>
      </View>
      <View style={[styles.line, {backgroundColor: colors.secondary}]} />
      <View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('incoming_total')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {totals?.incoming?.total}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('incoming_monthly')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {totals?.incoming?.monthly}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('incoming_pending')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {totals?.incoming?.pending}
          </Text>
        </View>
      </View>
      <View style={[styles.line, {backgroundColor: colors.secondary}]} />
      <View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('outcoming_total')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {totals?.outcoming?.total}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('outcoming_monthly')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {totals?.outcoming?.monthly}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('outcoming_pending')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {totals?.outcoming?.pending}
          </Text>
        </View>
      </View>
      <View style={[styles.line, {backgroundColor: colors.secondary}]} />
      <View>
        <View style={styles.textContainer}>
          <Text style={[styles.labelText, {color: colors.secondaryText}]}>
            {translate('finance_status')}
          </Text>
          <Text style={[styles.contentText, {color: colors.text}]}>
            {totals?.incoming?.total - totals?.outcoming?.total}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default FullReport
