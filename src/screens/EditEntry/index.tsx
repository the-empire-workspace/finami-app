import { BackHandler, DynamicForm } from 'components'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { translate } from 'utils'
import { egressForm, accountForm, receiverForm } from './form'
import { ScrollView, Text, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createIncome, editEntry, getAccounts, getCurrencies, getItem, removeItem } from 'store/actions'

const NewIncome: FC = () => {
  const { colors } = useTheme()
  const { accounts } = useSelector((state: any) => state.account)
  const [values, setValues] = useState<any>({
    account: { value: String(accounts[0]?.id) },
  })
  const navigation: any = useNavigation()
  const route = useRoute()
  const { params }: any = route
  const dispatch = useDispatch()

  const { item } = useSelector((state: any) => state.account)

  useEffect(() => {
    dispatch(getItem(params?.id))
  }, [])

  const accForm = useMemo(
    () => accountForm(translate, values, accounts, colors),
    [accounts, item],
  )
  const eForm = useMemo(() => egressForm(translate, values, colors), [item])
  const rForm = useMemo(() => receiverForm(translate, values, colors), [item])

  useEffect(() => {
    dispatch(getCurrencies())
    dispatch(getAccounts())
  }, [])

  useEffect(() => {
    const newValues: any = {}
    Object.keys(item).map(key => {
      newValues[key] =
        key === 'date'
          ? { value: new Date(item[key]) }
          : { value: String(item[key]) || '' }
      if (key === 'payment_concept')
        newValues.concept = { value: String(item[key]) || '' }
      if (key === 'name') newValues.concept = { value: String(item[key]) || '' }
      if (key === 'comment') newValues.comments = { value: String(item[key]) || '' }
    })

    setValues(newValues)
  }, [item])

  const createData = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    dispatch(editEntry({ ...sendValues, id: params?.id }))
    navigation.goBack()
  }

  const itemValues = useMemo(() => {
    const titleSelection: any = {
      income: translate('edit_income'),
      expense: translate('edit_expense'),
      compromise: translate('edit_compromise'),
      desire: translate('edit_desire'),
    }

    const subtitleSelection: any = {
      income: translate('income'),
      expense: translate('expense'),
      compromise: translate('compromise'),
      desire: translate('desire'),
    }

    const colorSelection: any = {
      income: colors.progress.ingress,
      expense: colors.progress.egress,
      compromise: colors.progress.needs,
      desire: colors.progress.wish,
    }
    return {
      title: titleSelection[item?.type || item?.entry_type] || titleSelection[item?.entry_type] || translate('detail'),
      subtitle: subtitleSelection[item?.type || item?.entry_type] || subtitleSelection[item?.entry_type] || translate('detail'),
      color: colorSelection[item?.type || item?.entry_type] || colorSelection[item?.entry_type] || colors.progress.ingress,
    }
  }, [item])

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={itemValues?.title} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <View
          style={[
            styles.formContainer,
            { borderBottomColor: colors.background25 },
          ]}>
          <Text style={[styles.h3, { color: colors.typography }]}>
            {itemValues?.subtitle}
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
        <View
          style={[
            styles.formContainer,
            { borderBottomColor: colors.background100 },
          ]}>
          <Text style={[styles.h3, { color: colors.typography }]}>
            {translate('receiver_data')}
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
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          style={[styles.buttonContent, { backgroundColor: colors.negative }]}
          styleText={{ color: colors.typography2 }}
          text={translate('cancel')}
          onPress={() => {
            navigation.goBack()
          }}
          disabled={false}
        />
        <Button
          text={translate('update')}
          style={[styles.buttonContent, { backgroundColor: colors.positive }]}
          styleText={{ color: colors.typography2 }}
          onPress={createData}
          disabled={Object.keys(values)?.reduce((prev: any, next: any) => {
            const valid = values?.[next]?.validation !== undefined ? !values[next]?.validation : false
            return prev || valid
          }, false)}
        />
      </View>
    </View>
  )
}

export default NewIncome
