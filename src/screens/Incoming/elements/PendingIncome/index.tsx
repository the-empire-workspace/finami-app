import React, {FC} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler, DetailsList} from '@components'
import {useSelector} from 'react-redux'
import {translate} from 'utils'
const PendingIncome: FC = () => {
  const {colors} = useTheme()
  const {items} = useSelector((state: any) => state.incoming)

  const router: any = useNavigation()
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[styles.header, {backgroundColor: colors.background50}]}>
        <BackHandler title="Ingresos Pendientes" />
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: colors.background25}]}
          onPress={() => {
            router.navigate('newPendingIncoming')
          }}>
          <Text style={styles.h3}>{translate('new_pending_incomings')}</Text>
        </TouchableOpacity>
      </View>
      {items?.length ? (
        <DetailsList
          items={[...items]?.reduce((prev: any, next: any) => {
            return next.payment_type === 'pending_income'
              ? [...prev, next]
              : prev
          }, [])}
          type="default"
        />
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
export default PendingIncome
