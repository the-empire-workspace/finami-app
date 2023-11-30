import React, {FC, useEffect, useMemo} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import {getItem} from 'store/actions'
import PencilSimple from '@assets/img/PencilSimple.svg'
import CardHolder from '@assets/img/Cardholder.svg'
import {translate} from 'utils'

const ItemElement: FC<Props> = ({item, type}) => {
  const {colors} = useTheme()
  const {item: entry} = useSelector((state: any) => state.account)
  const {currencies} = useSelector((state: any) => state.currency)
  const dispatch = useDispatch()
  const router: any = useNavigation()

  useEffect(() => {
    if (entry?.id === item?.id)
      if (item?.payment_type === 'fixed_income')
        router.navigate('detailsFixedIncome')
      else if (item?.payment_type === 'pending_income')
        router.navigate('detailsPendingIncome')
  }, [entry])

  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === entry?.currency_id)
  }, [currencies?.length, entry?.currency_id])

  return type === 'editable' ? (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        {
          backgroundColor:
            item?.entry_type === 'income'
              ? colors.progress.ingress
              : colors.progress.egress,
        },
      ]}>
      <View>
        <TouchableOpacity onPress={() => dispatch(getItem(item?.id))}>
          <Text
            style={[
              styles.strongBody,
              styles.concept,
              {color: colors.typography2},
            ]}>
            {item?.payment_concept}
          </Text>
          <Text style={[styles.smallBody, {color: colors.typography2}]}>
            {new Date(item?.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text
            style={[
              styles.strongBody,
              styles.concept,
              {color: colors.typography2},
            ]}>
            {translate('account')}: {entry?.account_name}
            {entry.account_number ? ` - ${entry?.account_number}` : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={[
            styles.strongBody,
            styles.amount,
            {
              color: colors.typography2,
            },
          ]}>
          {' '}
          {currency?.symbol || ''}{' '}
          {item?.amount?.toLocaleString('en-US', {
            maximumFractionDigits: currency?.decimal,
          })}
        </Text>
        <View style={[styles.buttons]}>
          <TouchableOpacity>
            <CardHolder width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <PencilSimple
              style={[{color: colors.typography2}]}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        {
          backgroundColor:
            item?.entry_type === 'income'
              ? colors.progress.ingress
              : colors.progress.egress,
        },
      ]}
      onPress={() => dispatch(getItem(item?.id))}>
      <View>
        <Text
          style={[
            styles.strongBody,
            styles.concept,
            {color: colors.typography2},
          ]}>
          {item?.payment_concept}
        </Text>
        <Text style={[styles.smallBody, {color: colors.typography2}]}>
          {new Date(item?.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>
      <View>
        <Text style={[styles.strongBody, {color: colors.typography2}]}>
          {' '}
          {currency?.symbol || ''}{' '}
          {item?.amount?.toLocaleString('en-US', {
            maximumFractionDigits: currency?.decimal,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemElement
