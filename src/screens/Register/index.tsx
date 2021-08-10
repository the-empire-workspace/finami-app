import React, { FC, useState } from 'react'
import { View, TouchableOpacity, Image, Alert } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import LogoI from '@assets/img/logoI.png'
import { Button, DynamicForm } from '@components'
import { registerForm } from './form'
import { grantCameraPermission, grantReadSDPermission, grantWriteSDPermission, ImagePicker, translate } from '@utils'
import ImageResizer from 'react-native-image-resizer'

const Register: FC = () => {

  const { colors } = useTheme()
  const [image, setImage] = useState(LogoI)
  const [form, setForm] = useState([])

  const getImage = async () => {
    await grantCameraPermission()
    await grantWriteSDPermission()
    await grantReadSDPermission()
    try {
      const newImage: any = await ImagePicker()
      if (!newImage.ok) return
      const { uri } = await ImageResizer.createResizedImage(newImage.uri ? newImage.uri : newImage.assets[0].uri, 300, 300, 'JPEG', 80)
      setImage({ uri, isStatic: true })
    } catch (error) {
      return Alert.alert('Unable to resize the photo')
    }
  }
  
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <TouchableOpacity style={[styles.logoContainer, { backgroundColor: colors.secundary }]} onPress={getImage}>
          <Image style={styles.logo} source={image} />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <DynamicForm formData={registerForm(colors.secundaryText, translate)} returnData={(data: any) => { setForm(data) }} />
        </View>
        <View style={styles.button}>
          <Button text={translate('create_account')} onPress={() => { console.log('hola') }} disabled={!form[1] && image.uri} />
        </View>
      </View>
    </View>
  )
}

export default Register
