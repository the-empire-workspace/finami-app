/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useTheme} from 'providers'
import {styles} from './styles'
import DropDownArrow from '@assets/img/CaretDoubleDown.svg'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import Trash from '@assets/img/Trash.svg'
import Pencil from '@assets/img/Pencil.svg'
import UserList from '@assets/img/UserList.svg'
import {nextEntry, translate} from 'utils'
import {Divider} from 'components'
import {Button} from 'theme'
//import {useNavigation} from '@react-navigation/native'

const DropDownDetails: FC<any> = ({DropDownInfo}: any) => {
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
    title,
  } = DropDownInfo
  const {colors} = useTheme()
  //const router: any = useNavigation()
  const [selected, setSelected] = useState<boolean>(true)

  const formatInfo = [
    {
      label: translate('concept'),
      info: payment_concept,
    },
    {
      label: translate('comment'),
      info: comment || translate('unavailable'),
    },
    {
      label: translate('amount'),
      info: amount,
    },
    {
      label: translate('payment_frequency'),
      info: `${translate('every')} ${frecuency_time} ${translate(
        frecuency_type,
      )}`,
    },
    {
      label: translate('next_entry_date'),
      info: `${
        frecuency_type
          ? nextEntry(
              date,
              Number(frecuency_time),
              frecuency_type,
            ).toLocaleDateString()
          : null
      }`,
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
          {email ||
            phone ||
            (emissor && (
              <View>
                <Divider />
                <View style={[styles.textContent]}>
                  <Text
                    style={[
                      styles.subtitle,
                      styles.textSeparator,
                      {color: colors.typography},
                    ]}>
                    {translate('emissor')}:
                  </Text>
                  <Text style={[styles.strongBody, {color: colors.typography}]}>
                    {emissor || translate('unavailable')}
                  </Text>
                </View>
                <View style={[styles.textContent]}>
                  <Text
                    style={[
                      styles.subtitle,
                      styles.textSeparator,
                      {color: colors.typography},
                    ]}>
                    {translate('phone')}:
                  </Text>
                  <Text style={[styles.strongBody, {color: colors.typography}]}>
                    {phone || translate('unavailable')}
                  </Text>
                </View>
                <View style={[styles.textContent]}>
                  <Text
                    style={[
                      styles.subtitle,
                      styles.textSeparator,
                      {color: colors.typography},
                    ]}>
                    {translate('email')}:
                  </Text>
                  <Text style={[styles.strongBody, {color: colors.typography}]}>
                    {email || translate('unavailable')}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      )
    return (
      <View style={[styles.hidden, {backgroundColor: colors.background50}]}>
        <View style={[styles.textContent]}>
          <Text
            style={[
              styles.subtitle,
              styles.textSeparator,
              {color: colors.typography},
            ]}>
            {translate('concept')}:
          </Text>
          <Text style={[styles.strongBody, {color: colors.typography}]}>
            {payment_concept}
          </Text>
        </View>
        <View style={[styles.textContent]}>
          <Text
            style={[
              styles.subtitle,
              styles.textSeparator,
              {color: colors.typography},
            ]}>
            {translate('amount')}:
          </Text>
          <Text style={[styles.strongBody, {color: colors.typography}]}>
            {amount}
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.background50,
          height: selected ? (email || phone || emissor ? 325 : 250) : 175,
        },
      ]}>
      {renderDropdown()}
      <View
        style={[
          styles.actionContainer,
          {
            marginTop: selected ? (email || phone || emissor ? 175 : 100) : 0,
          },
        ]}>
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity>
            <UserList width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Pencil width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Trash width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            text={translate('new_payment')}
            disabled={false}
            style={{backgroundColor: colors.progress.ingress}}
            styleText={{color: colors.typography2}}
          />
        </View>
      </View>
      <View style={[styles.showBar]}>
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
