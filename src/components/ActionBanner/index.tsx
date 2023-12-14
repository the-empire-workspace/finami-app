import React, { FC } from 'react'
import { View } from 'react-native'
import { translate } from 'utils'
import { styles } from './styles'
import { useTheme } from 'providers'
import { Button } from 'theme'
import { useNavigation } from '@react-navigation/native'

const ActionBanner: FC<any> = ({ payment, expense, goals, type }) => {
  const { colors } = useTheme()
  const navigation: any = useNavigation()
  return (
    <View style={[styles.root, { backgroundColor: colors.background50 }]}>
      {!!payment && (
        <View style={[styles.buttonContainer]}>
          <Button
            text={translate('new_income')}
            disabled={false}
            style={{ backgroundColor: colors.progress.ingress }}
            styleText={{ color: colors.typography2 }}
            onPress={() => {
              navigation.navigate('newIncome')
            }}
          />
        </View>
      )}
      {!!expense && (
        <View style={[styles.buttonContainer]}>
          <Button
            text={translate('new_expense')}
            disabled={false}
            style={{ backgroundColor: colors.progress.egress }}
            styleText={{ color: colors.typography2 }}
            onPress={() => {
              navigation.navigate('newOutcome')
            }}
          />
        </View>
      )}
      {!!goals && (
        <View>
          <Button
            text={translate(`new_${type}`)}
            disabled={false}
            style={{ backgroundColor: type === 'compromise' ? colors.progress.needs : colors.progress.wish }}
            styleText={{ color: colors.typography2 }}
            onPress={() => {
              navigation.navigate('newGoals', { type: type })
            }}
          />
        </View>
      )}
    </View>
  )
}

export default ActionBanner
