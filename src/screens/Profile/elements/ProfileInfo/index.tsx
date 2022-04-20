import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { Avatar } from 'components'
import { useSelector } from 'react-redux'
import { Props } from './interface'

const ProfileInfo: FC<Props> = ({ navigation }) => {
  const { colors } = useTheme()

  const {
    account: { user },
  } = useSelector((state: any) => state)

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        style={styles.dotContainer}
        onPress={() => navigation.toggleDrawer()}
      >
        <View
          style={[styles.roundDot, { backgroundColor: colors.secondary }]}
        />
        <View
          style={[styles.roundDot, { backgroundColor: colors.secondary }]}
        />
        <View
          style={[styles.roundDot, { backgroundColor: colors.secondary }]}
        />
      </TouchableOpacity>
      <Avatar statical={true} defaultAvatar={{ uri: user.avatar }} />
      <Text style={[styles.profileName, { color: colors.text }]}>
        {user.name}
      </Text>
      <Text
        style={[
          styles.profileProfession,
          {
            color: colors.secondaryText,
          },
        ]}
      >
        {user.profession}
      </Text>
    </View>
  )
}

export default ProfileInfo
