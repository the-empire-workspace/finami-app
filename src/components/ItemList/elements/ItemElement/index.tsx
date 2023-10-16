import React, {FC, useEffect, useMemo} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import {getItem} from 'store/actions'

const ItemElement: FC<Props> = ({item}) => {
  const {colors} = useTheme()

  const {item: entry} = useSelector((state: any) => state.account)
  const {currencies} = useSelector((state: any) => state.currency)
  const dispatch = useDispatch()

  const router: any = useNavigation()

  useEffect(() => {
    if (entry?.id === item?.id) router.navigate('entry')
  }, [entry])

  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === item?.currency_id)
  }, [currencies?.length, item?.currency_id])

  return (
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
            minimumFractionDigits: currency?.decimal,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemElement
