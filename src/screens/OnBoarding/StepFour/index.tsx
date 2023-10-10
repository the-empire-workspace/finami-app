import React, { FC, useEffect, useMemo, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useTheme } from "providers"
import { translate } from '@utils'
import { Button, Avatar } from "@theme"
import { useNavigation } from "@react-navigation/native"
import { DynamicForm } from "components"
import { stepTwoForm } from "./form"
import { useDispatch } from "react-redux"
import { completeOnboarding, getCurrencies, setStep } from "store/actions"
import { useSelector } from "react-redux"

const StepTwo: FC = () => {
  const { colors } = useTheme();
  const router: any = useNavigation()
  const dispatch = useDispatch()
  const { currencies } = useSelector((state: any) => state?.currency)
  const { isLoading } = useSelector((state: any) => state?.intermitence)
  const { account_name = '', account_comments = '', account_number = '', bank = '', account_type = '', account_currency = '', available_balance = '', ...onboarding } = useSelector((state: any) => state?.onboarding)
  const [data, setData] = useState<any>({ account_name, account_number, account_type, account_currency, available_balance })

  const form = useMemo(() => {
    return stepTwoForm(colors.typography, translate, { account_name, account_comments, account_number, bank, account_type, account_currency, available_balance }, currencies)
  }, [colors, translate, account_name, account_comments, currencies])

  const submitStep = () => {
    const keys = Object.keys(data)
    let valid = true
    for (const key of keys) valid = valid && (!!data[key] || key === 'bank' || key === 'account_comments')
    if (valid) {
      dispatch(completeOnboarding({ ...data, ...onboarding }))
    }
  }

  const changeValues = (data: any) => {
    const keys = Object.keys(data?.value)
    for (const key of keys) if (data?.value[key]?.validation) setData((oldData: any) => ({ ...oldData, [key]: data?.value[key]?.value }))
  }

  useEffect(() => {
    dispatch(getCurrencies())
  }, [])

  return (
    <ScrollView style={[{ backgroundColor: colors.background50 }]} contentContainerStyle={styles.scrollRoot}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.goBack()}>
            <Text style={[styles.goBack, styles.strongBody, { color: colors.typography }]}>{translate('back')}</Text>
          </TouchableOpacity>
          <View style={[styles.container, styles.formContainer]}>
            <DynamicForm returnData={changeValues} formData={form} />
          </View>
        </View>
        <View style={[styles.container, styles.formContainer]}>
          <Button styleText={styles?.buttonLocal} disabled={false} text={translate('start')} onPress={submitStep} loading={isLoading} />
        </View>
      </View>
    </ScrollView>
  )
}

export default StepTwo