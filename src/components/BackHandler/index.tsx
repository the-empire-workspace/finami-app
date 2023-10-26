import React, {FC} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {styles} from './styles'
import {Props} from './interface'
import Arrow from '@assets/img/ArrowLeft.svg'
import {useNavigation} from '@react-navigation/core'
import {useTheme} from 'providers'

const BackHandler: FC<Props> = ({title}) => {
  const router = useNavigation()

  const {colors} = useTheme()

  return (
    <View style={[styles.root, {backgroundColor: colors.background50}]}>
      <TouchableOpacity onPress={() => router.goBack()}>
        <Arrow width={32} height={32} />
      </TouchableOpacity>
      {!!title && (
        <Text style={[styles.h3, styles.text, {color: colors.typography}]}>
          {title}
        </Text>
      )}
    </View>
  )
}

export default BackHandler
