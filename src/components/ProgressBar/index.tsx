import {View, Text} from 'react-native'
import React from 'react'
import {useTheme} from 'providers'

const ProgressBar = () => {
  const {colors} = useTheme()
  return (
    <View style={[{backgroundColor: colors.background50}]}>
      <Text>ProgressBar</Text>
    </View>
  )
}

export default ProgressBar
