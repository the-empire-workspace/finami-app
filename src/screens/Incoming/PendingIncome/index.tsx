import React, {FC} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/native'
import {BackHandler} from '@components'
//import {translate} from 'utils'
const PendingIncome: FC = () => {
  const {colors} = useTheme()

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
          <Text style={styles.h3}>Nuevo Ingreso Pendiente</Text>
        </TouchableOpacity>
        {/* <Text style={styles.h3}>FixedIncome2</Text> */}
      </View>
    </View>
  )
}
export default PendingIncome
