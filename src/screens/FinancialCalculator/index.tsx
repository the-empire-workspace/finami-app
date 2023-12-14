import React, {FC, useEffect, useMemo, useState} from 'react'
import {styles} from './styles'
import {BackHandler, DynamicForm} from 'components'
import {useTheme} from 'providers'
import {translate} from 'utils'
import {useSelector} from 'react-redux'
import {ScrollView, Text, View} from 'react-native'
import {calculatorForm} from './form'
const FinancialCalculator: FC = () => {
  const {colors} = useTheme()

  const {user} = useSelector((state: any) => state.account)
  const [values, setValues] = useState<any>({})
  const [result, setResult] = useState({amount: 0})

  const form = useMemo(() => {
    return calculatorForm(translate, values, colors)
  }, [values])

  const checkResult = async () => {
    if (
      values?.amount?.value &&
      values?.interest_percentage?.value &&
      values?.time?.value &&
      values?.period?.value
    ) {
      const percentageUnit =
        (Number(values?.amount?.value) || 0) *
        ((Number(values?.interest_percentage?.value) || 0) / 100)
      switch (values?.period?.value) {
        case 'day':
          setResult({amount: percentageUnit * Number(values?.time?.value)})
          break
        case 'month':
          setResult({
            amount: percentageUnit * (Number(values?.time?.value) * 30),
          })
          break
        case 'trimester':
          setResult({
            amount: percentageUnit * (Number(values?.time?.value) * 90),
          })
          break
        case 'semester':
          setResult({
            amount: percentageUnit * (Number(values?.time?.value) * 180),
          })
          break
        case 'years':
          setResult({
            amount: percentageUnit * (Number(values?.time?.value) * 360),
          })
          break
      }
    }
  }

  useEffect(() => {
    checkResult()
  }, [values])

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('financial-calculator')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DynamicForm
          formData={form}
          returnData={(data: any) => {
            for (const value in data?.value)
              setValues((prev: any) => ({...prev, [value]: data?.value[value]}))
          }}
        />
        <View
          style={[styles.resultContainer, {borderColor: colors.typography}]}>
          <Text style={[styles.strongBody, {color: colors.typography}]}>
            {translate('total')}:
          </Text>
          <Text style={[styles.h3, {color: colors.typography}]}>
            {user?.currency_symbol} {result?.amount.toFixed(user?.decimal || 8)}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default FinancialCalculator
