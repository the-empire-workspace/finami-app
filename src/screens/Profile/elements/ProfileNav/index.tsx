import React, {FC, useMemo} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import CaretRight from '../../../../../assets/img/CaretRight.svg'
import {translate} from 'utils'
import {useNavigation} from '@react-navigation/native'
import EmpireLogo from '../../../../../assets/img/empire-logo.png'

const ProfileNav: FC<any> = () => {
  const {colors} = useTheme()

  const navigation: any = useNavigation()

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
        redirect: 'dynamic-calculator',
      },
      {
        name: translate('financial-calculator'),
        redirect: 'financial-calculator',
      },
      {
        name: translate('report'),
        comming: true,
      },
      {
        name: translate('language'),
        redirect: 'language',
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
          style={[styles.selectionList]}
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
        style={[styles.selectionList]}
        onPress={() => {
          navigation.navigate('/terms-conditions')
        }}>
        <Text style={[styles.body, {color: colors.typography}]}>
          {translate('terms-conditions')}
        </Text>
        <CaretRight width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.selectionList, styles.downSelection]}
        onPress={() => {
          navigation.navigate('deleteProfile')
        }}>
        <Text style={[styles.body, {color: colors.typography}]}>
          {translate('delete-account')}
        </Text>
        <CaretRight width={24} height={24} />
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
