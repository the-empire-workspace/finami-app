import React, {FC} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import ArrowFatLeft from '@assets/img/ArrowFatLeft.svg'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
const FixedIncome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <View
          style={[styles.headerTop, {backgroundColor: colors.background50}]}>
          <TouchableOpacity
            onPress={() => {
              router.goBack()
            }}
            style={[{backgroundColor: colors.background50}, styles.arrowLeft]}>
            <ArrowFatLeft />
          </TouchableOpacity>
          <Text style={styles.h1}>Ingresos Fijos</Text>
        </View>
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
