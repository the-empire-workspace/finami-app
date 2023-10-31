import React, {FC, useMemo, useState} from 'react'
import {View, ScrollView} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {BackHandler, DynamicForm} from 'components'
import {translate} from 'utils'
import {NewEntryForm} from './form'
import {Button} from 'theme/components'
const NewPendingIncome: FC = () => {
  const {colors} = useTheme()
  const [data, setData] = useState({})
  const form = useMemo(() => {
    return NewEntryForm(colors.typography, translate, colors)
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
  const submitStep = () => {
    console.log(data)
  }
  return (
    <ScrollView
      contentContainerStyle={[
        styles.root,
        {backgroundColor: colors.background100},
      ]}>
      <BackHandler title="Nuevo Ingreso Pendiente" />
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
export default NewPendingIncome
