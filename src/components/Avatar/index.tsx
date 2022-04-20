import React, { FC, useEffect, useState } from 'react'
import { TouchableOpacity, Image, Alert } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import LogoI from '@assets/img/logoI.png'
import {
  grantCameraPermission,
  grantReadSDPermission,
  grantWriteSDPermission,
  ImagePicker,
} from '@utils'
import ImageResizer from 'react-native-image-resizer'
import { Props } from './interface'

const Avatar: FC<Props> = ({
  actionAvatar = () => {},
  defaultAvatar,
  statical = false,
  width: staticWidth,
  height: staticHeight,
}) => {
  const { colors } = useTheme()

  const [image, setImage] = useState(defaultAvatar ? defaultAvatar : LogoI)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setImage(defaultAvatar ? defaultAvatar : LogoI)
    const { width, height } = Image.resolveAssetSource(
      defaultAvatar ? defaultAvatar : LogoI,
    )
    setDimensions({ width: width || 150, height: height || 150 })
  }, [defaultAvatar])

  const getImage = async () => {
    if (!statical) {
      await grantCameraPermission()
      await grantWriteSDPermission()
      await grantReadSDPermission()
      try {
        const newImage: any = await ImagePicker()
        if (!newImage.ok) return
        const { uri } = await ImageResizer.createResizedImage(
          newImage.uri ? newImage.uri : newImage.assets[0].uri,
          300,
          300,
          'JPEG',
          80,
        )
        setImage({ uri, isStatic: true })
        actionAvatar(uri)
      } catch (error) {
        return Alert.alert('Unable to resize the photo')
      }
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.logoContainer,
        {
          backgroundColor: colors.primary,
          ...(staticWidth ? { width: staticWidth } : {}),
          ...(staticHeight ? { height: staticHeight } : {}),
        },
      ]}
      onPress={getImage}
    >
      <Image
        style={{
          width: dimensions.width ? dimensions.width / 4 : 150,
          height: dimensions.height ? dimensions.height / 4 : 150,
        }}
        source={image}
      />
    </TouchableOpacity>
  )
}

export default Avatar
