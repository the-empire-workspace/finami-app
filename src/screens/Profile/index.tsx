import React, { FC } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { ProfileInfo } from './elements'
import { useSelector } from 'react-redux'

const Profile: FC = () => {
  const { colors } = useTheme()

  const { currency: { items: currencies = [] } } = useSelector((state: any) => state)

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ProfileInfo />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
        {currencies.map((currency: any, index: number) => {
          const { width, height } = Image.resolveAssetSource(currency.image)
          return (
            <TouchableOpacity key={index}>
              <Image source={currency.image} width={width / 6} height={height / 6} style={{ width: width / 6, height: height / 6 }} />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default Profile
