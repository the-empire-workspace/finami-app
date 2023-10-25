import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useSelector } from 'react-redux'
import { Avatar } from 'theme'
import Pencil from '../../../../../assets/img/Pencil.svg'
import Coins from '../../../../../assets/img/Coins.svg'
import { useNavigation } from '@react-navigation/native'

const ProfileInfo: FC<any> = () => {
  const { colors } = useTheme()

  const {
    account: { user },
  } = useSelector((state: any) => state)

  const nav:any = useNavigation()

  return (
    <View style={[styles.profileContainer, { backgroundColor: colors.background50 }]}>
      <TouchableOpacity style={[styles.currency, { borderColor: colors.typography }]} onPress={() => { nav.navigate('Dashboard') }}>
        <Coins width={26} height={26} />
      </TouchableOpacity>
      <Avatar statical={true} defaultAvatar={{ uri: user.picture }} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.h3, { color: colors.typography }]}>
          {user.username}
        </Text>
        <TouchableOpacity>
          <Pencil width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.CurrencyContainer}>
        <Text style={[styles.text, styles.smallBody, { color: colors.typography }]}>Moneda principal:</Text>
        <Text style={[styles.smallBody, { color: colors.typography }]}>{user?.currency_name} {user?.currency_symbol}</Text>
      </View>
    </View>
  )
}

export default ProfileInfo
