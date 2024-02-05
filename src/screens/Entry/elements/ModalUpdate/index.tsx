import {useTheme} from 'providers'
import React, {FC, useEffect, useState} from 'react'
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {translate} from 'utils'
import WhiteX from '@assets/img/WhiteX.svg'
import FastForward from '@assets/img/FastForward.svg'
import Check from '@assets/img/CheckFat.svg'
import {Button} from 'theme'
import {DatePicker} from 'components/DynamicForm/components'
import {useDispatch, useSelector} from 'react-redux'
import {
  getAccounts,
  updatePostponeEntry,
  updateStatusEntry,
} from 'store/actions'
import {Picker} from '@react-native-picker/picker'

const ModalUpdate: FC<any> = ({item, itemValues, closeModal, updateType}) => {
  const dispatch = useDispatch()
  const {colors} = useTheme()

  const [updateValues, setUpdateValues]: any = useState({
    date: new Date(item?.date),
    account: item?.account_id,
    amount: String(item?.amount),
  })

  const {accounts} = useSelector((state: any) => state.account)

  const handleUpdate = () => {
    if (updateType === 'postpone')
      dispatch(updatePostponeEntry({...updateValues, id: item?.id}))
    else dispatch(updateStatusEntry({...updateValues, id: item?.id}))
    closeModal()
  }

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  useEffect(() => {
    if (accounts && accounts[0])
      setUpdateValues((prev: any) => ({
        ...prev,
        account: item?.account_id || accounts[0]?.id,
      }))
  }, [accounts])

  return (
    <View style={[styles.root]}>
      <View style={[styles.modal, {backgroundColor: colors.background100}]}>
        <View
          style={[
            styles.modalHeader,
            {
              borderColor:
                item?.status === 'pending' ? itemValues?.color : 'transparent',
            },
          ]}>
          <View>
            <Text
              style={[
                styles.h3,
                {
                  color:
                    item?.status === 'pending'
                      ? colors.typography
                      : colors.typography2,
                },
              ]}>
              {itemValues?.title}
            </Text>
            {item?.status === 'pending' && (
              <Text
                style={[
                  styles.strongBody,
                  {
                    color:
                      updateType === 'postpone'
                        ? colors.states.caution
                        : colors.positive,
                  },
                ]}>
                {translate(updateType)}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              closeModal()
            }}>
            <WhiteX width={32} height={32} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.main}>
          {updateType === 'postpone' ? (
            <>
              <View style={[styles.mainInputContainer]}>
                <View
                  style={[
                    styles.inputContainer,
                    {borderColor: colors.typography},
                  ]}>
                  <Text
                    style={[
                      styles.floatLabel,
                      styles.smallStrongBody,
                      {
                        color: colors.typography,
                        backgroundColor: colors.background100,
                      },
                    ]}>
                    {translate('payment_date')}
                  </Text>
                  <DatePicker
                    style={{
                      ...styles.modDate,
                      ...styles.body,
                      color: colors.typography,
                    }}
                    date={updateValues?.date || new Date()}
                    mode={'date'}
                    onChange={(date: any) =>
                      setUpdateValues((prev: any) => ({
                        ...prev,
                        date: date?.nativeEvent?.text,
                      }))
                    }
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.modButton,
                    {backgroundColor: colors.states.caution},
                  ]}
                  onPress={handleUpdate}>
                  <FastForward width={32} height={32} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.mainInputContainer]}>
                <View
                  style={[
                    styles.inputContainer,
                    {borderColor: colors.typography},
                  ]}>
                  <Text
                    style={[
                      styles.floatLabel,
                      styles.smallStrongBody,
                      {
                        color: colors.typography,
                        backgroundColor: colors.background100,
                      },
                    ]}>
                    {translate('amount')}
                  </Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={updateValues?.amount || ''}
                    onChange={(e: any) =>
                      setUpdateValues((prev: any) => ({
                        ...prev,
                        amount: e?.nativeEvent?.text,
                      }))
                    }
                    style={[
                      styles.modInput,
                      styles.subtitle,
                      {
                        backgroundColor: colors.background100,
                        color: colors.typography,
                        borderColor: colors.typography,
                      },
                    ]}
                    placeholder={translate('amount')}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.modButton,
                    {backgroundColor: colors.positive},
                  ]}
                  onPress={handleUpdate}>
                  <Check width={32} height={32} />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: colors.typography},
                ]}>
                <Text
                  style={[
                    styles.floatLabel,
                    styles.smallStrongBody,
                    {
                      color: colors.typography,
                      backgroundColor: colors.background100,
                    },
                  ]}>
                  {translate('payment_date')}
                </Text>
                <DatePicker
                  style={{
                    ...styles.modDate,
                    ...styles.body,
                    color: colors.typography,
                  }}
                  date={updateValues?.date || new Date()}
                  mode={'date'}
                  onChange={(date: any) =>
                    setUpdateValues((prev: any) => ({
                      ...prev,
                      date: date?.nativeEvent?.text,
                    }))
                  }
                />
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {borderColor: colors.typography},
                ]}>
                <Text
                  style={[
                    styles.floatLabel,
                    styles.smallStrongBody,
                    {
                      color: colors.typography,
                      backgroundColor: colors.background50,
                    },
                  ]}>
                  {translate('account')}
                </Text>
                <Picker
                  selectedValue={updateValues?.account}
                  onValueChange={itemValue =>
                    setUpdateValues((prev: any) => ({
                      ...prev,
                      account: itemValue,
                    }))
                  }>
                  {accounts?.map((account: any) => (
                    <Picker.Item
                      key={account.id}
                      label={account.account_name}
                      value={account.id}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}
        </ScrollView>
        <View style={[styles.modalFooter]}>
          <View style={[styles.buttonContainer]}>
            <Button
              style={styles.buttonMod}
              styleText={{
                color:
                  updateType === 'update'
                    ? colors.states.caution
                    : colors.positive,
                textDecorationLine: 'underline',
                textDecorationColor:
                  updateType === 'update'
                    ? colors.states.caution
                    : colors.positive,
              }}
              text={
                updateType === 'update'
                  ? translate('postpone')
                  : translate('update')
              }
              disabled={false}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ModalUpdate
