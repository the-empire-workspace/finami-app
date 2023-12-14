import React, { FC, useEffect, useMemo } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { translate } from 'utils'
import SvgX from '@assets/img/X.svg'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getItem, removeItem } from 'store/actions'
import Trash from '@assets/img/Trash.svg'
import Pencil from '@assets/img/Pencil.svg'
const Entry: FC = () => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const { item } = useSelector((state: any) => state.account)

  const router: any = useNavigation()
  const route = useRoute()
  const { params }: any = route

  useEffect(() => {
    dispatch(getItem(params?.id))
    return () => {
      dispatch(removeItem())
    }
  }, [])

  const itemValues = useMemo(() => {
    const titleSelection: any = {
      income: translate('income_detail'),
      expense: translate('expense_detail'),
      compromise: translate('compromise_detail'),
      desire: translate('desire_detail'),
    }
    const colorSelection: any = {
      income: colors.progress.ingress,
      expense: colors.progress.egress,
      compromise: colors.progress.needs,
      desire: colors.progress.wish,
    }
    return {
      title: titleSelection[item?.type || item?.entry_type] || titleSelection[item?.entry_type] || translate('detail'),
      color: colorSelection[item?.type || item?.entry_type] || colorSelection[item?.entry_type] || colors.progress.ingress,
    }
  }, [item])

  return (
    <View style={[styles.root]}>
      <View style={[styles.modal, { backgroundColor: colors.background100 }]}>
        <View
          style={[styles.modalHeader, { backgroundColor: itemValues?.color }]}>
          <Text style={[styles.h3, { color: colors.typography2 }]}>
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
                { color: colors.typography },
              ]}>
              {translate('concept')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {item?.payment_concept || translate('unavailable')}
            </Text>
          </View>
          {!!item?.comment && <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                { color: colors.typography },
              ]}>
              {translate('comments')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {item?.comment || translate('unavailable')}
            </Text>
          </View>}
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                { color: colors.typography },
              ]}>
              {translate('amount')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {item?.currency_symbol}{' '}
              {item?.amount?.toLocaleString('en-US', {
                maximumFractionDigits: item?.decimal,
              }) || translate('unavailable')}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                { color: colors.typography },
              ]}>
              {translate('date')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {new Date(item?.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          {!!item?.emissor && <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                { color: colors.typography },
              ]}>
              {translate('emissor')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {item?.emissor || translate('unavailable')}
            </Text>
          </View>}
          {!!item?.phone && <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                { color: colors.typography },
              ]}>
              {translate('phone')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {item?.phone || translate('unavailable')}
            </Text>
          </View>}
          {!!item?.email && <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                { color: colors.typography },
              ]}>
              {translate('email')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {item?.email || translate('unavailable')}
            </Text>
          </View>}
          {!!item?.account_name && <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                { color: colors.typography },
              ]}>
              {translate('account')}:
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>{`${item?.account_name
              } - *${item?.account_number?.slice(-4) || ''}`}</Text>
          </View>}
        </ScrollView>
        <View style={[styles.modalFooter]}>
          <TouchableOpacity onPress={() => { router.navigate('editEntry', { id: item?.id }) }} >
            <Pencil width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.navigate('deleteEntry', { id: item?.id }) }}>
            <Trash width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Entry
