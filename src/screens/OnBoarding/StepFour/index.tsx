import React, { FC, useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { translate } from '@utils'
import { Button } from '@theme'
import { useNavigation } from '@react-navigation/native'
import { DynamicForm } from 'components'
import { useDispatch } from 'react-redux'
import { completeOnboarding, getCurrencies } from 'store/actions'
import { useSelector } from 'react-redux'
import { bankForm, cashForm, mainForm } from './form'
import { useWeb3Modal } from '@web3modal/wagmi-react-native'

const StepTwo: FC = () => {
  const { colors } = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()
  const {open} = useWeb3Modal()
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
  const [values, setValues] = useState<any>({ account_type: { value: 'cash' } })
  const {
    currency: { currencies },
  } = useSelector((state: any) => state)
  /* const currenciesFormat = currencies?.length
    ? [...currencies]?.map((currency: any) => ({
      label: `${currency?.name} (${currency?.symbol})`,
      value: String(currency?.id),
    }))
    : [
      {
        label: translate('none'),
        value: 'none',
      },
    ] */
  /* const currenciesFormatValues = useMemo(() => [...currencies]?.map((currency: any) => ({
    label: `${currency?.name} - ${currency?.symbol}`,
    value: String(currency?.id),
  })),[currencies]) */

  /*  const currenciesFormatValues = [...currencies]?.map((item: any) => {
     return { label: `${item.name} - ${item.symbol}`, value: `${item.id} ` };
   });  */
  /* const [currenciesFormatValues,setCurrenciesFormatValues] = useState([])
  useEffect(() => {
    dispatch(getCurrencies())
    const {
      currency: { currencies },
    } = useSelector((state: any) => state)
    const currenciesFormat = currencies?.map((item: any) => {
      return { label: `${item.name} - ${item.symbol}`, value: `${item.id}` };
    });
    setCurrenciesFormatValues(currenciesFormat)
  }, [getCurrencies]) */

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

  /* const formSelect = useMemo(() => {
    return selectForm(colors.typography, translate, { account_type }, colors.background100)
  }, [colors, translate])

  const walletFrom = useMemo(() => {
    return WalletForm(colors.typography, translate, { account_type }, colors.background100)
  }, [colors, translate])

  const cashFrom = useMemo(() => {
    return CashForm(colors.typography, translate, { account_number, account_comments, available_balance }, colors.background100, /* currenciesFormatValues )
  }, [colors, translate])

  const bankForm = useMemo(() => {
    return BankForm(colors.typography, translate, { account_name, account_comments, organization, account_number, available_balance, account_currency, currencies }, colors.background100, currencies)
  }, [colors, translate])

  const bankForm2 = useMemo(() => {
    return BankForm2(colors.typography, translate, { available_balance, currencies }, colors.background100, currencies)
  }, [colors, translate]) */

  const form = useMemo(() => {
    const formsTypes: any = {
      'cash': [...mainForm(translate, values, colors), ...cashForm(translate, values, currencies, colors)],
      'bank_account': [...mainForm(translate, values, colors), ...bankForm(translate, values, currencies, colors)],
    }
    return formsTypes[values?.account_type?.value] || mainForm(translate, values, colors)
  }, [values?.account_type])

  const submitStep = () => {
    console.log(values)
    const keys = Object.keys(values)
    let valid = true
    for (const key of keys)
      valid =
        valid && (!!values[key] || key === 'organization' || key === 'account_comments')
    if (valid) dispatch(completeOnboarding({ ...values, ...onboarding }))
  }

  const changeValues = (change: any) => {
    const keys = Object.keys(change?.value)
    for (const key of keys)
      if (change?.value[key]?.validation)
        setValues((oldData: any) => ({
          ...oldData,
          [key]: change?.value[key]?.value,
        }))
  }

  /*   const FormsOption = () => {
      if (data.account_type === 'wallet') return (
        <DynamicForm returnData={changeValues} formData={walletFrom} />
      )
      else if (data.account_type === 'bank') return (
        <>
          <DynamicForm returnData={changeValues} formData={bankForm} />
          <DynamicForm returnData={changeValues} formData={bankForm2} /> 
        </>
  
      )
      return (
        <DynamicForm returnData={changeValues} formData={cashFrom} />
      )
    } */

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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <DynamicForm formData={form} returnData={(data: any) => {
              for (const value in data?.value) setValues((prev: any) => ({ ...prev, [value]: data?.value[value] }))
            }} />
            {values?.account_type?.value === 'wallet' && <Button text={translate('connect_wallet')} onPress={() => open()} disabled={false}></Button>}
          </ScrollView>
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
