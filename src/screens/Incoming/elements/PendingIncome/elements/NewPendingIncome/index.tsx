import {BackHandler, DynamicForm} from 'components'
import React, {FC, useMemo, useState} from 'react'
import {translate} from 'utils'
import {egressForm, receiverForm} from './form'
import {ScrollView, Text, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useDispatch} from 'react-redux'
import {Button} from 'theme'
import {useNavigation} from '@react-navigation/native'
import {createReceivableAccount} from 'store/actions'

const NewPendingIncome: FC = () => {
  const {colors} = useTheme()
  const [values, setValues] = useState<any>({})
  const navigation: any = useNavigation()
  const dispatch = useDispatch()

  const eForm = useMemo(() => egressForm(translate, values, colors), [])
  const rForm = useMemo(() => receiverForm(translate, values, colors), [])

  const createData = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    if (!Object.keys(sendValues).length) return

    dispatch(createReceivableAccount({...sendValues}))
    navigation.goBack()
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('new_receivable_account')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.formContainer,
            {borderBottomColor: colors.background25},
          ]}>
          <Text style={[styles.h3, {color: colors.typography}]}>
            {translate('receivable_accounts')}
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

export default NewPendingIncome
