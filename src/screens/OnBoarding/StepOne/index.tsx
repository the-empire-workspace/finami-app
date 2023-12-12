import React, {FC} from 'react'
import {Text, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {translate} from '@utils'
import {Button} from '@theme'
import {useNavigation} from '@react-navigation/native'

const StepOne: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View />
      <View style={styles.container}>
        <Text style={[styles.h1, styles.title, {color: colors.typography}]}>
          {translate('welcome_finami')}
        </Text>
        <Text
          style={[
            styles.subtitle,
            styles.subtitleLocal,
            {color: colors.typography},
          ]}>
          {translate('welcome_finami_start')}
        </Text>
      </View>
      <View style={styles.container}>
        <Button
          disabled={false}
          text={translate('next')}
          onPress={() => {
            router.navigate('StepTwo')
          }}
        />
      </View>
    </View>
  )
}

export default StepOne
