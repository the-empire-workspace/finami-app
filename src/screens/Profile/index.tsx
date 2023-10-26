import React, { FC, useCallback } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { ProfileInfo, ProfileNav } from './elements'
import { useSelector } from 'react-redux'
import { Props } from './interface'
import { useFocusEffect, useRoute } from '@react-navigation/native'

const Profile: FC = () => {

  const { colors } = useTheme()

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <ProfileInfo />
      <ProfileNav />
    </View>
  )
}

export default Profile
