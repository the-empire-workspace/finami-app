import { BackHandler, ItemList } from 'components'
import { useTheme } from 'providers'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import { getLanguage, getLastDate, translate } from 'utils'
import { styles } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  getFixedIncome,
  getCategoryIncome,
  removeIncomeItem,
  getAccounts,
  createFixedIncomesEntry,
} from 'store/actions'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import Trash from '@assets/img/Trash.svg'
import Pencil from '@assets/img/Pencil.svg'
import CaretDown from '@assets/img/CaretDoubleDown.svg'
import { Button } from 'theme'
import X from '@assets/img/WhiteX.svg'
import CheckFat from '@assets/img/CheckFat.svg'
import { DatePicker } from 'components/DynamicForm/components'
import { Picker } from '@react-native-picker/picker'

const DetailFixesIncome: FC = () => {
  const { colors } = useTheme()

  const [shortInfo, setShortInfo] = useState(true)
  const dispatch = useDispatch()
  const router: any = useRoute()
  const navigation: any = useNavigation()
  const params = router.params
  const { totalBalance, user, accounts } = useSelector((state: any) => state.account)
  const { currencies } = useSelector((state: any) => state.currency)
  const { item } = useSelector((state: any) => state.incoming)
  const language = getLanguage()
  const [newModal, setNewModal] = useState(false)

  const [createValues, setCreateValues] = useState<any>({
    amount: null,
    date: new Date(),
    account: null,
  })

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  useEffect(() => {
    if (accounts && accounts[0])
      setCreateValues((prev: any) => ({
        ...prev,
        account: accounts[0]?.id,
      }))
  }, [accounts])
  useEffect(() => {
    if (params?.id) {
      if (params?.type === 'category') dispatch(getCategoryIncome(params?.id))
      if (params?.type === 'income') dispatch(getFixedIncome(params?.id))
    }
    if (!params?.id) navigation?.goBack()
    return () => {
      dispatch(removeIncomeItem())
    }
  }, [params?.id])

  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === user?.currency_id)
  }, [currencies?.length, user?.currency_id])

  const nextPayment = useMemo(() => {
    if (item?.entries) {
      const lastPayment = item?.entries[0]
      if (!lastPayment) return new Date(item?.date)
      return getLastDate(item, lastPayment)
    }
    return new Date()
  }, [item])
  const createEntry = () => {
    if (createValues?.account && createValues?.amount)
      dispatch(
        createFixedIncomesEntry({
          ...item,
          ...createValues,
          concept: item?.payment_concept,
          entry_id: item?.id,
        }),
      )
    setNewModal(false)
  }
  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler
        navigation={
          item?.category_id
            ? () => {
              navigation.navigate('detailFixesIncome', {
                id: item?.category_id,
                type: 'category',
              })
            }
            : null
        }
        title={
          params?.type === 'category'
            ? translate('category_detail')
            : translate('fixed_income_detail')
        }
      />
      <View style={[styles.mainInfo, { backgroundColor: colors.background50 }]}>
        <View
          style={[
            styles.amountIndicator,
            {
              backgroundColor: colors.background100,
            },
          ]}>
          <Text style={[styles.strongBody, { color: colors.typography }]}>
            {translate('available_balance')}:
          </Text>
          <Text
            style={[
              styles.h3,
              {
                color:
                  totalBalance < 0
                    ? colors.progress.egress
                    : colors.progress.ingress,
              },
              styles.textAmount
            ]}>
            {currency?.symbol}{' '}
            {totalBalance?.toLocaleString('en-US', {
              maximumFractionDigits: item?.decimal,
            })}
          </Text>
        </View>
        <View style={styles.accountData}>
          <Text style={[styles.smallStrongBody, { color: colors.typography }]}>
            {translate('concept')}:
          </Text>
          <Text style={[styles.strongBody, { color: colors.typography }]}>
            {item?.payment_concept || item?.name}
          </Text>
        </View>
        {item?.comment && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, { color: colors.typography }]}>
              {translate('comments')}:
            </Text>
            <Text style={[styles.smallBody, { color: colors.typography }]}>
              {item?.comment}
            </Text>
          </View>
        )}
        <View style={styles.accountData}>
          <Text style={[styles.smallStrongBody, { color: colors.typography }]}>
            {translate('amount')}:
          </Text>
          <Text style={[styles.smallBody, { color: colors.typography }]}>
            {item?.currency_symbol} {item?.amount || 0}
          </Text>
        </View>
        {item?.frecuency_type && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, { color: colors.typography }]}>
              {translate('next_payment')}:
            </Text>
            <Text style={[styles.smallBody, { color: colors.typography }]}>
              {nextPayment?.toLocaleDateString(
                language === 'es' ? 'es-VE' : 'en-US',
              )}
            </Text>
          </View>
        )}
        {item?.frecuency_type && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, { color: colors.typography }]}>
              {translate('frequency')}:
            </Text>
            <Text style={[styles.smallBody, { color: colors.typography }]}>
              {translate(item?.frecuency_type)}
            </Text>
          </View>
        )}
        {item?.frecuency_time && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, { color: colors.typography }]}>
              {translate('frequency_time')}:
            </Text>
            <Text style={[styles.smallBody, { color: colors.typography }]}>
              {item?.frecuency_time}
            </Text>
          </View>
        )}
        {(item?.emissor || item?.email || item?.phone) && !shortInfo && (
          <>
            <View
              style={[styles.line, { backgroundColor: colors.background25 }]}
            />
            {item?.emissor && (
              <View style={styles.accountData}>
                <Text
                  style={[styles.smallStrongBody, { color: colors.typography }]}>
                  {translate('issuer_name')}:
                </Text>
                <Text style={[styles.smallBody, { color: colors.typography }]}>
                  {item?.emissor}
                </Text>
              </View>
            )}
            {item?.email && (
              <View style={styles.accountData}>
                <Text
                  style={[styles.smallStrongBody, { color: colors.typography }]}>
                  {translate('email')}:
                </Text>
                <Text style={[styles.smallBody, { color: colors.typography }]}>
                  {item?.email}
                </Text>
              </View>
            )}
            {item?.phone && (
              <View style={styles.accountData}>
                <Text
                  style={[styles.smallStrongBody, { color: colors.typography }]}>
                  {translate('phonenumber')}:
                </Text>
                <Text style={[styles.smallBody, { color: colors.typography }]}>
                  {item?.phone}
                </Text>
              </View>
            )}
          </>
        )}

        <View style={styles.actions}>
          <View style={[styles.actionContainer]}>
            <TouchableOpacity
              style={[styles.action]}
              onPress={() =>
                navigation.navigate('editFixedIncome', {
                  id: item?.id,
                  type: params?.type,
                })
              }>
              <Pencil width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.action]}
              onPress={() =>
                navigation.navigate('deleteIncome', {
                  id: item?.id,
                  type: params?.type,
                })
              }>
              <Trash width={24} height={24} />
            </TouchableOpacity>
          </View>
          <View>
            {params?.type === 'category' || !item?.frecuency_type && (
              <Button
                text={translate('new_payment')}
                style={[{ backgroundColor: colors.positive }]}
                styleText={{ color: colors.typography2 }}
                onPress={() => {
                  if (params?.type === 'category') {
                    navigation.navigate('newFixedIncome', {
                      type: params?.type,
                      id: params?.id,
                    })
                    return
                  }
                  setNewModal(!newModal)
                }}
                disabled={false}
              />
            )}
          </View>
        </View>
        <View style={[styles.actionContent]}>
          <TouchableOpacity
            style={[styles.action]}
            onPress={() => {
              navigation.navigate('report', {
                type:
                  params?.type === 'category'
                    ? 'fixed_incomes_category'
                    : 'fixed_incomes',
                id: item?.id,
              })
            }}>
            <FileArrowUp width={24} height={24} />
          </TouchableOpacity>
          <Text style={[styles.smallBody, { color: colors.typography }]}>{translate('made_incomes')}</Text>
          <TouchableOpacity
            onPress={() => setShortInfo(!shortInfo)}
            style={[styles.action, !shortInfo ? styles.actionUp : null]}>
            <CaretDown width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      <ItemList
        items={item?.entries}
        type={params?.type === 'category' ? 'fixed_incomes' : 'dashboard'}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={newModal}
        onRequestClose={() => {
          setNewModal(!newModal)
        }}>
        <View style={[styles.rootModal]}>
          <View style={[styles.modal, { backgroundColor: colors.background50 }]}>
            <View style={styles.modalTitle}>
              <TouchableOpacity onPress={() => setNewModal(!newModal)}>
                <X width={32} height={32} />
              </TouchableOpacity>
              <TextInput
                keyboardType="number-pad"
                value={createValues?.amount || ''}
                onChange={(e: any) =>
                  setCreateValues((prev: any) => ({
                    ...prev,
                    amount: e?.nativeEvent?.text,
                  }))
                }
                style={[
                  styles.input,
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
              <TouchableOpacity
                style={[
                  styles.createButton,
                  { backgroundColor: colors.progress.ingress },
                ]}
                disabled={!createValues?.amount}
                onPress={() => {
                  createEntry()
                }}>
                <CheckFat width={32} height={32} />
              </TouchableOpacity>
            </View>
            <View style={[styles.modalBody]}>
              <View
                style={[
                  styles.inputContainer,
                  { borderColor: colors.typography },
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
                  {translate('payment_date')}
                </Text>
                <DatePicker
                  style={{
                    ...styles.modDate,
                    color: colors.typography,
                  }}
                  date={createValues?.date || new Date()}
                  mode={'date'}
                  onChange={(date: any) =>
                    setCreateValues((prev: any) => ({
                      ...prev,
                      date: date?.nativeEvent?.text,
                    }))
                  }
                />
              </View>
              <View
                style={[
                  styles.inputContainer,
                  { borderColor: colors.typography },
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
                  selectedValue={createValues?.account}
                  onValueChange={itemValue =>
                    setCreateValues((prev: any) => ({
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
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default DetailFixesIncome
