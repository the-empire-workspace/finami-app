import React, {FC, useEffect, useMemo} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import {getItem} from 'store/actions'

const ItemElement: FC<Props> = ({item, type}) => {
  const {colors} = useTheme()

  const {item: entry, user} = useSelector((state: any) => state.account)
  const {currencies} = useSelector((state: any) => state.currency)
  const dispatch = useDispatch()

  const router: any = useNavigation()

  useEffect(() => {
    if (entry?.id === item?.id) router.navigate('entry')
  }, [entry])

  const currency = useMemo(() => {
    return currencies.find(
      (c: any) => c.id === (item?.currency_id || user?.currency_id),
    )
  }, [currencies?.length, item?.currency_id])

  const checkAction = () => {
    switch (type) {
      case 'basic_expenses':
        if (item?.payment_concept)
          router.navigate('detailFixesOutcome', {id: item?.id, type: 'outcome'})
        if (item?.name)
          router.navigate('detailFixesOutcome', {
            id: item?.id,
            type: 'category',
          })
        break
      case 'fixed_incomes':
        if (item?.payment_concept)
          router.navigate('detailFixesIncome', {id: item?.id, type: 'income'})
        if (item?.name)
          router.navigate('detailFixesIncome', {
            id: item?.id,
            type: 'category',
          })
        break
      case 'debts':
        router.navigate('detailPendingOutcome', {id: item?.id, type: 'outcome'})
        break
      case 'receivable_accounts':
        router.navigate('detailPendingIncome', {id: item?.id, type: 'income'})
        break
      default:
        dispatch(getItem(item?.id))
        break
    }
  }

  const transparent = 'transparent'

  return (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        {
          backgroundColor:
            item?.payment_type === 'debt' ||
            item?.payment_type === 'receivable_account'
              ? transparent
              : item?.entry_type === 'income' || item?.type === 'income'
              ? colors.progress.ingress
              : colors.progress.egress,
          borderColor:
            item?.payment_type === 'debt'
              ? colors.progress.egress
              : item?.payment_type === 'receivable_account'
              ? colors.progress.ingress
              : transparent,
          ...(item?.payment_type === 'debt' ||
          item?.payment_type === 'receivable_account'
            ? styles.noPadding
            : {}),
        },
      ]}
      onPress={checkAction}>
      {item?.payment_type === 'debt' ||
      item?.payment_type === 'receivable_account' ? (
        <>
          <View
            style={[
              styles.backgroundContainer,
              {
                backgroundColor:
                  item?.payment_type === 'debt'
                    ? colors.progress.egress
                    : colors.progress.ingress,
                width: `${(item?.total_amount / item?.amount) * 100}%`,
              },
            ]}
          />
          <View style={[styles.contentContainer]}>
            <Text
              numberOfLines={1}
              style={[styles.strongBody, {color: colors.typography}]}>
              {item?.payment_concept}
            </Text>
            <View style={[styles.textContainer]}>
              <Text style={[styles.strongBody, {color: colors.typography}]}>
                {currency?.symbol || ''}{' '}
                {item?.total_amount?.toLocaleString('en-US', {
                  maximumFractionDigits: currency?.decimal,
                })}
              </Text>
              <Text style={[styles.strongBody, {color: colors.typography}]}>
                /
              </Text>
              <Text style={[styles.strongBody, {color: colors.typography}]}>
                {' '}
                {currency?.symbol || ''}{' '}
                {item?.amount?.toLocaleString('en-US', {
                  maximumFractionDigits: currency?.decimal,
                })}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View>
            <Text
              style={[
                styles.strongBody,
                styles.concept,
                {color: colors.typography2},
              ]}>
              {item?.payment_concept || item?.name}
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
            {!!item?.amount && (
              <Text style={[styles.strongBody, {color: colors.typography2}]}>
                {' '}
                {currency?.symbol || ''}{' '}
                {item?.amount?.toLocaleString('en-US', {
                  maximumFractionDigits: currency?.decimal,
                })}
              </Text>
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  )
}

export default ItemElement
