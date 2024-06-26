import React, {FC, useMemo, useState} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {translate} from '@utils'
import {Button} from '@theme'
import {useNavigation} from '@react-navigation/native'
import {DynamicForm} from 'components'
import {useDispatch} from 'react-redux'
import {setStep} from 'store/actions'
import {useSelector} from 'react-redux'
import {bankForm, cashForm} from './form'
/* import {useWeb3Modal} from '@web3modal/wagmi-react-native' */

const StepTwo: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()
  /*   const {open} = useWeb3Modal() */
  const {isLoading} = useSelector((state: any) => state?.intermitence)
  const {username, image, currency} = useSelector(
    (state: any) => state?.onboarding,
  )
  const [values, setValues] = useState<any>({account_type: {value: 'cash'}})
  const {currencies} = useSelector((state: any) => state.currency)
  const form = useMemo(() => {
    const formsTypes: any = {
      cash: cashForm(translate, values, currencies, colors),
      bank_account: bankForm(translate, values, currencies, colors),
    }
    setValues((prev: any) => ({
      account_type: prev.account_type,
      account_currency: {value: currencies[0]?.id},
    }))
    return formsTypes[values?.account_type?.value]
  }, [values?.account_type?.value])

  const submitStep = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value || ''
      return prev
    }, {})
    const valid = Object.keys(values).reduce(
      (prev: any, next: any) =>
        prev && (values[next]?.validation === true),
      true,
    )
    if (!sendValues?.account_currency)
      sendValues.account_currency = currencies[0]?.id

    if (valid) {
      dispatch(setStep({...sendValues, username, image, currency}))
      router.navigate('StepFive')
      //dispatch(completeOnboarding({...sendValues, username, image, currency}))
    }
  }

  return (
    <ScrollView
      style={[{backgroundColor: colors.background100}]}
      contentContainerStyle={styles.scrollRoot}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.goBack()}>
            <Text
              style={[
                styles.goBack,
                styles.strongBody,
                {color: colors.typography},
              ]}>
              {translate('back')}
            </Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <DynamicForm
              formData={form}
              returnData={(data: any) => {
                for (const value in data?.value)
                  setValues((prev: any) => ({
                    ...prev,
                    [value]: data?.value[value],
                  }))
              }}
            />
            {values?.account_type?.value === 'wallet' && (
              <Button
                text={translate('connect_wallet')}
                /* onPress={() => open()} */
                disabled={false}
              />
            )}
          </ScrollView>
        </View>
        <View style={[styles.container, styles.formContainer]}>
          <Button
            styleText={styles?.buttonLocal}
            disabled={false}
            text={translate('next')}
            onPress={submitStep}
            loading={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default StepTwo
