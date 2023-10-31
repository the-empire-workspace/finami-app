import React, {FC, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useTheme} from 'providers'
import {styles} from './styles'
import DropDownArrow from '@assets/img/CaretDoubleDown.svg'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import {useNavigation} from '@react-navigation/native'
const DropDown: FC = ({}: any) => {
  const {colors} = useTheme()
  const router: any = useNavigation()
  const [selected, setSelected] = useState(false)
  const handleSelected = () => {
    setSelected(!selected)
  }
  const renderDropdown = () => {
    if (selected)
      return (
        <View style={[styles.hidden, {backgroundColor: colors.background50}]}>
          {/* items.map((item: any) => (
            <TouchableOpacity
              style={[styles.buttonItems, { backgroundColor: colors.background25 }]}
              onPress={() => {
                router.navigate('fixedIncoming')
              }}
            >
            pendingIncoming
              <Text>x</Text>
            </TouchableOpacity>
          )) */}
          <TouchableOpacity
            style={[styles.buttonItems, {backgroundColor: colors.background25}]}
            onPress={() => router.navigate('fixedIncoming')}>
            <Text>Ingresos Fijos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonItems, {backgroundColor: colors.background25}]}
            onPress={() => router.navigate('pendingIncoming')}>
            <Text>Ingresos Pendientes</Text>
          </TouchableOpacity>
        </View>
      )
  }
  return (
    <View
      style={
        selected
          ? [styles.root, {backgroundColor: colors.background50, height: 200}]
          : [styles.root, {backgroundColor: colors.background50, height: 44}]
      }>
      {renderDropdown()}
      <View style={[styles.show]}>
        <TouchableOpacity>
          <FileArrowUp width={24} height={24} />
        </TouchableOpacity>
        <Text style={[styles.strongBody, {color: colors.typography}]}>
          Texto Importante
        </Text>
        <TouchableOpacity onPress={handleSelected}>
          <DropDownArrow width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default DropDown
