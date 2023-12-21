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
            <Text style={[styles.h1, styles.title, {color: colors.positive}]}>
              {translate('hi')}
            </Text>
          </View>
          <View
            style={[
              styles.container,
              styles.titlesContainer,
              styles.bodyContainer,
            ]}>
            <Text style={[styles.body, {color: colors.typography}]}>
              {translate('leave_comments_1')}
            </Text>
            <Text style={[styles.body, {color: colors.typography}]}>
              {translate('leave_comments_2')}
            </Text>
            <Text style={[styles.body, {color: colors.typography}]}>
              {translate('leave_comments_3')}
            </Text>
            <Text style={[styles.body, {color: colors.typography}]}>
              {translate('leave_comments_4')}
            </Text>
            <Text style={[styles.strongBody, {color: colors.typography}]}>
              {translate('leave_comments_5')}
            </Text>
          </View>
          <View style={[styles.container, styles.titlesContainer]} />
        </View>
        <View style={[styles.container, styles.formContainer]}>
          <Button
            disabled={false}
            text={translate('start')}
            onPress={() => {
              router.navigate('questions')
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default StepThree
