import React, { FC, useEffect, useMemo, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { translate } from '@utils'
import { Button, Avatar } from '@theme'
import { useNavigation } from '@react-navigation/native'
import { DynamicForm } from 'components'
import { stepTwoForm } from './form'
import { useDispatch } from 'react-redux'
import { getCurrencies, setStep } from 'store/actions'
import { useSelector } from 'react-redux'

const StepTwo: FC = () => {
  const { colors } = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()
  const { username, image, principal_currency } = useSelector(
    (state: any) => state?.onboarding,
  )
  const [data, setData] = useState<any>({
    username: username || '',
    image: image || '',
    principal_currency: principal_currency || [],
  })

  useEffect(() => {
    dispatch(getCurrencies())
  }, [])

  const { currencies } = useSelector((state: any) => state.currency)

  const currenciesFormatValues = useMemo(
    () =>
      [...currencies]?.map((currencyData: any) => ({
        label: `${currencyData?.name} - ${currencyData?.symbol}`,
        value: String(currencyData?.id),
      })),
    [currencies.length],
  )

  const form = useMemo(() => {
    return stepTwoForm(
      colors.typography,
      translate,
      {
        username: username || '',
        principal_currency: principal_currency || '',
      },
      colors.background100,
      currenciesFormatValues,
    )
  }, [colors, translate, username, currenciesFormatValues])

  const submitStep = () => {
    if (data?.username && data?.principal_currency) {
      const sendValues = Object.keys(data).reduce((prev: any, next: any) => {
        const string = typeof data[next] === 'string' ? data[next] : null
        prev[next] = data[next]?.value || string 
        return prev
      }, {})
      if (sendValues?.principal_currency && sendValues?.username) {
        dispatch(setStep(sendValues))
        router.navigate('StepThree')
      }
    }
  }

  const changeUsername = (change: any) => {
    for (const value in change?.value)
      setData((prev: any) => ({ ...prev, [value]: change?.value[value] }))
  }

  return (
    <KeyboardAvoidingView style={[{ backgroundColor: colors.background100 }]} >
       
    <ScrollView
      style={[{ backgroundColor: colors.background100 }]}
      contentContainerStyle={styles.scrollRoot}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.goBack()}>
            <Text
              style={[
                styles.goBack,
                styles.strongBody,
                { color: colors.typography },
              ]}>
              {translate('back')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.h2, styles.title, { color: colors.typography }]}>
            {translate('know_who_is_start')}
          </Text>
          <View style={[styles.container, styles.centerContainer]}>
            <Avatar
              defaultAvatar={data?.image ? { uri: data?.image } : null}
              actionAvatar={(change: any) => {
                setData((oldData: any) => ({ ...oldData, image: change }))
              }}
            />
          </View>
          <View style={[styles.container, styles.formContainer]}>
            <DynamicForm returnData={changeUsername} formData={form} />
          </View>
        </View>
        <View style={[styles.container, styles.formContainer]}>
          <Button
            disabled={false}
            text={translate('next')}
            onPress={submitStep}
          />
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default StepTwo
