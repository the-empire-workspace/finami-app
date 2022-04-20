import { Button, DynamicForm } from 'components'
import { useTheme } from 'providers'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import {
  filterByCurrency,
  filterEntries,
  processEntries,
  translate,
} from 'utils'
import { FullReport } from './elements'
import reportForm from './reportForm'
import { styles } from './styles'

const CurrencyReport: FC<any> = ({ currency }) => {
  const { colors } = useTheme()

  const [form, setForm] = useState({ form: {}, valid: false })
  const formulary = reportForm(colors.text, translate)
  const {
    incoming: { items: incomingItems },
    outcoming: { items: outcomingItems },
  } = useSelector((state: any) => state)
  const [totals, setTotals] = useState({
    incoming: { total: 0, pending: 0, monthly: 0 },
    outcoming: { total: 0, pending: 0, monthly: 0 },
  })
  const [showTotal, setShowTotal] = useState(false)

  const processReport = () => {
    const settedForm: any = form.form
    const from = new Date(settedForm.from_date?.value).getTime()
    const to = new Date(settedForm.to_date?.value).getTime()
    const currencyIncoming = filterByCurrency(currency, incomingItems)
    const currencyOutcoming = filterByCurrency(currency, outcomingItems)
    const incomingFilter = filterEntries(currencyIncoming, from, to)
    const outcomingFilter = filterEntries(currencyOutcoming, from, to)
    const totalIncoming = processEntries(incomingFilter)
    const totalOutcoming = processEntries(outcomingFilter)
    setTotals({ incoming: totalIncoming, outcoming: totalOutcoming })
    setShowTotal(true)
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {showTotal ? (
        <FullReport
          totals={totals}
          onClose={() => setShowTotal(false)}
          dates={form.form}
        />
      ) : (
        <>
          <View style={styles.formContainer}>
            <DynamicForm
              formData={formulary}
              returnData={(data: any) => {
                setForm({ form: data.value, valid: data.validation })
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text={translate('report')}
              disabled={!form.valid}
              onPress={processReport}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default CurrencyReport
