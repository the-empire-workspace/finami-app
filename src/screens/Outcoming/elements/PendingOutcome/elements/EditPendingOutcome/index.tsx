import {BackHandler, DynamicForm} from 'components'
import React, {FC, useEffect, useMemo, useState} from 'react'
import {translate} from 'utils'
import {egressForm, receiverForm} from './form'
import {ScrollView, Text, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'theme'
import {useNavigation, useRoute} from '@react-navigation/native'
import {getAccounts, getDebt, updateDebt} from 'store/actions'

const EditPendingOutcome: FC = () => {
  const {colors} = useTheme()
  const [values, setValues] = useState<any>({})
  const router: any = useRoute()
  const navigation: any = useNavigation()
  const params = router.params
  const dispatch = useDispatch()
  const {item} = useSelector((state: any) => state.outcoming)

  useEffect(() => {
    if (params?.id) dispatch(getDebt(params?.id))
  }, [params?.id])

  useEffect(() => {
    const newValues: any = {}
    Object.keys(item).map(key => {
      newValues[key] =
        key === 'date' || key === 'limit_date'
          ? {value: new Date(item[key])}
          : {value: String(item[key]) || ''}
      if (key === 'payment_concept')
        newValues.concept = {value: String(item[key]) || ''}
      if (key === 'emissor')
        newValues.receiver_name = {value: String(item[key]) || ''}
      if (key === 'name') newValues.concept = {value: String(item[key]) || ''}
    })
    setValues(newValues)
  }, [item])

  const eForm = useMemo(() => egressForm(translate, values, colors), [item])
  const rForm = useMemo(() => receiverForm(translate, values, colors), [item])

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  const createData = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    if (!Object.keys(sendValues).length) return

    dispatch(updateDebt({...sendValues, id: params?.id}))
    navigation.goBack()
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('update_debt')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.formContainer,
            {borderBottomColor: colors.background25},
          ]}>
          <Text style={[styles.h3, {color: colors.typography}]}>
            {translate('debt')}
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
            {borderBottomColor: colors.background100},
          ]}>
          <Text style={[styles.h3, {color: colors.typography}]}>
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
          text={translate('register')}
          style={[styles.buttonContent, {backgroundColor: colors.positive}]}
          styleText={{color: colors.typography2}}
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

export default EditPendingOutcome
