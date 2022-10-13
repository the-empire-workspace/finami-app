import React, { FC } from 'react'
import { TouchableOpacity, Text, View, Image, Alert } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'
import { getUTCFullTime, processCategoryDeep, translate, verifyId } from 'utils'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setIncoming, setOutcoming } from 'store/actions'

const ItemElement: FC<Props> = ({ item, type, categoryId }) => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const navigation: any = useNavigation()
  const {
    incoming: { items: incomingsItems },
    outcoming: { items: outcomingItems },
    currency: { items: currencies },
  } = useSelector((state: any) => state)

  const onPress = () => {
    const params: any = { type: item?.type, id: item.id }

    if (categoryId?.length) params.categoryId = categoryId

    if (item.paymentType === 'unique')
      return navigation.navigate('entry', { type: item?.type, item })
    if (item.paymentType === 'concurrent')
      return navigation.navigate('concurrentPayment', params)
    if (item?.category) return navigation.navigate('category', params)
  }

  const modifyDeletion = (items: any, categories: any) => {
    if (categories?.length) {
      const newFormData: any = processCategoryDeep(
        categories || [],
        items,
        null,
        item,
        true,
      )
      return verifyId(null, newFormData, items)
    }
    const incomingId = items?.findIndex((itm: any) => itm?.id === item.id)
    const newIncome = [...items]
    newIncome.splice(incomingId, 1)
    return newIncome
  }

  const deleteItem = () => {
    if (item?.type === 'incomings') {
      const newIncome = modifyDeletion(incomingsItems, categoryId)
      dispatch(setIncoming(newIncome))
    }
    if (item?.type === 'outcomings') {
      const newOutcome = modifyDeletion(outcomingItems, categoryId)
      dispatch(setOutcoming(newOutcome))
    }
  }

  const alertDelete = () => {
    Alert.alert(
      translate('delete_title'),
      `${translate('delete_text')} ${item?.name}`,
      [{ text: 'Delete', onPress: deleteItem }, { text: translate('back') }],
    )
  }

  const currency = currencies.find(
    (current: any) => current.id === item.currency,
  )

  const paidColor =
    item.type === 'incomings' ? colors.success : colors.unsuccess

  const itemEntries = item?.entries
    ? item?.entries[item.entries?.length - 1]
    : {}

  return (
    <TouchableOpacity
      style={[styles.transactionItem, { backgroundColor: colors.background }]}>
      <View style={[styles.transactionData]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.transactionItemBox}>
          <Text style={[styles.transactionTitle, { color: colors.text }]}>
            {item.name}
          </Text>
          {type !== 'entry' && (
            <Text style={[styles.transactionCategory, { color: colors.text }]}>
              {item.description}
            </Text>
          )}
        </View>
        <View style={styles.transactionItemInfo}>
          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  item.status === 'paid' || itemEntries?.status === 'paid'
                    ? paidColor
                    : colors.pending,
              },
            ]}>
            {currency?.symbol}{' '}
            {!!item.amount && item.amount.toFixed(currency?.decimal || 2)}
          </Text>
          <Text style={[styles.transactionAmount, { color: colors.text }]}>
            {itemEntries?.status
              ? translate(itemEntries?.status)
              : !!item.status && translate(item?.status)}
          </Text>
          <Text style={[styles.transactionDate, { color: colors.text }]}>
            {getUTCFullTime(
              type === 'entry' || item.category ? item.date : item?.paymentType === 'concurrent' && item.entries ? item?.entries[item?.entries?.length - 1].date : item.payment_date,
              '/',
            )}
          </Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.transactionDate, { color: colors.text }]}>
            {item?.paymentType === 'unique' || type === 'entry'
              ? translate('modify')
              : item?.category
                ? translate('view_category')
                : translate('view_history')}
          </Text>
        </TouchableOpacity>
        {type !== 'entry' && (
          <TouchableOpacity onPress={alertDelete} style={styles.deleteAction}>
            <Text style={[styles.transactionDate, { color: colors.text }]}>
              {translate('delete')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ItemElement
