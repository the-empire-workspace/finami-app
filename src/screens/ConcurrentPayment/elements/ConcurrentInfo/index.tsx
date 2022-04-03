import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { orderBy } from 'utils'
import { Props } from './interface'

const ConcurrentInfo: FC<Props> = ({ item }) => {
  const { colors } = useTheme()

  const reduceEntries = (prev: any, next: any) => {
    if (next.status === 'paid') prev += next.amount
    return prev
  }
  const orderDate = orderBy(item?.entries, 'date', 'desc')
  const lastPayment = orderDate.filter((entry: any) => entry.status === 'paid')

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: colors.secundaryText }]}>
          Ingreso Fijo:
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          ${item?.amount}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: colors.secundaryText }]}>
          Ingreso Total:
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          ${item?.entries?.reduce(reduceEntries, 0)}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: colors.secundaryText }]}>
          Frecuencia de pago:
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          {item?.frequency}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: colors.secundaryText }]}>
          Ultimo Pago:
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          {lastPayment ? 'Ninguno' : lastPayment.date}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, { color: colors.secundaryText }]}>
          Proximo Pago:
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          {new Date(orderDate[0]?.date)?.toISOString()}
        </Text>
      </View>
    </View>
  )
}

export default ConcurrentInfo
