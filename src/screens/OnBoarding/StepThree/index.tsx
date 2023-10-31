import React, {FC} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {translate} from '@utils'
import {Button} from '@theme'
import {useNavigation} from '@react-navigation/native'

const StepThree: FC = () => {
  const {colors} = useTheme()
  const router: any = useNavigation()

  return (
    <ScrollView
      style={[{backgroundColor: colors.background100}]}
      contentContainerStyle={styles.scrollRoot}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.goBack()}>
            <Text
              style={[
                styles.goBack,
                styles.strongBody,
                {color: colors.typography},
              ]}>
              {translate('back')}
            </Text>
          </TouchableOpacity>
          <View style={[styles.container, styles.titlesContainer]}>
            <Text style={[styles.h2, styles.title, {color: colors.typography}]}>
              {translate('great')}
            </Text>
            <Text style={[styles.h2, styles.title, {color: colors.typography}]}>
              {translate('only_one_step')}
            </Text>
          </View>
          <View style={[styles.container, styles.titlesContainer]}>
            <Text style={[styles.subtitle, {color: colors.typography}]}>
              {translate('welcome_message')}
            </Text>
          </View>
          <View style={[styles.container, styles.titlesContainer]}>
            <Text style={[styles.h2, {color: colors.states.caution}]}>
              {translate('welcome_caution')}
            </Text>
          </View>
        </View>
        <View style={[styles.container, styles.formContainer]}>
          <Button
            disabled={false}
            text={translate('next')}
            onPress={() => {
              router.navigate('StepFour')
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default StepThree
