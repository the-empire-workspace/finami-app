import React, { FC } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'

const Button: FC<Props> = ({ text, onPress, disabled }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.root,
        { backgroundColor: colors.background, borderColor: colors.primary },
      ]}
    >
      <Text style={[styles.text, { color: colors.primary }]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
