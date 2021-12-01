import React, { FC } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'
import Arrow from '@assets/img/arrow.png'
import Question from '@assets/img/question.png'
import { useNavigation } from '@react-navigation/core'

const BackHandler: FC<Props> = () => {

  const router = useNavigation()
  const { colors } = useTheme()

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => router.goBack()}>
        <Image style={styles.arrow} source={Arrow} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.question} source={Question} />
      </TouchableOpacity>
    </View>
  )
}

export default BackHandler
