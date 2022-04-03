import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import LogoI from '@assets/img/logoI.png'
import { Avatar, Button, DynamicForm } from '@components'
import { registerForm } from './form'
import { translate } from '@utils'
import { useDispatch } from 'react-redux'
import { signin } from 'store/actions'

const Register: FC = () => {
  const { colors } = useTheme()
  const [image, setImage] = useState(LogoI)
  const [form, setForm] = useState<any>({ validation: false, value: {} })
  const dispatch = useDispatch()

  const register = () => {
    const result: any = {}
    for (const key in form.value) result[key] = form.value[key].value
    dispatch(signin({ ...result, avatar: image }))
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Avatar actionAvatar={setImage} />
        <View style={styles.formContainer}>
          <DynamicForm
            formData={registerForm(colors.secundaryText, translate)}
            returnData={(data: any) => {
              setForm(data)
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            text={translate('create_account')}
            onPress={register}
            disabled={!form.validation && image?.uri}
          />
        </View>
      </View>
    </View>
  )
}

export default Register
