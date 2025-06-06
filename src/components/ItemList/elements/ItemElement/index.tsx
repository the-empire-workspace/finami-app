import React, {FC, useMemo} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'
import {useNavigation} from '@react-navigation/native'
import {useSelector} from 'react-redux'
import {getLanguage, translate} from 'utils'

const ItemElement: FC<Props> = ({item, type}) => {
  const {colors} = useTheme()

  const router: any = useNavigation()

  const language = getLanguage()

  const checkAction = () => {
    switch (type) {
      case 'basic_expenses':
        if (item?.payment_concept)
          router.navigate('detailFixesOutcome', {id: item?.id, type: 'outcome'})
        if (item?.entry_type === 'category')
          router.navigate('detailFixesOutcome', {
            id: item?.id,
            type: 'category',
          })
        break
      case 'fixed_incomes':
        if (item?.payment_concept)
          router.navigate('detailFixesIncome', {id: item?.id, type: 'income'})
        if (item?.entry_type === 'category')
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
            itemType: item?.entry_type || item.payment_type,
          })
        if (item?.entry_type === 'category')
          router.navigate('detailGoals', {
            id: item?.id,
            type: 'category',
            itemType: item?.entry_type || item.payment_type,
          })
        break
      default:
        router?.navigate('entry', {id: item?.id})
        break
    }
  }

  const transparent = 'transparent'

  const borderColor = useMemo(() => {
    const color: any = {
      debt: colors.progress.egress,
      receivable_account: colors.progress.ingress,
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
      receivable_account: colors.progress.ingress,
      debt: colors.progress.egress,
      fixed_incomes: colors.progress.ingress,
      fixed_outcomes: colors.progress.egress,
      basic_expenses: colors.progress.egress,
    }

    const paymentColor: any = {
      compromise: budget ? transparent : colors.progress.needs,
      desire: budget ? transparent : colors.progress.wish,
      debt: transparent,
      receivable_account: transparent,
    }

    return (
      paymentColor[item?.payment_type] ||
      color[item?.entry_type] ||
      transparent
    )
  }, [item, budget])

  const isCompleted = useMemo(() => {
    if (!budget) return false
    const prices = item?.prices || {}
    const totalAmount = Object.values(prices).reduce((acc, curr) => acc + curr.value, 0)
    return totalAmount >= item.amount
  }, [item, budget])

  return (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        {
          backgroundColor:
            item?.status === 'pending' ? transparent : backgroundColor,
          borderColor:
            item?.status === 'pending' ? backgroundColor : borderColor,
          ...(budget
            ? isCompleted
              ? styles.noPaddingAlt
              : styles.noPadding
            : {}),
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
                width: `${(Object.values(item?.prices || {}).reduce((acc, curr) => acc + curr.value, 0) / item?.amount) * 100}%`,
              },
              isCompleted ? styles.fullOpacity : {},
            ]}
          />
          <View style={[styles.contentContainer]}>
            {isCompleted && (
              <Text
                style={[
                  styles.h3,
                  {
                    color: isCompleted ? colors.typography2 : colors.typography,
                  },
                ]}>
                * {translate('completed')} *
              </Text>
            )}
            <Text
              numberOfLines={1}
              style={[
                styles.strongBody,
                {
                  color: isCompleted ? colors.typography2 : colors.typography,
                },
              ]}>
              {item?.payment_concept}
            </Text>
            <View style={[styles.textContainer]}>
              <Text
                style={[
                  styles.strongBody,
                  {
                    color: isCompleted ? colors.typography2 : colors.typography,
                  },
                  styles.textBalance
                ]}>
                {item?.currency_symbol || ''}{' '}
                {Object.values(item?.prices || {}).reduce((acc, curr) => acc + curr.value, 0).toLocaleString('en-US', {
                  maximumFractionDigits: item?.currency_decimal,
                })}
              </Text>
              <Text
                style={[
                  styles.strongBody,
                  {
                    color: isCompleted ? colors.typography2 : colors.typography,
                  },
                ]}>
                /
              </Text>
              <Text
                style={[
                  styles.strongBody,
                  {
                    color: isCompleted ? colors.typography2 : colors.typography,
                  },
                  styles.textBalance
                ]}>
                {' '}
                {item?.currency_symbol || ''}{' '}
                {item?.amount?.toLocaleString('en-US', {
                  maximumFractionDigits: item?.currency_decimal,
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
                {
                  color:
                    item?.status === 'pending'
                      ? colors.typography
                      : colors.typography2,
                },
              ]}>
              {item?.payment_concept}
            </Text>
            <Text
              style={[
                styles.smallBody,
                {
                  color:
                    item?.status === 'pending'
                      ? colors.typography
                      : colors.typography2,
                },
              ]}>
              {new Date(item?.date).toLocaleDateString(
                language === 'es' ? 'es-VE' : 'en-US',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                },
              )}
            </Text>
          </View>
          <View style={[styles.textContentAmount, styles.textBalance]}>
            {!!item?.amount && (
              <>
                <Text
                  style={[
                    styles.strongBody,
                    {
                      color:
                        item?.status === 'pending'
                          ? colors.typography
                          : colors.typography2,
                    },
                  ]}>
                  {' '}
                  {item?.currency_symbol || ''}{' '}
                  {item?.amount?.toLocaleString('en-US', {
                    maximumFractionDigits: item?.currency_decimal,
                  })}
                </Text>
                {item?.status === 'pending' && (
                  <Text
                    style={[
                      styles.smallStrongBody,
                      {color: colors.states.caution},
                    ]}>
                    {translate('pending')}
                  </Text>
                )}
              </>
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  )
}

export default ItemElement
