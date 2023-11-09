import React, {FC, useEffect, useMemo, useState} from 'react'
import {View, ScrollView} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {BackHandler, DynamicForm} from 'components'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {translate} from 'utils'
import {NewEntryForm} from './form'
import {Button} from 'theme/components'
import {getAccounts, setIncoming} from 'store/actions'
const NewFixedIncome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAccounts())
  }, [])
  const {accounts} = useSelector((state: any) => state.account)
  const {items} = useSelector((state: any) => state.incoming)
  const [data, setData] = useState<any>({})
  const form = useMemo(() => {
    return NewEntryForm(colors.typography, translate, colors, accounts)
  }, [colors, translate, accounts])
  const handleChange = (newData: any) => {
    for (const value in newData?.value)
      setData((prev: any) => ({...prev, [value]: newData?.value[value]}))
  }
  const handleSubmit = () => {
    const sendValues = Object.keys(data).reduce((prev: any, next: any) => {
      prev[next] = data[next]?.value === undefined ? '' : data[next]?.value
      return prev
    }, {})
    const valid = Object.keys(data).reduce(
      (prev: any, next: any) => prev && data[next]?.validation,
      true,
    )
    if (valid) {
      dispatch(
        setIncoming({
          ...sendValues,
          entry_type: 'income',
          state: 'pending',
          //provicional_id
          id: Number(items?.length + 1),
        }),
      )
      router.goBack()
    }
  }
  return (
    <ScrollView
      contentContainerStyle={[
        styles.root,
        {backgroundColor: colors.background100},
      ]}>
      <BackHandler title={translate('new_entry')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DynamicForm formData={form} returnData={handleChange} />
        <View style={[styles.container, styles.formContainer]}>
          <View style={[styles.buttonContainer]}>
            <Button
              text={translate('cancel')}
              disabled={false}
              style={{backgroundColor: colors.progress.egress}}
              styleText={{color: colors.typography2}}
              onPress={() => {
                router.goBack()
              }}
            />
          </View>
          <View style={[styles.buttonContainer]}>
            <Button
              text={translate('create')}
              disabled={false}
              style={{backgroundColor: colors.progress.ingress}}
              styleText={{color: colors.typography2}}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  )
}
export default NewFixedIncome
