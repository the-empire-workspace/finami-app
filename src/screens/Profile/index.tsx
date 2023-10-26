import React, {FC} from 'react'
import {View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {ProfileInfo, ProfileNav} from './elements'
const Profile: FC = () => {
  const {colors} = useTheme()

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <ProfileInfo />
      <ProfileNav />
    </View>
  )
}

export default Profile
