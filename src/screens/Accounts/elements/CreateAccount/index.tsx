import { BackHandler, DynamicForm } from 'components'
import React, { FC, useMemo, useState } from 'react'
import { translate } from 'utils'
import { bankForm, cashForm, mainForm } from './form'
import { ScrollView, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useSelector } from 'react-redux'
import { Button } from 'theme'
import { useWeb3Modal } from '@web3modal/wagmi-react-native'
const CreateAccount: FC = () => {

  const [values, setValues] = useState<any>({ account_type: { value: 'cash' } })
  const { colors } = useTheme()
  const { currencies } = useSelector((state: any) => state.currency)
  const { open } = useWeb3Modal()

  const form = useMemo(() => {
    const formsTypes: any = {
      'cash': [...mainForm(translate, values), ...cashForm(translate, values, currencies)],
      'bank_account': [...mainForm(translate, values), ...bankForm(translate, values, currencies)],
    }
    return formsTypes[values?.account_type?.value] || mainForm(translate, values)
  }, [values?.account_type])

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={translate('create_account')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DynamicForm formData={form} returnData={(data: any) => {
          for (const value in data?.value) setValues((prev: any) => ({ ...prev, [value]: data?.value[value] }))
        }} />
        {values?.account_type?.value === 'wallet' && <Button text={translate('connect_wallet')} onPress={() => open()} disabled={false}></Button>}
      </ScrollView>
    </View>
  )
}

export default CreateAccount