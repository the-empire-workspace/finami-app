import React, {FC} from 'react'
import {ScrollView, Text, View} from 'react-native'
import WarningCircle from '@assets/img/WarningCircle.svg'
import {useTheme} from 'providers'
import {translate} from 'utils'
import {Button} from 'theme'
import {styles} from './styles'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {deleteCategoryIncome, deleteIncome} from 'store/actions'

const DeleteIncome: FC = () => {
  const {colors} = useTheme()
  const router = useNavigation()
  const dispatch = useDispatch()

  const route = useRoute()
  const navigation: any = useNavigation()

  const params: any = route.params

  const deleteAccount = () => {
    if (params.type === 'category')
      dispatch(deleteCategoryIncome(params?.id || ''))
    else dispatch(deleteIncome(params?.id || ''))
    navigation.navigate('detailFixesIncome')
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <ScrollView
        style={[styles.modalContainer]}
        contentContainerStyle={[styles.modalLayout]}>
        <WarningCircle width={64} height={64} />
        <Text style={[styles.h1, {color: colors.typography}]}>
          {translate('confirm_delete_information')}
        </Text>
        <Text style={[styles.h3, {color: colors.typography}]}>
          {translate('once_eliminated')}
        </Text>
      </ScrollView>
      <View style={[styles.containerActions]}>
        <Button
          style={{...styles.buttonStyle, ...{backgroundColor: colors.negative}}}
          styleText={{color: colors.typography2}}
          text={translate('cancel')}
          onPress={() => router.goBack()}
          disabled={false}
        />
        <Button
          style={{...styles.buttonStyle, ...{backgroundColor: colors.positive}}}
          styleText={{color: colors.typography2}}
          text={translate('confirm')}
          onPress={() => deleteAccount()}
          disabled={false}
        />
      </View>
    </View>
  )
}

export default DeleteIncome
