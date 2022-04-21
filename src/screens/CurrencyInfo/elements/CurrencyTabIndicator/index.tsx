import {useTheme} from 'providers'
import React, {FC} from 'react'
import {View} from 'react-native'
import {styles} from './styles'

const CurrencyTabIndicator: FC<any> = ({state}) => {
  const {colors} = useTheme()
  const transparent = 'transparent'
  return (
    <View style={[styles.root, {backgroundColor: colors.secondary}]}>
      <View
        style={[
          styles.dot,
          {
            borderColor: colors.primary,
            backgroundColor:
              Number(JSON.stringify(state.index)) === 0
                ? colors.primary
                : transparent,
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            borderColor: colors.primary,
            backgroundColor:
              Number(JSON.stringify(state.index)) === 1
                ? colors.primary
                : transparent,
          },
        ]}
      />
    </View>
  )
}

export default CurrencyTabIndicator
