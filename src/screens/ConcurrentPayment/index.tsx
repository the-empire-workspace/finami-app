import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'

const ConcurrentPayment: FC = () => {
  const { colors } = useTheme()

  return <View style={[styles.root, { backgroundColor: colors.background }]} />
}

export default ConcurrentPayment
