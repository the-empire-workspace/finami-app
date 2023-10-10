import React, { FC, useEffect } from 'react'
import { View, Image } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import Logo from '@assets/img/logo.png'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { createTables } from '@utils'
import { useSelector } from 'react-redux'

const Welcome: FC = () => {
  const router: any = useNavigation()
  const { isAuth } = useSelector((state: any) => state.account)
  const { colors } = useTheme()
  useFocusEffect(() => {
    if (!isAuth) setTimeout(() => {
      router.navigate('StepOne')
    }, 3000)
    createTables()
  })
  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]} onTouchStart={() => router.navigate('StepOne')}>
      <Image style={styles.logo} source={Logo} />
    </View>
  )
}

export default Welcome
