import React, { FC, useState } from 'react'
import { Text, View, Switch, TouchableOpacity } from 'react-native'
import { setI18nConfig, translate } from '@utils'
import { useTheme } from '@providers'
import { styles } from './styles'
const Welcome: FC = () => {

  const { colors, setScheme, isDark } = useTheme()
  const [language, setLanguage] = useState('es')

  const toggleScheme = () => isDark ? setScheme('light') : setScheme('dark');
  const changeLanguage = () => {
    const lang = (language === 'es') ? 'en' : 'es'
    setLanguage(lang)
    setI18nConfig(lang)
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Switch value={isDark} onValueChange={toggleScheme} />
      <TouchableOpacity onPress={changeLanguage}>
        <Text style={{ color: colors.primary }}>
          {translate('change_language')}
        </Text>
      </TouchableOpacity>
      <Text style={{ color: colors.primary }}>{translate('welcome')}</Text>
    </View>
  )
}

export default Welcome
