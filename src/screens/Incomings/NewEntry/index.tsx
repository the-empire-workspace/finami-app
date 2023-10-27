import React, { FC, useMemo, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { BackHandler, DynamicForm, Header } from 'components'
import { useNavigation } from '@react-navigation/native'
import { translate } from 'utils'
import { NewEntryForm } from './form'
import { Button } from 'theme/components'
const NewEntry: FC = () => {
  const { colors } = useTheme()
  const [data, setData] = useState({
    payment_concept: '',
    payment_amount: '',
  })
  const router: any = useNavigation()
  const form = useMemo(() => {
    return NewEntryForm(colors.typography, translate,colors)
  }, [colors, translate])
  const changeValues = (change: any) => {
    const keys = Object.keys(change?.value)
    for (const key of keys)
      if (change?.value[key]?.validation)
        setData((oldData: any) => ({
          ...oldData,
          [key]: change?.value[key]?.value,
        }))
  }
  const submitStep=()=>{
    console.log(data)
  }
  return (
    <ScrollView contentContainerStyle={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={translate('new_entry')} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <DynamicForm formData={form} returnData={changeValues} />
        </ScrollView>
        <View style={[styles.container, styles.formContainer]}>
          <Button
            styleText={styles?.buttonLocal}
            disabled={false}
            text={translate('start')}
            onPress={submitStep}
            loading={false}
          />
        </View>
    </ScrollView>
  )
}
export default NewEntry