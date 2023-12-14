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
      case 'goals':
        if (item?.payment_concept)
          router.navigate('detailGoals', {
            id: item?.id,
            type: 'goals',
            itemType: item?.type || item.payment_type,
          })
        if (item?.name)
          router.navigate('detailGoals', {
            id: item?.id,
            type: 'category',
            itemType: item?.type || item.payment_type,
          })
        break
      default:
        dispatch(getItem(item?.id))
        break
    }
  }

  const transparent = 'transparent'

  const borderColor = useMemo(() => {
    const color: any = {
      debt: colors.progress.ingress,
      receivable_account: colors.progress.egress,
      compromise: colors.progress.needs,
      desire: colors.progress.wish,
    }
    return color[item?.payment_type] || transparent
  }, [])

  const budget = useMemo(() => {
    return (
      item?.payment_type === 'debt' ||
      item?.payment_type === 'receivable_account' ||
      item?.payment_type === 'compromise' ||
      item?.payment_type === 'desire'
    )
  }, [item])

  const backgroundColor = useMemo(() => {
    const color: any = {
      income: colors.progress.ingress,
      expense: colors.progress.egress,
      compromise: colors.progress.needs,
      desire: colors.progress.wish,
    }

    const paymentColor: any = {
      compromise: budget ? transparent : colors.progress.needs,
      desire: budget ? transparent : colors.progress.wish,
      debt: transparent,
      receivable_account: transparent,
    }

    return (
      paymentColor[item?.payment_type] ||
      color[item?.type || item?.entry_type] ||
      transparent
    )
  }, [item, budget])

  return (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          ...(budget ? styles.noPadding : {}),
        },
      ]}
      onPress={checkAction}>
      {budget ? (
        <>
          <View
            style={[
              styles.backgroundContainer,
              {
                backgroundColor: borderColor,
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
