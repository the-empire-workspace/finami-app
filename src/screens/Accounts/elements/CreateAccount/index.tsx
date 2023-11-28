import {BackHandler, DynamicForm} from 'components'
import React, {FC, useEffect, useMemo, useState} from 'react'
import {translate} from 'utils'
import {bankForm, cashForm, cryptoForm, mainForm} from './form'
import {ScrollView, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'theme'
import {useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi-react-native'
import {useAccount} from 'wagmi'
import {createCryptoAccount, createCurrencyAccount} from 'store/actions'
import {useNavigation} from '@react-navigation/native'
const CreateAccount: FC = () => {
  const [newConnect, setNewConnect] = useState(false)
  const {colors} = useTheme()
  const {currencies} = useSelector((state: any) => state.currency)
  const [values, setValues] = useState<any>({
    account_type: {value: 'cash'},
    account_currency: {value: String(currencies[0]?.id)},
  })
  const {accounts} = useSelector((state: any) => state.account)
  const {open} = useWeb3Modal()
  const dispatch = useDispatch()

  const {isConnected, address, status} = useAccount()
  const {selectedNetworkId} = useWeb3ModalState()
  const navigation = useNavigation()

  const form = useMemo(() => {
    const formsTypes: any = {
      cash: [
        ...mainForm(translate, values, colors),
        ...cashForm(translate, values, currencies, colors),
      ],
      bank_account: [
        ...mainForm(translate, values, colors),
        ...bankForm(translate, values, currencies, colors),
      ],
      connect: [
        ...mainForm(translate, values, colors),
        ...cryptoForm(translate, values, colors),
      ],
    }
    if (values?.account_type?.value === 'wallet')
      setValues((prev: any) => ({account_type: prev.account_type}))
    else
      setValues((prev: any) => ({
        account_type: prev.account_type,
        account_currency: {value: String(currencies[0]?.id)},
      }))

    return (
      formsTypes[
        newConnect && values?.account_type?.value === 'wallet'
          ? 'connect'
          : values?.account_type?.value
      ] || mainForm(translate, values, colors)
    )
  }, [values?.account_type?.value, newConnect])

  const checkWalletExist = () => {
    const existAccount = accounts?.find(
      (item: any) =>
        item?.account_number === address &&
        item?.organization === selectedNetworkId?.toString(),
    )
    if (!existAccount) return setNewConnect(true)
    return setNewConnect(false)
  }

  useEffect(() => {
    if (isConnected && status === 'connected' && address) checkWalletExist()
  }, [isConnected, status, selectedNetworkId])

  const createAccount = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    if (values?.account_type?.value === 'wallet') {
      dispatch(
        createCryptoAccount({...sendValues, address, netId: selectedNetworkId}),
      )
      navigation.goBack()
      return
    }

    dispatch(createCurrencyAccount(sendValues))
    navigation.goBack()
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('create_account')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DynamicForm
          formData={form}
          returnData={(data: any) => {
            for (const value in data?.value)
              setValues((prev: any) => ({...prev, [value]: data?.value[value]}))
          }}
        />
        {values?.account_type?.value === 'wallet' && (
          <Button
            text={
              newConnect
                ? translate('change_wallet')
                : translate('connect_wallet')
            }
            onPress={() => open()}
            disabled={false}
          />
        )}
      </ScrollView>
      <View style={[styles.scrollContainer]}>
        <Button
          text={translate('create_account')}
          onPress={createAccount}
          disabled={Object.keys(values)?.reduce((prev: any, next: any) => {
            return prev || !values[next]?.validation
          }, false)}
        />
      </View>
    </View>
  )
}

export default CreateAccount
