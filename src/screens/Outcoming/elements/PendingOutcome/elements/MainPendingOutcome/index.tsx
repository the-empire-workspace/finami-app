import React, {FC, useEffect} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler, ItemList} from '@components'
import {translate} from 'utils'
import {useDispatch, useSelector} from 'react-redux'
import {getDebts} from 'store/actions'

const MainPendingOutcome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDebts())
  }, [])
  const {itemsDebts: items} = useSelector((state: any) => state.outcoming)

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('debts')} />
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background25}]}
          onPress={() => {
            router.navigate('newPendingOutcome')
          }}>
          <Text style={[styles.h3, {color: colors.typography}]}>{translate('new_debt')}</Text>
        </TouchableOpacity>
      </View>
      {items?.length ? (
        <ItemList items={items} type="debts" />
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
export default MainPendingOutcome
