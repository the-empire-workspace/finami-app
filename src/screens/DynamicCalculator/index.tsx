import React, {FC, useEffect, useMemo, useState} from 'react'
import {styles} from './styles'
import {BackHandler, DynamicForm} from 'components'
import {useTheme} from 'providers'
import {getExchangeValues, operateChange, translate} from 'utils'
import {useDispatch, useSelector} from 'react-redux'
import {ScrollView, Text, View} from 'react-native'
import {calculatorForm} from './form'
import {getCurrencies} from 'store/actions'
const DynamicCalculator: FC = () => {
  const {colors} = useTheme()

  const dispatch = useDispatch()
  const {currencies} = useSelector((state: any) => state.currency)
  const [values, setValues] = useState<any>({})
  const [result, setResult] = useState({
    mainCurrency: currencies[0],
    amount: 0,
    calculateCurrency: currencies[1],
  })

  const form = useMemo(() => {
    setResult({
      mainCurrency: currencies[0],
      amount: 0,
      calculateCurrency: currencies[1],
    })
    return calculatorForm(translate, values, currencies, colors)
  }, [currencies])

  const checkResult = async () => {
    const mainCurrency = currencies.find(
      (currency: any) => currency?.id === Number(values?.base_currency?.value),
    )

    const calculateCurrency = currencies.find(
      (currency: any) =>
        Number(currency?.id) === Number(values?.calculate_currency?.value)
    ) || currencies[1]
    if (mainCurrency && calculateCurrency) {
      const prices = await getExchangeValues(currencies, calculateCurrency?.id)
      const change = prices[String(mainCurrency?.id)]
      const amount = change
        ? operateChange(change?.op, change?.value, values.amount?.value || 0)
        : values.amount?.value || 0
      setResult({mainCurrency, amount, calculateCurrency})
    }
  }

  useEffect(() => {
    checkResult()
  }, [values])

  useEffect(() => {
    dispatch(getCurrencies())
  }, [])

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('dynamic-calculator')} />
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
            {result?.calculateCurrency?.symbol}{' '}
            {result?.amount?.toFixed(result?.calculateCurrency?.decimal)}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default DynamicCalculator
