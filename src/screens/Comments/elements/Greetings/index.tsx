import React, { FC } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { translate } from '@utils'
import { Button } from '@theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { sendComments } from 'store/actions'

const Greetings: FC = () => {
  const { colors } = useTheme()
  const router: any = useNavigation()
  const route = useRoute();
  const dispatch = useDispatch()
  const { responses }: any = route.params

  const sendResponses = () => {
    dispatch(sendComments({ responses }))
    router.navigate('main')
  }

  return (
    <ScrollView
      style={[{ backgroundColor: colors.background100 }]}
      contentContainerStyle={styles.scrollRoot}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.goBack()}>
            <Text
              style={[
                styles.goBack,
                styles.strongBody,
                { color: colors.typography },
              ]}>
              {translate('back')}
            </Text>
          </TouchableOpacity>
          <View style={[styles.container, styles.titlesContainer]}>
            <Text style={[styles.h1, styles.title, { color: colors.positive }]}>
              {translate('thanks')}
            </Text>
          </View>
          <View style={[styles.container, styles.titlesContainer, styles.bodyContainer]}>
            <Text style={[styles.h2, { color: colors.typography }]}>
              {translate('greetings_1')}
            </Text>
            <Text style={[styles.h2, { color: colors.typography }]}>
              {translate('greetings_2')}
            </Text>
          </View>
          <View style={[styles.container, styles.titlesContainer]}>

          </View>
        </View>
        <View style={[styles.container, styles.formContainer]}>
          <Button
            disabled={false}
            text={translate('send')}
            onPress={sendResponses}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Greetings
