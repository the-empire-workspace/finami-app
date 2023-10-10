import React, { FC } from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'

const Button: FC<Props> = ({ text, disabled, onPress = () => { }, styleText = {}, loading = false }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: colors.background25 }
      ]}>
      {loading && (
        <ActivityIndicator color={colors.typography} size="small" />
      )}
      <Text style={[styles.strongBody, styles.text, { color: colors.typography }, styleText]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
