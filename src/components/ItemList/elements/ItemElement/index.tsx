import React, { FC } from 'react'
import { TouchableOpacity, Text, View, Image, Alert } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'
import { getUTCFullTime, processCategoryDeep, verifyId } from 'utils'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setIncoming } from 'store/actions'

const ItemElement: FC<Props> = ({ item, type, categoryId }) => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const navigation: any = useNavigation()
  const {
    incoming: { items: incomingsItems },
  } = useSelector((state: any) => state)

  const onPress = () => {
    const params: any = { type: type, id: item.id }

    if (categoryId?.length) params.categoryId = categoryId

    if (item.paymentType === 'unique')
      return navigation.navigate('entry', { type, item })
    if (item.paymentType === 'concurrent')
      return navigation.navigate('concurrentPayment', params)
    if (item?.category) return navigation.navigate('category', params)
  }

  const deleteItem = () => {
    if (categoryId?.length) {
      const newFormData: any = processCategoryDeep(
        categoryId || [],
        incomingsItems,
        null,
        item,
        true,
      )
      const newIncoming = verifyId(null, newFormData, incomingsItems)
      return dispatch(setIncoming(newIncoming))
    }
    const incomingId = incomingsItems?.findIndex(
      (itm: any) => itm?.id === item.id,
    )
    const newIncome = [...incomingsItems]
    newIncome.splice(incomingId, 1)
    dispatch(setIncoming(newIncome))
  }

  const alertDelete = () => {
    Alert.alert(
      'Sure to delete?',
      `you going to delete the item ${item?.name}`,
      [{ text: 'Delete', onPress: deleteItem }, { text: 'Back' }],
    )
  }

  return (
    <TouchableOpacity
      style={[styles.transactionItem, { backgroundColor: colors.background }]}
    >
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
          <Text style={[styles.transactionAmount, { color: colors.text }]}>
            {item.amount}
          </Text>
          <Text style={[styles.transactionAmount, { color: colors.text }]}>
            {type === 'entry' ? item.status : item.paymentType}
          </Text>
          <Text style={[styles.transactionDate, { color: colors.text }]}>
            {getUTCFullTime(
              type === 'entry' || item.category ? item.date : item.payment_date,
              '/',
            )}
          </Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.transactionDate, { color: colors.text }]}>
            {item?.paymentType === 'unique' || type === 'entry'
              ? 'Modify'
              : item?.category
              ? 'View Category'
              : 'View History'}
          </Text>
        </TouchableOpacity>
        {type !== 'entry' && (
          <TouchableOpacity onPress={alertDelete} style={styles.deleteAction}>
            <Text style={[styles.transactionDate, { color: colors.text }]}>
              Delete
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ItemElement
