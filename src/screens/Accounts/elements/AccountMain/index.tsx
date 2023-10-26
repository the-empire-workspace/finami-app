import React, { FC, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { BackHandler } from 'components'
import { useTheme } from 'providers'
import { translate } from 'utils'
import { useDispatch, useSelector } from 'react-redux'
import { getAccounts } from 'store/actions'
import { Button } from 'theme'
import { useNavigation } from '@react-navigation/native'

const Currencies: FC = () => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const router: any = useNavigation()

  const { accounts } = useSelector((state: any) => state.account)

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <View style={[{ backgroundColor: colors.background50 }]}>
        <BackHandler title={translate('accounts')} />
        <View style={[styles.buttonContainer]}>
          <Button text={translate('new_account')} disabled={false} onPress={() => router.navigate('createAccount')} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {accounts?.map((item: any, index: any) => (
          <TouchableOpacity
            style={[styles.accountItem, { backgroundColor: colors.background25 }]}
            key={index}>
            <View style={[styles.accountInfoContainer]}>
              <Text style={[styles.strongBody, { color: colors.typography }]}>
                {item?.account_name}
              </Text>
              <Text
                style={[styles.smallStrongBody, { color: colors.typography }]}>
                {translate('account_type')}:
              </Text>
              <Text style={[styles.smallBody, { color: colors.typography }]}>
                {item?.account_type}
              </Text>
            </View>
            <Text
              style={[
                styles.strongBody,
                {
                  color:
                    item?.total_amount === 0
                      ? colors.typography
                      : item?.total_amount > 0
                        ? colors.progress.ingress
                        : colors.progress.egress,
                },
              ]}>
              {item?.currency_symbol}
              {item?.total_amount}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Currencies
