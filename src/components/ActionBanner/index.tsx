import React, {FC} from 'react'
import {View} from 'react-native'
import {translate} from 'utils'
import {styles} from './styles'
import {useTheme} from 'providers'
import {Button} from 'theme'
import {useNavigation} from '@react-navigation/native'

const ActionBanner: FC<any> = ({payment, expense}) => {
  const {colors} = useTheme()
  const navigation: any = useNavigation()
  return (
    <View style={[styles.root, {backgroundColor: colors.background50}]}>
      {!!payment && (
        <View style={[styles.buttonContainer]}>
          <Button
            text={translate('new_payment')}
            disabled={false}
            style={{backgroundColor: colors.progress.ingress}}
            styleText={{color: colors.typography2}}
          />
        </View>
      )}
      {!!expense && (
        <View style={[styles.buttonContainer]}>
          <Button
            text={translate('new_expense')}
            disabled={false}
            style={{backgroundColor: colors.progress.egress}}
            styleText={{color: colors.typography2}}
            onPress={() => {
              navigation.navigate('newOutcome')
            }}
          />
        </View>
      )}
    </View>
  )
}

export default ActionBanner
