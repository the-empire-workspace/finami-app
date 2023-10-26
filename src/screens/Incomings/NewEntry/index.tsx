import React, { FC, useEffect, useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ArrowFatLeft from '@assets/img/ArrowFatLeft.svg'
import { styles } from './styles'
import { useTheme } from 'providers'
import { BackHandler, Header } from 'components'
import { useNavigation } from '@react-navigation/native'
const NewEntry: FC = () => {
  const { colors } = useTheme()

  const router: any = useNavigation()
  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={'NewEntry'} />
        <Text style={styles.h3}>NewEntry</Text>
        
    </View>
  )
}
export default NewEntry