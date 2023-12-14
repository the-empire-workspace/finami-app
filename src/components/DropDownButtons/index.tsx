/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'providers'
import { styles } from './styles'
import DropDownArrow from '@assets/img/CaretDoubleDown.svg'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import { useNavigation } from '@react-navigation/native'
import { DropDownInfoProps } from './interface'

const DropDownButtons: FC<DropDownInfoProps> = ({ DropDownInfo }: any) => {
  const { colors } = useTheme()
  const router: any = useNavigation()
  const [selected, setSelected] = useState(!!DropDownInfo[0].label || !!DropDownInfo[1].label)
  const renderDropdown = () => {
    if (selected)
      return (
        <View style={[styles.hidden]}>
          {!!DropDownInfo[0].label && (
            <TouchableOpacity
              style={[
                styles.buttonItems,
                { backgroundColor: colors.background25 },
              ]}
              onPress={() => router.navigate(DropDownInfo[0].router)}>
              <Text
                style={[
                  styles.subtitle,
                  { color: colors.typography, textAlign: 'center' },
                ]}>
                {DropDownInfo[0].label}
              </Text>
            </TouchableOpacity>
          )}
          {!!DropDownInfo[1].label && (
            <TouchableOpacity
              style={[
                styles.buttonItems,
                { backgroundColor: colors.background25 },
              ]}
              onPress={() => router.navigate(DropDownInfo[1].router)}>
              <Text
                style={[
                  styles.subtitle,
                  { color: colors.typography, textAlign: 'center' },
                ]}>
                {DropDownInfo[1].label}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )
  }
  return (
    <View
      style={[
        styles.root,
        { backgroundColor: colors.background50 },
      ]}>
      {((!!DropDownInfo[0].label || !!DropDownInfo[1].label) && selected) && renderDropdown()}
      <View style={[styles.show]}>
        <TouchableOpacity style={styles.buttonAlone}>
          {/*  <FileArrowUp width={24} height={24} /> */}
        </TouchableOpacity>
        <Text style={[styles.strongBody, { color: colors.typography }]}>
          {DropDownInfo[2].title}
        </Text>
        {!!DropDownInfo[0].label || !!DropDownInfo[1].label ? (
          <TouchableOpacity onPress={() => setSelected(!selected)}>
            <DropDownArrow
              width={24}
              height={24}
              style={selected && { transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  )
}
export default DropDownButtons
