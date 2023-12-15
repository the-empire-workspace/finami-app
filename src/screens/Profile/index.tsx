import React, {FC} from 'react'
import {ScrollView} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {ProfileInfo, ProfileNav} from './elements'
const Profile: FC = () => {
  const {colors} = useTheme()

  return (
    <ScrollView
      style={[styles.root, {backgroundColor: colors.background100}]}
      contentContainerStyle={styles.scrollRoot}>
      <ProfileInfo />
      <ProfileNav />
    </ScrollView>
  )
}

export default Profile
