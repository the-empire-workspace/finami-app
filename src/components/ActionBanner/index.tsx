import React, {FC} from 'react'
import {View} from 'react-native'
import {translate} from 'utils'
import {styles} from './styles'
import {useTheme} from 'providers'
import {Button} from 'theme'

const ActionBanner: FC<any> = ({payment, expense}) => {
  const {colors} = useTheme()
  return (
    <View style={[styles.root, {backgroundColor: colors.background50}]}>
      {!!payment && (
        <View style={[styles.buttonContainer, styles.marginRight]}>
          <Button
            text={translate('new_payment')}
            disabled={false}
            style={{backgroundColor: colors.progress.ingress}}
            styleText={{color: colors.typography2}}
          />
        </View>
      )}
      {!!expense && (
        <View style={[styles.buttonContainer, styles.marginLeft]}>
          <Button
            text={translate('new_expense')}
            disabled={false}
            style={{backgroundColor: colors.progress.egress}}
            styleText={{color: colors.typography2}}
          />
        </View>
      )}
    </View>
  )
}

export default ActionBanner
