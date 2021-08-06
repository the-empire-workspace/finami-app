import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { translate } from '@utils'

const Welcome: FC = () => {
  return (
    <View>
      <Text>{translate('welcome')}</Text>
    </View>
  )
}

export default Welcome
