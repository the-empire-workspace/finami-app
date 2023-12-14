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
import { getCurrencies, setStep, updateUser } from 'store/actions'
import { useSelector } from 'react-redux'

const EditProfile: FC = () => {
  const { colors } = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()
  const { user } = useSelector(
    (state: any) => state?.account,
  )
  const [data, setData] = useState<any>({
    username: user?.username || '',
    picture: user?.picture || '',
    principal_currency: user?.currency_id || [],
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
        username: user?.username || '',
        principal_currency: String(user?.currency_id) || '',
      },
      colors.background100,
      currenciesFormatValues,
    )
  }, [colors, translate, currenciesFormatValues])

  const updateProfile = () => {
    if (data?.username && data?.principal_currency) {
      const sendValues = Object.keys(data).reduce((prev: any, next: any) => {
        prev[next] = data[next]?.value || data[next]
        return prev
      }, {})
      dispatch(updateUser(sendValues))
      router.goBack()
    }
  }

  const changeUsername = (change: any) => {
    for (const value in change?.value)
      setData((prev: any) => ({ ...prev, [value]: change?.value[value] }))
  }

  return (
    <ScrollView
      style={[{ backgroundColor: colors.background100 }]}
      contentContainerStyle={styles.scrollRoot}>
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={[styles.container, styles.centerContainer]}>
            <Avatar
              defaultAvatar={data?.picture ? { uri: data?.picture } : null}
              actionAvatar={(change: any) => {
                setData((oldData: any) => ({ ...oldData, picture: change }))
              }}
            />
          </View>
          <View style={[styles.container, styles.formContainer]}>
            <DynamicForm returnData={changeUsername} formData={form} />
          </View>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            style={[styles.buttonContent, { backgroundColor: colors.negative }]}
            styleText={{ color: colors.typography2 }}
            text={translate('cancel')}
            onPress={() => {
              router.goBack()
            }}
            disabled={false}
          />
          <Button
            text={translate('update')}
            style={[styles.buttonContent, { backgroundColor: colors.positive }]}
            styleText={{ color: colors.typography2 }}
            onPress={updateProfile}
            disabled={false}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default EditProfile
