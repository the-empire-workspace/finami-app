import React, { FC, useEffect, useMemo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'providers'
import { styles, Typos } from './styles'
import { select } from 'redux-saga/effects'
import Button from 'theme/components/Button'
import DropDownArrow from '@assets/img/CaretDoubleDown.svg'
import FileArrowUp from '@assets/img/FileArrowUp.svg' 
import { useNavigation } from '@react-navigation/native'
 const DropDown: FC = ({ items }: any) => {
  const { colors } = useTheme()
  const router:any = useNavigation()
  const [selected, setSelected] = useState(false)
  const handleSelected = () => {
    setSelected(!selected)
    console.log(selected)
  }
  const renderDropdown = () => {
    if (selected) {
      return (
        <View style={[styles.hidden, { backgroundColor: colors.background50 }]}>
          {/* items.map((item: any) => (
            <TouchableOpacity
              style={[styles.buttonItems, { backgroundColor: colors.background25 }]}
              onPress={() => {
                router.navigate('fixedIncoming')
              }}
            >
              <Text>x</Text>
            </TouchableOpacity>
          )) */}
          <TouchableOpacity
            style={[styles.buttonItems,{backgroundColor: colors.background25}]}
            onPress={() => router.navigate('fixedIncoming')}

          >
            <Text>Ingresos Fijos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonItems,{backgroundColor: colors.background25}]}
          >

            <Text>Ingresos Pendientes</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <View style={selected?[styles.root, { backgroundColor: colors.background50, height:200 }]:[styles.root, { backgroundColor: colors.background50, height:50 }]}>
      {renderDropdown()}
      <View style={[styles.show]}>
        <TouchableOpacity>
          <FileArrowUp />
        </TouchableOpacity>
        <Text style={styles.h3}>text</Text>
        <TouchableOpacity onPress={handleSelected}>
          <DropDownArrow />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default DropDown;