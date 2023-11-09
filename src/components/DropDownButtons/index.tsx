import React, {FC, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useTheme} from 'providers'
import {styles} from './styles'
import DropDownArrow from '@assets/img/CaretDoubleDown.svg'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import {useNavigation} from '@react-navigation/native'

const DropDownButtons: FC = ({DropDownInfo}: any) => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const [selected, setSelected] = useState(false)
  const renderDropdown = () => {
    if (selected)
      return (
        <View style={[styles.hidden, {backgroundColor: colors.background50}]}>
          <TouchableOpacity
            style={[styles.buttonItems, {backgroundColor: colors.background25}]}
            onPress={() => router.navigate('fixedIncoming')}>
            <Text
              style={[
                styles.subtitle,
                {color: colors.typography, textAlign: 'center'},
              ]}>
              {DropDownInfo[0].label}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonItems, {backgroundColor: colors.background25}]}
            onPress={() => router.navigate('pendingIncoming')}>
            <Text
              style={[
                styles.subtitle,
                {color: colors.typography, textAlign: 'center'},
              ]}>
              {DropDownInfo[1].label}
            </Text>
          </TouchableOpacity>
        </View>
      )
  }
  return (
    <View
      style={[
        styles.root,
        {backgroundColor: colors.background50, height: selected ? 190 : 44},
      ]}>
      {renderDropdown()}
      <View style={[styles.show]}>
        <TouchableOpacity>
          <FileArrowUp width={24} height={24} />
        </TouchableOpacity>
        <Text style={[styles.strongBody, {color: colors.typography}]}>
          {DropDownInfo[2].title}
        </Text>
        <TouchableOpacity onPress={() => setSelected(!selected)}>
          <DropDownArrow
            width={24}
            height={24}
            style={selected && {transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default DropDownButtons
