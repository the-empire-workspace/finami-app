import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'

const Dashboard: FC = () => {

  return (
    <View style={[styles.root]}>
      <Text>Hola soy un dashboard =)</Text>
    </View>
  )
}

export default Dashboard
