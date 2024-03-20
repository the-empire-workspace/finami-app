import { BackHandler, DynamicForm } from 'components'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { translate } from 'utils'
import { egressForm, accountForm, receiverForm, categoryForm } from './form'
import { ScrollView, Text, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  getAccounts,
  getFixedIncome,
  getCategoryIncome,
  updateFixedIncome,
  updateCategoryIncome,
} from 'store/actions'

const EditFixedIncome: FC = () => {
  const { colors } = useTheme()
  const { accounts } = useSelector((state: any) => state.account)
  const [categoryCreation, setCategoryCreation] = useState(false)
  const [values, setValues] = useState<any>({
    account: { value: String(accounts[0]?.id) },
  })
  const [defaultSetted, setDefaultSetted] = useState(false)
  const [error, setError] = useState<any>('')
  const router: any = useRoute()
  const navigation: any = useNavigation()
  const params = router.params
  const dispatch = useDispatch()
  const { item } = useSelector((state: any) => state.incoming)

  useEffect(() => {
    if (params?.id)
      if (params?.type === 'category') dispatch(getCategoryIncome(params?.id))
      else dispatch(getFixedIncome(params?.id))
  }, [params?.id])

  useEffect(() => {
    const newValues: any = {}
    Object.keys(item).map(key => {
      newValues[key] =
        key === 'date'
          ? { value: new Date(item[key]) }
          : { value: String(item[key]) || '' }
      if (key === 'payment_concept')
        newValues.concept = { value: String(item[key]) || '' }
      if (key === 'emissor')
        newValues.receiver_name = { value: String(item[key]) || '' }
      if (key === 'name') newValues.concept = { value: String(item[key]) || '' }
      if (key === 'account')
        newValues.account = { value: String(item[key]) || '' }
    })

    setValues(newValues)
    setCategoryCreation(!!item?.name)
    setDefaultSetted(true)
  }, [item, accounts.length])
  
  const accForm = useMemo(
    () => accountForm(translate, values, accounts, colors),
    [accounts.length, item, defaultSetted],
  )
  const eForm = useMemo(
    () =>
      categoryCreation
        ? categoryForm(translate, values, colors)
        : egressForm(translate, values, colors),
    [categoryCreation, item, defaultSetted],
  )
  const rForm = useMemo(
    () => receiverForm(translate, values, colors),
    [item, defaultSetted],
  )

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  const createData = () => {
    setError('')
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    if (!Object.keys(sendValues).length) return
    if (categoryCreation) {
      dispatch(updateCategoryIncome({ ...sendValues, id: params?.id }))
      navigation.goBack()
      return
    }

    const actualMonth = new Date(item?.date).getMonth()
    const actualYear = new Date(item?.date).getFullYear()

    const dateMonth = (sendValues?.date || new Date()).getMonth()
    const dateYear = (sendValues?.date || new Date()).getFullYear()
    if (dateMonth < actualMonth && actualYear === dateYear) {
      setError(translate('date_error'))
      return
    }
    if (dateYear < actualYear) {
      setError(translate('date_error'))
      return
    }
    if (error) console.log(error, 'an error happend')
    dispatch(updateFixedIncome({ ...sendValues, id: params?.id }))
    navigation.goBack()
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={translate('update_fixed_income')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!categoryCreation && (
          <View
            style={[
              styles.formContainer,
              { borderBottomColor: colors.background25 },
            ]}>
            <Text style={[styles.h3, { color: colors.typography }]}>
              {translate('account_selection')}
            </Text>
            <DynamicForm
              formData={accForm}
              returnData={(data: any) => {
                for (const value in data?.value)
                  setValues((prev: any) => ({
                    ...prev,
                    [value]: data?.value[value],
                  }))
              }}
            />
          </View>
        )}
        <View
          style={[
            styles.formContainer,
            { borderBottomColor: colors.background25 },
          ]}>
          <Text style={[styles.h3, { color: colors.typography }]}>
            {categoryCreation
              ? translate('category')
              : translate('basic_expenses')}
          </Text>
          <DynamicForm
            formData={eForm}
            returnData={(data: any) => {
              for (const value in data?.value)
                setValues((prev: any) => ({
                  ...prev,
                  [value]: data?.value[value],
                }))
            }}
          />
        </View>
        {!categoryCreation && (
          <View
            style={[
              styles.formContainer,
              { borderBottomColor: colors.background100 },
            ]}>
            <Text style={[styles.h3, { color: colors.typography }]}>
              {translate('issuer_data')}
            </Text>
            <DynamicForm
              formData={rForm}
              returnData={(data: any) => {
                for (const value in data?.value)
                  setValues((prev: any) => ({
                    ...prev,
                    [value]: data?.value[value],
                  }))
              }}
            />
          </View>
        )}
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          style={[styles.buttonContent, { backgroundColor: colors.negative }]}
          styleText={{ color: colors.typography2 }}
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
          style={[styles.buttonContent, { backgroundColor: colors.positive }]}
          styleText={{ color: colors.typography2 }}
          onPress={createData}
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

export default EditFixedIncome
