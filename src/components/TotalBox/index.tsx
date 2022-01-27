import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'

const TotalBox: FC<Props> = ({}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.infoBox}>
      <View>
        <Text style={[styles.amountText, { color: colors.text }]}>
          $000.000.000,00
        </Text>
        <Text style={[styles.labelText, { color: colors.text }]}>Ingresos</Text>
        <Text style={[styles.labelText, { color: colors.text }]}>Totales</Text>
      </View>
      <View style={[styles.infoLine, { backgroundColor: colors.text }]} />
      <View>
        <Text style={[styles.amountText, { color: colors.text }]}>
          $000.000.000,00
        </Text>
        <Text style={[styles.labelText, { color: colors.text }]}>Ingresos</Text>
        <Text style={[styles.labelText, { color: colors.text }]}>
          Mensuales
        </Text>
      </View>
      <View style={[styles.infoLine, { backgroundColor: colors.text }]} />
      <View>
        <Text style={[styles.amountText, { color: colors.text }]}>
          $000.000.000,00
        </Text>
        <Text style={[styles.labelText, { color: colors.text }]}>Ingresos</Text>
        <Text style={[styles.labelText, { color: colors.text }]}>
          Pendientes
        </Text>
      </View>
    </View>
  )
}

export default TotalBox
