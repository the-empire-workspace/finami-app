import React, {FC, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useTheme} from 'providers'
import {styles} from './styles'
import DropDownArrow from '@assets/img/CaretDoubleDown.svg'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import {nextEntry, translate} from 'utils'
//import {useNavigation} from '@react-navigation/native'

const DropDownDetails: FC = ({DropDownInfo}: any) => {
  const {
    item: {
      payment_concept,
      comment,
      amount,
      date,
      frecuency_time,
      frecuency_type,
      emissor,
      email,
      phone,
    },
    title
  } = DropDownInfo
  console.log({DropDownInfo})
  const {colors} = useTheme()
  //const router: any = useNavigation()
  const [selected, setSelected] = useState<boolean>(true)
  console.log(nextEntry(date,Number(frecuency_time), frecuency_type))

  const formatInfo = [
    {
      label: translate('concept'),
      info: payment_concept,
    },
    {
      label: translate('comment'),
      info: comment,
    },
    {
      label: translate('amount'),
      info: amount,
    },
    {
      label: translate('payment_frequency'),
      info: `${translate('every')} ${frecuency_type} ${frecuency_time}`,
    },
    {
      label: translate('next_entry_date'),
      info: 'prox',
    },
  ]
  const renderDropdown = () => {
    if (selected)
      return (
        <View style={[styles.hidden, {backgroundColor: colors.background50}]}>
          {formatInfo.map((item, index) => (
            <View style={[styles.textContent]} key={index}>
              <Text
                style={[
                  styles.subtitle,
                  styles.textSeparator,
                  {color: colors.typography},
                ]}>
                {item.label}:
              </Text>
              <Text style={[styles.strongBody, {color: colors.typography}]}>
                {item.info}
              </Text>
            </View>
          ))}
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
          {title}
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
export default DropDownDetails
