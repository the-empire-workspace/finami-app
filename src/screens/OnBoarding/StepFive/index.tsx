import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {styles} from './styles'
import {translate} from '@utils'
import {useTheme} from 'providers'
import {Button} from 'theme'
import {useDispatch, useSelector} from 'react-redux'
import {completeOnboarding} from 'store/actions'

const StepFive = () => {
  const {colors} = useTheme()
  const {isLoading} = useSelector((state: any) => state?.intermitence)
  const oB = useSelector((state: any) => state?.onboarding)
  const dispatch = useDispatch()
  return (
    <ScrollView
      style={[{backgroundColor: colors.background100}]}
      contentContainerStyle={styles.scrollRoot}>
      <View style={styles.root}>
        <Text style={[styles.h1, {color: colors.progress.ingress}]}>
          {translate('welcome_beta')}
        </Text>
        <Text style={[styles.subtitle, {color: colors.typography}]}>
          {translate('welcome_beta_text01')}
        </Text>
        <Text style={[styles.subtitle, {color: colors.typography}]}>
          {translate('welcome_beta_text02')}
        </Text>
        <Text style={[styles.subtitle, {color: colors.typography}]}>
          {translate('welcome_beta_text03')}
        </Text>
        <Text style={[styles.subtitle, {color: colors.typography}]}>
          {translate('welcome_beta_text04')}
        </Text>
        <View style={[styles.container]}>
          <Button
            styleText={styles?.buttonLocal}
            disabled={false}
            text={translate('next')}
            onPress={() => {
              dispatch(completeOnboarding({...oB}))
            }}
            loading={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default StepFive
