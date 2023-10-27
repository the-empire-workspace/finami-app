import React, { FC, useMemo, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { BackHandler, DynamicForm, Header } from 'components'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { translate } from 'utils'
import { NewEntryForm } from './form'
import { Button } from 'theme/components'
import { setIncoming } from 'store/actions'
const NewFixedIncome: FC = () => {
  const { colors } = useTheme()
  const [data, setData] = useState<any>({})
  const router: any = useNavigation()
  const dispatch = useDispatch()
  const form = useMemo(() => {
    return NewEntryForm(colors.typography, translate, colors)
  }, [colors, translate])
  const changeValues =(data: any) => {
    for (const value in data?.value) setData((prev: any) => ({ ...prev, [value]: data?.value[value] }))
  }
  const submitStep = () => {
    const sendValues = Object.keys(data).reduce((prev: any, next: any) => {
      prev[next] = data[next]?.value
      return prev
    }, {})
    const valid = Object.keys(data).reduce((prev: any, next: any) => prev && data[next]?.validation, true)
    if (valid) {
      dispatch(setIncoming({ ...sendValues, entry_type: 'fixedIncome' }))
      router.goBack()
    }
  }
  return (
    <ScrollView contentContainerStyle={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={translate('new_entry')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DynamicForm formData={form} returnData={changeValues} />
      <View style={[styles.container, styles.formContainer]}>
        <View style={[styles.buttonContainer]} >
          <Button
            text={translate('cancel')}
            disabled={false}
            style={{ backgroundColor: colors.progress.egress }}
            styleText={{ color: colors.typography2 }}
            onPress={() => {
             router.goBack() 
            }}
          />
        </View>
        <View style={[styles.buttonContainer]} >
          <Button
            text={translate('create')}
            disabled={false}
            style={{ backgroundColor: colors.progress.ingress }}
            styleText={{ color: colors.typography2 }}
            onPress={submitStep}
          />
        </View>
      </View>
      </ScrollView>
    </ScrollView>
  )
}
export default NewFixedIncome