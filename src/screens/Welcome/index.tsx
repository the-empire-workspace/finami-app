import React, { FC, useState } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { setI18nConfig, translate } from '@utils'
import { useTheme } from '@providers'
import { styles } from './styles'
import Logo from '@assets/img/logo.png'
import { useNavigation } from '@react-navigation/native'

const Welcome: FC = () => {

  const router: any = useNavigation()

  const { colors } = useTheme()

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Image style={styles.logo} source={Logo} />
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => router.navigate('Register')}>
          <Text style={[styles.buttonText, { color: colors.text }]}>
            {translate('register')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome
