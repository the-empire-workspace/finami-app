import React, {FC, useEffect} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler, ItemList} from '@components'
import {translate} from 'utils'
import {useDispatch, useSelector} from 'react-redux'
import {getFixedIncomes} from 'store/actions'

const MainFixesIncome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFixedIncomes())
  }, [])
  const {itemsFixed: items} = useSelector((state: any) => state.incoming)

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('fixed_incomes')} />
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background25}]}
          onPress={() => {
            router.navigate('newFixedIncome')
          }}>
          <Text style={[styles.h3, {color: colors.typography}]}>
            {translate('new_fixed_income')}
          </Text>
        </TouchableOpacity>
      </View>
      {items?.length ? (
        <ItemList items={items} type="fixed_incomes" />
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
export default MainFixesIncome
