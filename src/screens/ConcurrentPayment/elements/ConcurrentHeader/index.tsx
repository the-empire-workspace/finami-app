import React, {FC} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation, useRoute} from '@react-navigation/native'
import {BackHandler} from 'components'
import {getUTCFullTime, translate} from 'utils'
import {Props} from './interface'

const ConcurrentHeader: FC<Props> = ({item}) => {
  const {colors} = useTheme()
  const route = useRoute()
  const navigation: any = useNavigation()
  const {params = {}}: any = route
  const onPress = () =>
    navigation.navigate('entry', {type: params?.type, item: item})

  return (
    <View style={[styles.headerContainer, {backgroundColor: colors.secondary}]}>
      <BackHandler />
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.headerModify, {color: colors.text}]}>
            {translate('modify')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerTexts}>
        <Text style={[styles.headerTitle, {color: colors.text}]}>
          {item?.name}
        </Text>
        <Text style={[styles.headerDescription, {color: colors.text}]}>
          {item?.description}
        </Text>
        <Text style={[styles.headerDate, {color: colors.text}]}>
          {translate('start_date')}: {getUTCFullTime(item?.payment_date, '-')}
        </Text>
      </View>
    </View>
  )
}

export default ConcurrentHeader
