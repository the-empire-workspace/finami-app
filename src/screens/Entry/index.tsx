import React, { FC, useEffect, useState } from 'react'
import { Switch, Text, View } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Button, DynamicForm, Avatar, BackHandler } from '@components'
import { itemForm, categoryForm, multiple } from './forms'
import { translate } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { setIncoming } from 'store/actions'

const Entry: FC = () => {
  const { colors } = useTheme()
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { params = {} }: any = route
  const {
    incoming: { items: IncomingItems },
  } = useSelector((state: any) => state)
  const [image, setImage] = useState(params?.item?.image)
  const [form, setForm] = useState({
    form: { paymentType: null },
    valid: false,
  })
  const [itemView, setItemView] = useState(true)

  const [formulary, setFormulary] = useState(
    itemView
      ? itemForm(colors.secundaryText, translate, params?.item)
      : categoryForm(colors.secundaryText, translate),
  )

  const checkPaymentType = () => {
    const paymentType: any = form?.form?.paymentType
    if (paymentType) {
      const newForm = itemForm(colors.secundaryText, translate, params?.item)
      if (paymentType?.value === 'concurrent') {
        const multip: any = multiple(
          colors.secundaryText,
          translate,
          params?.item,
        )
        newForm.push(multip)
        return setFormulary(newForm)
      }
      setFormulary(newForm)
    }
  }

  useEffect(() => {
    setFormulary(
      itemView
        ? itemForm(colors.secundaryText, translate, params?.item)
        : categoryForm(colors.secundaryText, translate),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemView])

  useEffect(() => {
    checkPaymentType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.form?.paymentType])

  const saveForm = () => {
    const formData: any = form?.form
    const newFormData: any = {}

    for (const key of Object.keys(formData))
      newFormData[key] = formData[key].value

    newFormData.image = image
    if (typeof newFormData.payment_date === 'object')
      newFormData.payment_date = newFormData.payment_date?.getTime()

    if (params?.type === 'incomings') {
      newFormData.type = 'incomings'
      newFormData.item = itemView
      const newIncoming: any = IncomingItems

      if (params?.item) {
        const index = newIncoming.findIndex(
          (income: any) => income.id === params?.item.id,
        )
        newIncoming.splice(index, 1, newFormData)
      } else {
        newFormData.id = IncomingItems.length
        newIncoming.push(newFormData)
      }
      dispatch(setIncoming(newIncoming))
      return navigation.goBack()
    }
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <BackHandler />
      <Avatar actionAvatar={setImage} defaultAvatar={params?.item?.image} />
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: colors.text }]}>
          {translate('categories')}
        </Text>
        <Switch
          trackColor={{ true: colors.text, false: colors.text }}
          thumbColor={itemView ? colors.secundary : colors.secundary}
          ios_backgroundColor={colors.text}
          onValueChange={() => setItemView(prev => !prev)}
          value={itemView}
        />
        <Text style={[styles.switchText, { color: colors.text }]}>
          {translate('items')}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <DynamicForm
          formData={formulary}
          returnData={(data: any) => {
            setForm({ form: data.value, valid: data.validation })
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          text={translate('create_entry')}
          disabled={!(!!form.valid && image)}
          onPress={saveForm}
        />
      </View>
    </View>
  )
}

export default Entry
