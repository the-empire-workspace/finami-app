import React, {FC, useEffect, useState} from 'react'
import {ScrollView, Switch, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Button, DynamicForm, Avatar, BackHandler} from '@components'
import {itemForm, categoryForm, multiple} from './forms'
import {translate} from '@utils'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation, useRoute} from '@react-navigation/native'
import {setIncoming, setOutcoming} from 'store/actions'
import {processConcurrentData, processCreation} from './functions'

const Entry: FC = () => {
  const {colors} = useTheme()
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {params = {}}: any = route

  const {
    incoming: {items: IncomingItems},
    outcoming: {items: OutcomingItems},
    currency: {items: currencies},
  } = useSelector((state: any) => state)

  const [image, setImage] = useState(params?.item?.image)

  const [form, setForm] = useState<any>({
    form: {paymentType: null},
    valid: false,
  })

  const [itemView, setItemView] = useState(true)

  const [formulary, setFormulary] = useState(
    itemView
      ? itemForm(colors.secondaryText, translate, params?.item, currencies)
      : categoryForm(colors.secondaryText, translate),
  )

  const checkPaymentType = () => {
    const paymentType: any = form?.form?.paymentType
    if (paymentType) {
      const newForm = itemForm(
        colors.secondaryText,
        translate,
        params?.item,
        currencies,
      )
      if (paymentType?.value === 'concurrent') {
        const multip: any = multiple(
          colors.secondaryText,
          translate,
          params?.item,
        )
        newForm.push(multip)
        return setFormulary(newForm)
      }

      const newFormData = Object.keys(form?.form).reduce(
        (prev: any, next: any) => {
          const formItem = newForm?.find(item => item?.name === next)
          if (formItem) prev[next] = form?.form[next]
          return prev
        },
        {},
      )

      const validation = Object.keys(newFormData).reduce(
        (prev: any, next: any) => {
          return prev && form?.form[next]?.validation
        },
        true,
      )

      setForm({form: newFormData, valid: validation})
      setFormulary(newForm)
    }
  }

  useEffect(() => {
    setFormulary(
      itemView
        ? itemForm(colors.secondaryText, translate, params?.item, currencies)
        : categoryForm(colors.secondaryText, translate),
    )
  }, [itemView])

  useEffect(() => {
    checkPaymentType()
  }, [form.form?.paymentType])

  const saveForm = () => {
    const formData: any = form?.form

    let newFormData: any = {}
    for (const key of Object.keys(formData))
      newFormData[key] = formData[key].value

    newFormData.image = image
    if (typeof newFormData.payment_date === 'object')
      newFormData.payment_date = newFormData.payment_date?.getTime()

    const paymentType: any = form?.form?.paymentType
    if (paymentType?.value === 'concurrent') {
      const newData = processConcurrentData(
        newFormData,
        params?.item,
        params?.type,
      )
      if (!newData) return
      newFormData = newData
    }

    if (params?.type === 'incomings') {
      const newIncomings = processCreation(
        newFormData,
        IncomingItems,
        itemView,
        params,
      )
      dispatch(setIncoming(newIncomings))
      return navigation.goBack()
    }

    if (params?.type === 'outcomings') {
      const newOutcomings = processCreation(
        newFormData,
        OutcomingItems,
        itemView,
        params,
      )
      dispatch(setOutcoming(newOutcomings))
      return navigation.goBack()
    }
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background}]}>
      <BackHandler />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.main}>
        <Avatar
          actionAvatar={setImage}
          defaultAvatar={
            params?.item?.image ? {uri: params?.item?.image} : null
          }
        />
        <View style={styles.switchContainer}>
          <Text style={[styles.switchText, {color: colors.text}]}>
            {translate('categories')}
          </Text>
          <Switch
            trackColor={{true: colors.text, false: colors.text}}
            thumbColor={itemView ? colors.secondary : colors.secondary}
            ios_backgroundColor={colors.text}
            onValueChange={() => setItemView(prev => !prev)}
            value={itemView}
          />
          <Text style={[styles.switchText, {color: colors.text}]}>
            {translate('items')}
          </Text>
        </View>
        <View style={styles.formContainer}>
          <DynamicForm
            formData={formulary}
            returnData={(data: any) => {
              setForm({form: data.value, valid: data.validation})
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            text={translate('create_entry')}
            disabled={!form.valid}
            onPress={saveForm}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Entry
