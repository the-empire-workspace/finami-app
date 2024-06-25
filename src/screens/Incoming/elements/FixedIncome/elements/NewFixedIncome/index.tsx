import { BackHandler, DynamicForm } from 'components'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { translate } from 'utils'
import { egressForm, accountForm, receiverForm, categoryForm } from './form'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  createFixedIncomes,
  createIncomeCategory,
  getAccounts,
} from 'store/actions'

const NewFixedIncome: FC = () => {
  const { colors } = useTheme()
  const { accounts } = useSelector((state: any) => state.account)
  const [categoryCreation, setCategoryCreation] = useState(false)
  const [variantEntry, setVariantEntry] = useState(true)
  const [values, setValues] = useState<any>({
    account: { value: String(accounts[0]?.id) },
  })
  const [error, setError] = useState<any>('')
  const router = useRoute()
  const navigation: any = useNavigation()
  const dispatch = useDispatch()
  const { params }: any = router
  useEffect(() => {
    if (categoryCreation) setValues({})
    else
      setValues((prev: any) => ({
        ...prev,
        account: { value: String(accounts[0]?.id) },
      }))
  }, [categoryCreation])

  const accForm = useMemo(
    () => accountForm(translate, values, accounts, colors),
    [accounts, categoryCreation],
  )
  const eForm = useMemo(
    () => {
      const form = categoryCreation
        ? categoryForm(translate, values, colors)
        : egressForm(translate, values, colors)
      if (variantEntry) {
        const index = form.findIndex((item: any) => {
          return item?.name === 'frequency'
        })
        form.splice(index, 1)
      }
      return form
    },
    [categoryCreation, variantEntry],
  )
  const rForm = useMemo(
    () => receiverForm(translate, values, colors),
    [categoryCreation],
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
      dispatch(
        createIncomeCategory({ ...sendValues, category_id: params?.id || null }),
      )
      navigation.goBack()
      return
    }

    const actualMonth = new Date().getMonth()
    const actualYear = new Date().getFullYear()

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
    if (variantEntry) {
      delete sendValues.frecuency_time
      delete sendValues.frecuency_type
    }
    dispatch(
      createFixedIncomes({ ...sendValues, category_id: params?.id || null }),
    )
    navigation.goBack()
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={translate('new_fixed_income')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {params?.type !== 'category' && (
          <View style={[styles.categoryContainer]}>
            <TouchableOpacity
              style={[styles.selectBox, { borderColor: colors.typography }]}
              onPress={() => setCategoryCreation(!categoryCreation)}>
              <View
                style={
                  categoryCreation
                    ? [
                      styles.selectBoxInner,
                      { backgroundColor: colors.typography },
                    ]
                    : {}
                }
              />
            </TouchableOpacity>
            <Text style={[styles.body, { color: colors.typography }]}>
              {translate('enable_category_creation')}
            </Text>
          </View>
        )}
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
              : translate('fixed_income')}
          </Text>
          <View style={[styles.entryTypeContainer]}>
            <View style={[styles.entryTypeBox]}>
              <TouchableOpacity
                style={[styles.selectBox, { borderColor: colors.typography }]}
                onPress={() => setVariantEntry(true)}>
                <View
                  style={
                    variantEntry
                      ? [
                        styles.selectBoxInner,
                        { backgroundColor: colors.typography },
                      ]
                      : {}
                  }
                />
              </TouchableOpacity>
              <Text style={[styles.body, { color: colors.typography }]}>
                {translate('variant_incomes')}
              </Text>
            </View>
            <View style={[styles.entryTypeBox]}>
              <TouchableOpacity
                style={[styles.selectBox, { borderColor: colors.typography }]}
                onPress={() => setVariantEntry(false)}>
                <View
                  style={
                    !variantEntry
                      ? [
                        styles.selectBoxInner,
                        { backgroundColor: colors.typography },
                      ]
                      : {}
                  }
                />
              </TouchableOpacity>
              <Text style={[styles.body, { color: colors.typography }]}>
                {translate('frequent_incomes')}
              </Text>
            </View>
          </View>
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
          text={translate('register')}
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

export default NewFixedIncome
