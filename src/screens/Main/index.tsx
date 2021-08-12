import React, { FC } from 'react'
import { SafeAreaView } from 'react-native'
import { styles } from './styles'
import AppNavigator from '@routes'

const Main: FC = () => {
  return (
    <SafeAreaView style={[styles.root]}>
      <AppNavigator />
    </SafeAreaView>
  )
}

export default Main
