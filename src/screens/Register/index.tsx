import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import LogoI from '@assets/img/logoI.png'
import { Avatar, BackHandler, Button, DynamicForm } from '@components'
import { registerForm } from './form'
import { translate } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencyPrice, signin } from 'store/actions'
import { useNavigation } from '@react-navigation/native'

const Register: FC = () => {
  const { colors } = useTheme()
  const [form, setForm] = useState<any>({ validation: false, value: {} })
  const dispatch = useDispatch()
  const {
    currency: { items: currencies },
    account: { user },
  } = useSelector((state: any) => state)
  const navigation = useNavigation()
  const [image, setImage] = useState(user ? user?.avatar : LogoI)

  const register = () => {
    const result: any = {}
    for (const key in form.value) result[key] = form.value[key].value
    dispatch(signin({ ...result, avatar: image }))
    if (user) {
      dispatch(getCurrencyPrice())
      navigation.goBack()
    }
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackHandler />
      <View style={styles.formContent}>
        <View style={styles.content}>
          <Avatar
            actionAvatar={setImage}
            defaultAvatar={{ uri: user?.avatar }}
          />
          <View style={styles.formContainer}>
            <DynamicForm
              formData={registerForm(
                colors.secondaryText,
                translate,
                currencies,
                user,
              )}
              returnData={(data: any) => {
                setForm(data)
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              text={
                user ? translate('update_account') : translate('create_account')
              }
              onPress={register}
              disabled={!form.validation && image?.uri}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Register
