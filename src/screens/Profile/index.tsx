import React, { FC, useCallback } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { ProfileInfo } from './elements'
import { useSelector } from 'react-redux'
import { Props } from './interface'
import { useFocusEffect, useRoute } from '@react-navigation/native'

const Profile: FC<Props> = ({ navigation }) => {
  
  const { colors } = useTheme()

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>

    </View>
  )
}

export default Profile
