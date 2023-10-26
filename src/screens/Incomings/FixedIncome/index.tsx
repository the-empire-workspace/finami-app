import React, { FC, useEffect, useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ArrowFatLeft from '@assets/img/ArrowFatLeft.svg'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useNavigation } from '@react-navigation/native'
const FixedIncome: FC = () => {
  const { colors } = useTheme()

  const router: any = useNavigation()
  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <View style={[styles.header, { backgroundColor: colors.background50 }]}>
        <View style={[styles.headerTop, { backgroundColor: colors.background50 }]}>
          <TouchableOpacity
            onPress={() => {
              router.goBack()
            }}
            style={[{ backgroundColor: colors.background50, marginRight: 20 }]}
          >
            <ArrowFatLeft />
          </TouchableOpacity>
          <Text style={styles.h1} >Ingresos Pendientes</Text>
        </View>
        <TouchableOpacity 
          style={[styles.headerButton,{backgroundColor: colors.background25}]}
           onPress={() => {
             router.navigate('newEntry')
           }}
          >
          <Text style={styles.h3}>Nuevo ingreso</Text>
        </TouchableOpacity>
        {/* <Text style={styles.h3}>FixedIncome2</Text> */}
      </View>
    </View>
  )
}
export default FixedIncome