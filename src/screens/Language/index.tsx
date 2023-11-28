import React, {FC} from 'react'
import {styles} from './styles'
import {BackHandler} from 'components'
import {useTheme} from 'providers'
import {translate} from 'utils'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {updateLanguage} from 'store/actions'
import RNRestart from 'react-native-restart'
const languages = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Español',
    value: 'es',
  },
]
const Languages: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const setUserLanguage = (lang: any) => {
    dispatch(updateLanguage(lang))
    RNRestart.restart()
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('language')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {languages.map((language: any) => (
          <TouchableOpacity
            key={language.value}
            style={[styles.language, {borderColor: colors.typography}]}
            onPress={() => {
              setUserLanguage(language.value)
            }}>
            <Text style={[styles.subtitle, {color: colors.typography}]}>
              {language.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Languages
