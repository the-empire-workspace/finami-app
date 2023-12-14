import {BackHandler, DynamicForm} from 'components'
import React, {FC, useEffect, useMemo, useState} from 'react'
import {translate} from 'utils'
import {bankForm, cashForm, cryptoForm} from './form'
import {ScrollView, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'theme'
import {useNavigation} from '@react-navigation/native'
import {updateSingleAccount} from 'store/actions'

const EditAccount: FC = () => {
  const {colors} = useTheme()
  const {currencies} = useSelector((state: any) => state.currency)
  const [values, setValues] = useState<any>({})

  const navigation = useNavigation()

  const {account = {}} = useSelector((state: any) => state.account)
  const dispatch = useDispatch()

  useEffect(() => {
    const newValues: any = {}
    Object.keys(account).map(key => {
      newValues[key] = {value: account[key] || ''}
    })

    setValues(newValues)
  }, [account])

  const form = useMemo(() => {
    const formsTypes: any = {
      cash: [...cashForm(translate, values, currencies, colors)],
      bank_account: [...bankForm(translate, values, currencies, colors)],
      connect: [...cryptoForm(translate, values, colors)],
    }
    return (
      formsTypes[
        values?.account_type?.value === 'wallet'
          ? 'connect'
          : values?.account_type?.value
      ] || cryptoForm(translate, values, colors)
    )
  }, [values?.account_type?.value])

  const editAccount = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    dispatch(updateSingleAccount({...account, ...sendValues}))
    navigation.goBack()
  }
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('edit_account')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DynamicForm
          formData={form}
          returnData={(data: any) => {
            for (const value in data?.value)
              setValues((prev: any) => ({...prev, [value]: data?.value[value]}))
          }}
        />
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          style={[styles.buttonContent, {backgroundColor: colors.negative}]}
          styleText={{color: colors.typography2}}
          text={translate('cancel')}
          onPress={() => {
            navigation.goBack()
          }}
          disabled={Object.keys(values)?.reduce((prev: any, next: any) => {
            return prev || values?.[next]?.validation !== undefined
              ? !values[next]?.validation
              : false
          }, false)}
        />
        <Button
          text={translate('update')}
          style={[styles.buttonContent, {backgroundColor: colors.positive}]}
          styleText={{color: colors.typography2}}
          onPress={editAccount}
          disabled={Object.keys(values)?.reduce((prev: any, next: any) => {
            const valid =
              values?.[next]?.validation !== undefined
                ? !values[next]?.validation
                : false
            return prev || valid
          }, false)}
        />
      </View>
    </View>
  )
}

export default EditAccount
