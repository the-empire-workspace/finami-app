import React, {FC} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler} from 'components'
const FixedIncome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <BackHandler title="Ingresos Fijos" />
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background25}]}
          onPress={() => {
            router.navigate('newFixedIncome')
          }}>
          <Text style={styles.h3}>Nuevo ingreso</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.h1}>text</Text>
    </View>
  )
}
export default FixedIncome
