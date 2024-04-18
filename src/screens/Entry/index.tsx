import React, {FC, useEffect, useMemo, useState} from 'react'
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {getLanguage, translate} from 'utils'
import SvgX from '@assets/img/X.svg'
import WhiteX from '@assets/img/WhiteX.svg'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {getItem, removeItem} from 'store/actions'
import Trash from '@assets/img/Trash.svg'
import Pencil from '@assets/img/Pencil.svg'
import {Button} from 'theme'
import {ModalUpdate} from './elements'
const Entry: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()
  const {item} = useSelector((state: any) => state.account)

  const router: any = useNavigation()
  const route = useRoute()
  const {params}: any = route
  const language = getLanguage()
  const [updateModal, setUpdateModal] = useState<any>(false)
  const [updateType, setUpdateType] = useState<any>('')

  useEffect(() => {
    dispatch(getItem(params?.id))
    return () => {
      dispatch(removeItem())
    }
  }, [])

  const itemValues = useMemo(() => {
    const titleSelection: any = {
      income: translate('income_detail'),
      expense: translate('expense_detail'),
      compromise: translate('compromise_detail'),
      desire: translate('desire_detail'),
    }
    const colorSelection: any = {
      income: colors.progress.ingress,
      expense: colors.progress.egress,
      compromise: colors.progress.needs,
      desire: colors.progress.wish,
    }
    return {
      title:
        titleSelection[item?.type || item?.entry_type] ||
        titleSelection[item?.entry_type] ||
        translate('detail'),
      color:
        colorSelection[item?.type || item?.entry_type] ||
        colorSelection[item?.entry_type] ||
        colors.progress.ingress,
    }
  }, [item])

  const transparent = 'transparent'
  const underline = 'underline'

  return (
    <View style={[styles.root]}>
      <View style={[styles.modal, {backgroundColor: colors.background100}]}>
        <View
          style={[
            styles.modalHeader,
            {
              backgroundColor:
                item?.status === 'pending' ? transparent : itemValues?.color,
              borderColor:
                item?.status === 'pending' ? itemValues?.color : transparent,
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
              <Text style={[styles.strongBody, {color: colors.states.caution}]}>
                {translate('pending')}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              router.goBack()
            }}>
            {item?.status === 'pending' ? (
              <WhiteX width={32} height={32} />
            ) : (
              <SvgX width={32} height={32} />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.main}>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('concept')}:
            </Text>
            <Text
              style={[
                styles.smallBody,
                {color: colors.typography},
                styles.textWidth,
              ]}>
              {item?.payment_concept || translate('unavailable')}
            </Text>
          </View>
          {!!item?.comment && (
            <View style={[styles.textContent]}>
              <Text
                style={[
                  styles.smallStrongBody,
                  styles.textSeparator,
                  {color: colors.typography},
                ]}>
                {translate('comments')}:
              </Text>
              <Text
                style={[
                  styles.smallBody,
                  {color: colors.typography},
                  styles.textWidth,
                ]}>
                {item?.comment || translate('unavailable')}
              </Text>
            </View>
          )}
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('amount')}:
            </Text>
            <Text
              style={[
                styles.smallBody,
                {color: colors.typography},
                styles.textWidth,
              ]}>
              {item?.currency_symbol}{' '}
              {item?.amount?.toLocaleString('en-US', {
                maximumFractionDigits: item?.decimal,
              }) || translate('unavailable')}
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text
              style={[
                styles.smallStrongBody,
                styles.textSeparator,
                {color: colors.typography},
              ]}>
              {translate('date')}:
            </Text>
            <Text
              style={[
                styles.smallBody,
                {
                  color:
                    new Date(item?.date).getTime() < new Date().getTime()
                      ? colors.states.alert
                      : colors.typography,
                },
              ]}>
              {new Date(item?.date).toLocaleDateString(
                language === 'es' ? 'es-VE' : 'en-US',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                },
              )}
            </Text>
          </View>
          {!!item?.account_name && (
            <View
              style={[styles.boxContainer, {borderColor: colors.background25}]}>
              <View
                style={[styles.boxHeader, {borderColor: colors.background25}]}>
                <Text
                  style={[
                    styles.smallStrongBody,
                    styles.textSeparator,
                    {color: colors.typography},
                  ]}>
                  {translate('account')}
                </Text>
              </View>
              <View
                style={[styles.boxContent, {borderColor: colors.background25}]}>
                <Text
                  style={[
                    styles.smallBody,
                    {color: colors.typography},
                    styles.textWidth,
                  ]}>{`${item?.account_name}${
                  item?.account_number
                    ? ` - *${item?.account_number?.slice(-4)}`
                    : ''
                }`}</Text>
              </View>
            </View>
          )}
          {(!!item?.emissor || !!item?.phone || !!item?.email) && (
            <View
              style={[styles.boxContainer, {borderColor: colors.background25}]}>
              <View
                style={[styles.boxHeader, {borderColor: colors.background25}]}>
                <Text
                  style={[
                    styles.smallStrongBody,
                    styles.textSeparator,
                    {color: colors.typography},
                  ]}>
                  {translate('contact')}
                </Text>
              </View>
              <View
                style={[styles.boxContent, {borderColor: colors.background25}]}>
                {!!item?.emissor && (
                  <View style={[styles.textContent]}>
                    <Text
                      style={[
                        styles.smallStrongBody,
                        styles.textSeparator,
                        {color: colors.typography},
                      ]}>
                      {item?.type === 'expense'
                        ? translate('receiver')
                        : translate('emissor')}
                      :
                    </Text>
                    <Text
                      style={[
                        styles.smallBody,
                        {color: colors.typography},
                        styles.textWidth,
                      ]}>
                      {item?.emissor || translate('unavailable')}
                    </Text>
                  </View>
                )}
                {!!item?.phone && (
                  <View style={[styles.textContent]}>
                    <Text
                      style={[
                        styles.smallStrongBody,
                        styles.textSeparator,
                        {color: colors.typography},
                      ]}>
                      {translate('phone')}:
                    </Text>
                    <Text
                      style={[
                        styles.smallBody,
                        {color: colors.typography},
                        styles.textWidth,
                      ]}>
                      {item?.phone || translate('unavailable')}
                    </Text>
                  </View>
                )}
                {!!item?.email && (
                  <View style={[styles.textContent]}>
                    <Text
                      style={[
                        styles.smallStrongBody,
                        styles.textSeparator,
                        {color: colors.typography},
                      ]}>
                      {translate('email')}:
                    </Text>
                    <Text
                      style={[
                        styles.smallBody,
                        {color: colors.typography},
                        styles.textWidth,
                      ]}>
                      {item?.email || translate('unavailable')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
        <View style={[styles.modalFooter]}>
          {item?.status === 'pending' && (
            <View style={[styles.buttonContainer]}>
              <Button
                onPress={() => {
                  setUpdateModal(true)
                  setUpdateType('postpone')
                }}
                style={styles.buttonMod}
                styleText={{
                  color: colors.states.caution,
                  textDecorationLine: underline,
                  textDecorationColor: colors.states.caution,
                }}
                text={translate('postpone')}
                disabled={false}
              />
            </View>
          )}
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity
              onPress={() => {
                router.goBack()
                router.navigate('editEntry', {id: item?.id})
              }}>
              <Pencil width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.goBack()
                router.navigate('deleteEntry', {id: item?.id})
              }}>
              <Trash width={24} height={24} />
            </TouchableOpacity>
          </View>
          {item?.status === 'pending' && (
            <View style={[styles.buttonContainer]}>
              <Button
                onPress={() => {
                  setUpdateModal(true)
                  setUpdateType('update')
                }}
                style={styles.buttonMod}
                styleText={{
                  color: itemValues.color,
                  textDecorationLine: underline,
                  textDecorationColor: itemValues.color,
                }}
                text={translate('update')}
                disabled={false}
              />
            </View>
          )}
          <Modal transparent visible={updateModal} style={styles.modalMain}>
            <ModalUpdate
              item={item}
              itemValues={itemValues}
              updateType={updateType}
              closeModal={() => {
                setUpdateModal(false)
              }}
            />
          </Modal>
        </View>
      </View>
    </View>
  )
}

export default Entry
