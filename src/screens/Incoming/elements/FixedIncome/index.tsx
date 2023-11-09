import React, {FC, useEffect} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler, DetailsList} from '@components'
import {translate} from 'utils'
import {useDispatch, useSelector} from 'react-redux'
import {getIncoming} from 'store/actions'
const FixedIncome: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    //dispatch(getIncoming())
  }, [])
  const {items} = useSelector((state: any) => state.incoming)

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <BackHandler title={translate('fixed_incoming')} />
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background25}]}
          onPress={() => {
            router.navigate('newFixedIncome')
          }}>
          <Text style={styles.h3}>{translate('new_entry')}</Text>
        </TouchableOpacity>
      </View>
      {items?.length ? (
        <DetailsList items={items} type="default" />
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
export default FixedIncome
