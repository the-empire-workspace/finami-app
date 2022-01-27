import React, { FC } from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'
import { getUTCFullTime } from 'utils'
import { useNavigation } from '@react-navigation/native'

const ItemElement: FC<Props> = ({ item, type }) => {
  const { colors } = useTheme()

  const navigation: any = useNavigation()

  const onPress = () => {
    if (item.paymentType === 'unique')
      return navigation.navigate('entry', { type: type, item: item })
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
          <Text style={[styles.transactionCategory, { color: colors.text }]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.transactionItemInfo}>
          <Text style={[styles.transactionAmount, { color: colors.text }]}>
            {item.amount}
          </Text>
          <Text style={[styles.transactionAmount, { color: colors.text }]}>
            {item.paymentType}
          </Text>
          <Text style={[styles.transactionDate, { color: colors.text }]}>
            {getUTCFullTime(item.payment_date, '/')}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.transactionDate, { color: colors.text }]}>
            {item?.paymentType === 'unique' ? 'Modify' : 'View History'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ItemElement
