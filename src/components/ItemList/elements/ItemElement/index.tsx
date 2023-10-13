import React, {FC} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'

const ItemElement: FC<Props> = ({item, currency}) => {
  const {colors} = useTheme()

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
      ]}>
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
