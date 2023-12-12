import React, {FC, useEffect} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler, ItemList} from '@components'
import {translate} from 'utils'
import {useDispatch, useSelector} from 'react-redux'
import {getBasicExpenses} from 'store/actions'

const MainFixesOutcome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBasicExpenses())
  }, [])
  const {itemsBasics: items} = useSelector((state: any) => state.outcoming)

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <BackHandler title={translate('basic_expenses')} />
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background25}]}
          onPress={() => {
            router.navigate('newFixedOutcome')
          }}>
          <Text style={styles.h3}>{translate('new_basic_expenses')}</Text>
        </TouchableOpacity>
      </View>
      {items?.length ? (
        <ItemList items={items} type="basic_expenses" />
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
export default MainFixesOutcome
