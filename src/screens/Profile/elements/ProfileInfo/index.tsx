import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { Avatar } from 'components'
import { useSelector } from 'react-redux'

const ProfileInfo: FC = () => {
  const { colors } = useTheme()

  const {
    account: { user },
  } = useSelector((state: any) => state)

  return (
    <View style={styles.profileContainer}>
      <Avatar statical={true} defaultAvatar={user.avatar} />
      <Text style={[styles.profileName, { color: colors.text }]}>
        {user.name}
      </Text>
      <Text
        style={[
          styles.profileProfession,
          {
            color: colors.secundaryText,
          },
        ]}
      >
        {user.profession}
      </Text>
    </View>
  )
}

export default ProfileInfo
