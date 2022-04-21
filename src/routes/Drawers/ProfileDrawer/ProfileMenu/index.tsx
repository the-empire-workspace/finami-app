import React, {FC, useState} from 'react'
import {Switch, Text, TouchableOpacity, View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {useTheme} from 'providers'
import {getLanguage, setI18nConfig, translate} from 'utils'
import {styles} from './styles'
import {useNavigation} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {updateLanguage} from 'store/actions'

const ProfileMenu: FC = () => {
  const {isDark, setScheme, colors} = useTheme()
  const [lang, setLang] = useState(getLanguage())
  const navigator: any = useNavigation()
  const dispatch = useDispatch()

  const setLanguage = (item: any) => {
    setLang(item)
    setI18nConfig(item)
    dispatch(updateLanguage(item))
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background}]}>
      <View style={styles.box}>
        <Switch
          value={isDark}
          onValueChange={() => setScheme(isDark ? 'light' : 'dark')}
        />
      </View>
      <Picker
        style={styles.picker}
        itemStyle={[styles.pickerText, {color: colors.text}]}
        selectedValue={lang}
        onValueChange={setLanguage}>
        <Picker.Item
          style={{...styles.pickerText, ...{color: colors.text}}}
          label="Espanol"
          value="es"
        />
        <Picker.Item
          style={{...styles.pickerText, ...{color: colors.text}}}
          label="English"
          value="en"
        />
      </Picker>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigator.navigate('editUser')}>
        <Text style={[styles.pickerText, {color: colors.text}]}>
          {translate('edit_profile')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text style={[styles.pickerText, {color: colors.text}]}>
          {translate('donate')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileMenu
