import React, { FC, useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { translate } from '@utils'
import { Button } from '@theme'
import { useNavigation } from '@react-navigation/native'
import { DynamicForm } from 'components'
import { stepTwoForm } from './Forms/form'
import { WalletForm } from './Forms/Wallet'
import { selectForm } from './Forms/selectForm'
import { useDispatch } from 'react-redux'
import { completeOnboarding, getCurrencies } from 'store/actions'
import { useSelector } from 'react-redux'

const StepTwo: FC = () => {
  const { colors } = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: any) => state?.intermitence)
  const {
    account_name = '',
    account_comments = '',
    account_number = '',
    organization = '',
    account_type = 'wallet',
    account_currency = '',
    available_balance = '',
    ...onboarding
  } = useSelector((state: any) => state?.onboarding)
  const [data, setData] = useState<any>({
    account_name,
    account_number,
    account_type,
    account_currency,
    available_balance,
  })
  useEffect(() => {
    dispatch(getCurrencies())
  }, [])
  const {
    currency: { currencies },
  } = useSelector((state: any) => state)
  const currenciesFormatValues = currencies?.map((item: any) => {
    return { label: `${item.name} - ${item.symbol}`, value: `${item.id} ` };
  });

  /* const form = useMemo(() => {
    return stepTwoForm(
      colors.typography,
      translate,
      {
        account_name,
        account_comments,
        account_number,
        organization,
        account_currency,
        available_balance,
      },
      
    )
  }, [colors, translate, account_name, account_comments, currencies]) */

  const formSelect = useMemo(() => {
    return selectForm(colors.typography, translate, { account_type }, colors.background100)
  }, [colors, translate])

  const walletFrom = useMemo(() => {
    return WalletForm(colors.typography, translate, { account_type },colors.background100)
  }, [colors, translate])

  const submitStep = () => {
    const keys = Object.keys(data)
    let valid = true
    for (const key of keys)
      valid =
        valid && (!!data[key] || key === 'organization' || key === 'account_comments')
    if (valid) dispatch(completeOnboarding({ ...data, ...onboarding }))
  }

  const changeValues = (change: any) => {
    const keys = Object.keys(change?.value)
    for (const key of keys)
      if (change?.value[key]?.validation)
        setData((oldData: any) => ({
          ...oldData,
          [key]: change?.value[key]?.value,
        }))
  }
  const FormsOption = () => {
    if (data.account_type === 'wallet') return (
      <DynamicForm returnData={changeValues} formData={walletFrom} />
    )
    else if (data.account_type === 'bank') return (<Text
      style={[
        styles.goBack,
        styles.strongBody,
        { color: colors.typography },
      ]}>
      bancko
    </Text>)
    return (<Text
      style={[
        styles.goBack,
        styles.strongBody,
        { color: colors.typography },
      ]}>
      cach
    </Text>)
  }

  useEffect(() => {
    dispatch(getCurrencies())
  }, [])

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
          <View style={[styles.container, styles.formContainer]}>
            <DynamicForm returnData={changeValues} formData={formSelect} />
            <FormsOption />
            {/* <DynamicForm returnData={changeValues} formData={form} /> */}
          </View>
        </View>
        <View style={[styles.container, styles.formContainer]}>
          <Button
            styleText={styles?.buttonLocal}
            disabled={false}
            text={translate('start')}
            onPress={submitStep}
            loading={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default StepTwo
