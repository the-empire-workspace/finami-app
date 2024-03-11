import React, {FC, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {translate} from 'utils'
import {useNavigation} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {deleteAccount} from 'store/actions'
import WarningCircle from '@assets/img/WarningCircle.svg'
import {DynamicForm} from 'components'
import {deleteForm} from './form'
import {Button} from 'theme'

const Entry: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()
  const [values, setValues] = useState<any>({})

  const router = useNavigation()

  const deleteUser = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    const valid = Object.keys(values).reduce(
      (prev: any, next: any) => prev && values[next]?.validation,
      true,
    )
    if (valid) dispatch(deleteAccount(sendValues))
  }

  const setFormValue = (data: any) => {
    for (const value in data?.value)
      setValues((prev: any) => ({...prev, [value]: data?.value[value]}))
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <ScrollView
        style={[styles.modalContainer]}
        contentContainerStyle={[styles.modalLayout]}>
        <WarningCircle width={64} height={64} />
        <Text
          style={[styles.h1, {color: colors.typography}, styles.deleteTitle]}>
          {translate('delete_account')}
        </Text>
        <Text
          style={[
            styles.h3,
            {color: colors.typography},
            styles.deleteSubtitle,
          ]}>
          {translate('delete_account_subtitle')}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: colors.typography},
            styles.deleteBody,
          ]}>
          {translate('delete_account_body')}
        </Text>
        <Text
          style={[
            styles.strongBody,
            {color: colors.typography, backgroundColor: colors.states.alert},
            styles.deleteWarning,
          ]}>
          {translate('delete_account_warning')}
        </Text>
        <View style={[styles.container]}>
          <DynamicForm
            formData={deleteForm(translate, values, colors)}
            returnData={setFormValue}
          />
        </View>
      </ScrollView>
      <View style={[styles.containerActions]}>
        <Button
          style={{...styles.buttonStyle, ...{backgroundColor: colors.negative}}}
          styleText={{color: colors.typography2}}
          text={translate('cancel')}
          onPress={() => router.goBack()}
          disabled={false}
        />
        <Button
          style={{...styles.buttonStyle, ...{backgroundColor: colors.positive}}}
          styleText={{color: colors.typography2}}
          text={translate('delete')}
          onPress={() => deleteUser()}
          disabled={Object.keys(values).reduce(
            (prev: any, next: any) => prev && !values[next]?.validation,
            true,
          )}
        />
      </View>
    </View>
  )
}

export default Entry
