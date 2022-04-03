import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'

const TotalBox: FC<Props> = ({ total, type = 'incomings' }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.infoBox}>
      <View>
        <Text style={[styles.amountText, { color: colors.text }]}>
          ${total?.total?.toFixed(2) || '000'}
        </Text>
        <Text style={[styles.labelText, { color: colors.text }]}>{type}</Text>
        <Text style={[styles.labelText, { color: colors.text }]}>Totales</Text>
      </View>
      <View style={[styles.infoLine, { backgroundColor: colors.text }]} />
      <View>
        <Text style={[styles.amountText, { color: colors.text }]}>
          ${total?.monthly?.toFixed(2) || '0'}
        </Text>
        <Text style={[styles.labelText, { color: colors.text }]}>{type}</Text>
        <Text style={[styles.labelText, { color: colors.text }]}>
          Mensuales
        </Text>
      </View>
      <View style={[styles.infoLine, { backgroundColor: colors.text }]} />
      <View>
        <Text style={[styles.amountText, { color: colors.text }]}>
          ${total?.pending?.toFixed(2) || '0'}
        </Text>
        <Text style={[styles.labelText, { color: colors.text }]}>{type}</Text>
        <Text style={[styles.labelText, { color: colors.text }]}>
          Pendientes
        </Text>
      </View>
    </View>
  )
}

export default TotalBox
