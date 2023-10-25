import React, { FC, useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
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
  const { username, image, currency } = useSelector((state: any) => state?.onboarding)
  const [data, setData] = useState({
    username: username || '',
    image: image || '',
    currency: currency || [] ,
  })
  useEffect(() => {
    dispatch(getCurrencies())
  }, [])
  const {
    currency: { currencies },
  } = useSelector((state: any) => state)
  const currenciesFormatValues = [...currencies]?.map((item: any) => {
    return { label: `${item.name} - ${item.symbol}`, value: `${item.id} ` };
  });

  const form = useMemo(() => {
    return stepTwoForm(colors.typography, translate, { username: username || '',currenciesFormatValues:currenciesFormatValues }, colors.background100, currenciesFormatValues)
  }, [colors, translate, username])


  const submitStep = () => {
    if (data.username && data.currency) {
      dispatch(setStep(data))
      router.navigate('StepThree')
    }
  }

  const changeUsername = (change: any) => {
    if (change?.value?.username?.validation)
      setData(oldData => ({
        ...oldData,
        username: change.value?.username?.value,
      }))
  }

  return (
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
                setData(oldData => ({ ...oldData, image: change }))
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
  )
}

export default StepTwo
