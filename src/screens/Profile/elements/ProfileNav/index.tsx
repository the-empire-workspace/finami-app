import React, {FC, useMemo} from 'react'
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import CaretRight from '../../../../../assets/img/CaretRight.svg'
import {getLanguage, translate} from 'utils'
import {useNavigation} from '@react-navigation/native'
import EmpireLogo from '../../../../../assets/img/empire-logo.png'
import {useSelector} from 'react-redux'

const ProfileNav: FC<any> = () => {
  const {colors} = useTheme()

  const navigation: any = useNavigation()

  const {user} = useSelector((SelectorState: any) => SelectorState.account)
  const language = getLanguage()

  const nav = useMemo(() => {
    return [
      {
        name: translate('accounts'),
        redirect: 'accounts',
      },
      {
        name: translate('currencies'),
        redirect: 'currencies',
      },
      {
        name: translate('dynamic-calculator'),
        redirect: 'dynamicCalculator',
      },
      {
        name: translate('financial-calculator'),
        redirect: 'financialCalculator',
      },
      {
        name: translate('language'),
        redirect: 'language',
      },
      {
        name: translate('leave_your_comments'),
        redirect: 'comments',
      },
      {
        name: translate('report'),
        comming: true,
      },
    ]
  }, [])

  return (
    <View
      style={[
        styles.profileContainer,
        {backgroundColor: colors.background100},
      ]}>
      {nav?.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.selectionList, item?.comming ? styles.comming : null]}
          onPress={() => {
            !item?.comming && navigation.navigate(item?.redirect)
          }}>
          <Text style={[styles.body, {color: colors.typography}]}>
            {item?.name} {item?.comming && translate('comming')}
          </Text>
          <CaretRight width={24} height={24} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.selectionList, styles.centerText]}
        onPress={async () => {
          await Linking.openURL(
            `https://finami.app/${user?.language || language}/terms-conditions`,
          )
        }}>
        <Text style={[styles.body, {color: colors.typography}]}>
          {translate('terms-conditions')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.selectionList, styles.downSelection, styles.centerText]}
        onPress={() => {
          navigation.navigate('deleteProfile')
        }}>
        <Text style={[styles.body, {color: colors.typography}]}>
          {translate('delete-account')}
        </Text>
      </TouchableOpacity>
      <View style={styles.poweredByContainer}>
        <Text style={[styles.extraSmallBody, {color: colors.typography}]}>
          Powered by
        </Text>
        <Image source={EmpireLogo} style={styles.image} />
      </View>
    </View>
  )
}

export default ProfileNav
