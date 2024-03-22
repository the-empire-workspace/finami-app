import React, {FC, useEffect} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler, ItemList} from '@components'
import {translate} from 'utils'
import {useDispatch, useSelector} from 'react-redux'
import {getReceivableAccounts} from 'store/actions'

const MainPendingIncome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReceivableAccounts())
  }, [])
  const {itemsReceivableAccounts: items} = useSelector(
    (state: any) => state.incoming,
  )

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('receivable_accounts')} />
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background25}]}
          onPress={() => {
            router.navigate('newPendingIncome')
          }}>
          <Text style={[styles.h3, {color: colors.typography}]}>{translate('new_receivable_account')}</Text>
        </TouchableOpacity>
      </View>
      {items?.length ? (
        <ItemList items={items} type="receivable_accounts" />
      ) : (
        <View style={styles.noItemBox}>
          <Text style={[styles.noItemText, {color: colors.typography}]}>
            {translate('no_items')}
          </Text>
        </View>
      )}
    </View>
  )
}
export default MainPendingIncome
