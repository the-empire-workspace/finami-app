import React, {FC, useEffect, useMemo} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {translate} from 'utils'
import SvgX from '@assets/img/X.svg'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {removeItem} from 'store/actions'

const Entry: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()
  const {item} = useSelector((state: any) => state.account)

  const router = useNavigation()

  useEffect(() => {
    return () => {
      dispatch(removeItem())
    }
  }, [])

  const itemValues = useMemo(() => {
    const titleSelection: any = {
      income: translate('income_detail'),
      expense: translate('expense_detail'),
      needs: translate('needs_detail'),
    }
    const colorSelection: any = {
      income: colors.progress.ingress,
      expense: colors.progress.egress,
      needs: colors.progress.needs,
    }
    return {
      title: titleSelection[item?.entry_type],
      color: colorSelection[item?.entry_type],
    }
  }, [item])

  const {currencies} = useSelector((state: any) => state.currency)

  /* const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === item?.currency_id)
  }, [currencies?.length, item?.currency_id]) */

  return (
    <View style={[styles.root]}>
      <View style={[styles.modal, {backgroundColor: colors.background100}]}>
        <View
          style={[styles.modalHeader, {backgroundColor: itemValues?.color}]}>
          <Text style={[styles.h3, {color: colors.typography2}]}>
            {itemValues?.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.goBack()
            }}>
            <SvgX width={32} height={32} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.main}>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('concept')}:
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>
              {item?.payment_concept || translate('unavailable')}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('comments')}:
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>
              {item?.comment || translate('unavailable')}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('amount')}:
            </Text>            
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('date')}:
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>
              {new Date(item?.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('emissor')}:
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>
              {item?.emissor || translate('unavailable')}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('phone')}:
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>
              {item?.phone || translate('unavailable')}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('email')}:
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>
              {item?.email || translate('unavailable')}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('account')}:
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>{`${
              item?.account_name
            } - *${item?.account_number?.slice(-4)}`}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Entry
