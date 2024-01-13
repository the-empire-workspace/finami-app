import {BackHandler, ItemList} from 'components'
import {useTheme} from 'providers'
import React, {FC, useEffect, useMemo, useState} from 'react'
import {Text, View, TouchableOpacity, Modal, TextInput} from 'react-native'
import {getLanguage, translate} from 'utils'
import {styles} from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation, useRoute} from '@react-navigation/native'
import {
  createGoalEntry,
  getAccounts,
  getCategoryGoal,
  getGoal,
  removeGoalItem,
} from 'store/actions'
/* import FileArrowUp from '@assets/img/FileArrowUp.svg' */
import Trash from '@assets/img/Trash.svg'
import Pencil from '@assets/img/Pencil.svg'
import CaretDown from '@assets/img/CaretDoubleDown.svg'
import {Button} from 'theme'
import {Picker} from '@react-native-picker/picker'
import {DatePicker} from 'components/DynamicForm/components'
import X from '@assets/img/WhiteX.svg'
import CheckFat from '@assets/img/CheckFat.svg'

const DetailGoals: FC = () => {
  const {colors} = useTheme()

  const [shortInfo, setShortInfo] = useState(true)

  const [newModal, setNewModal] = useState(false)
  const dispatch = useDispatch()
  const router: any = useRoute()
  const navigation: any = useNavigation()
  const params = router.params
  const {totalBalance, user, accounts} = useSelector(
    (state: any) => state.account,
  )
  const {currencies} = useSelector((state: any) => state.currency)
  const {item} = useSelector((state: any) => state.goals)
  const language = getLanguage()

  useEffect(() => {
    if (params?.id) {
      if (params?.type === 'category') dispatch(getCategoryGoal(params?.id))
      if (params?.type === 'goals') dispatch(getGoal(params?.id))
    }
    if (!params?.id) navigation?.goBack()
    return () => {
      dispatch(removeGoalItem())
    }
  }, [params?.id])
  const [createValues, setCreateValues] = useState<any>({
    amount: null,
    date: new Date(),
    account: null,
  })
  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === user?.currency_id)
  }, [currencies?.length, user?.currency_id])

  const createEntry = () => {
    if (createValues?.account && createValues?.amount)
      dispatch(
        createGoalEntry({
          ...item,
          ...createValues,
          concept: item?.payment_concept,
          entry_id: item?.id,
          type: item?.payment_type,
        }),
      )
    setNewModal(false)
  }

  useEffect(() => {
    dispatch(getAccounts())
  }, [])
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler
        navigation={
          item?.category_id
            ? () => {
                navigation.navigate('detailGoals', {
                  id: item?.category_id,
                  type: 'category',
                  itemType: item?.type || item.payment_type,
                })
              }
            : null
        }
        title={
          params?.type === 'category'
            ? translate('category_detail')
            : translate(`${item?.payment_type}_detail`)
        }
      />
      <View style={[styles.mainInfo, {backgroundColor: colors.background50}]}>
        <View
          style={[
            styles.amountIndicator,
            {
              backgroundColor: colors.background100,
            },
          ]}>
          <Text style={[styles.strongBody, {color: colors.typography}]}>
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
            ]}>
            {currency?.symbol}{' '}
            {totalBalance?.toLocaleString('en-US', {
              maximumFractionDigits: item?.decimal,
            })}
          </Text>
        </View>
        {params?.type !== 'category' && (
          <View style={[styles.progressContainer]}>
            <View style={[styles.textContainer]}>
              <Text style={[styles.strongBody, {color: colors.typography}]}>
                {currency?.symbol || ''}{' '}
                {item?.total_amount?.toLocaleString('en-US', {
                  maximumFractionDigits: currency?.decimal,
                })}
              </Text>
              <Text style={[styles.strongBody, {color: colors.typography}]}>
                /
              </Text>
              <Text style={[styles.strongBody, {color: colors.typography}]}>
                {' '}
                {currency?.symbol || ''}{' '}
                {item?.amount?.toLocaleString('en-US', {
                  maximumFractionDigits: currency?.decimal,
                })}
              </Text>
            </View>
            <View
              style={[
                styles.progressContent,
                {
                  borderColor:
                    params?.itemType === 'compromise'
                      ? colors.progress.needs
                      : colors.progress.wish,
                },
              ]}>
              <View
                style={[
                  styles.progress,
                  {
                    backgroundColor:
                      params?.itemType === 'compromise'
                        ? colors.progress.needs
                        : colors.progress.wish,
                    width: `${(item?.total_amount / item?.amount) * 100}%`,
                  },
                  item?.total_amount >= item?.amount ? styles.fullOpacity : {},
                ]}
              />
              {item?.total_amount >= item?.amount && (
                <View style={styles.overText}>
                  <Text style={[styles.h3, {color: colors.typography2}]}>
                    * {translate('completed')} *
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        <View style={styles.accountData}>
          <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
            {translate('concept')}:
          </Text>
          <Text style={[styles.strongBody, {color: colors.typography}]}>
            {item?.payment_concept || item?.name}
          </Text>
        </View>
        {item?.comment && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('comments')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {item?.comment}
            </Text>
          </View>
        )}
        {item?.limit_date && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('limit_date')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {new Date(item?.limit_date)?.toLocaleDateString(
                language === 'es' ? 'es-VE' : 'en-US',
              )}
            </Text>
          </View>
        )}
        {item?.status_level && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('urgency_level')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {translate(item?.status_level)}
            </Text>
          </View>
        )}
        <View style={styles.actions}>
          <View style={[styles.actionContainer]}>
            <TouchableOpacity
              style={[styles.action]}
              onPress={() =>
                navigation.navigate('editGoals', {
                  id: item?.id,
                  type: params?.type,
                })
              }>
              <Pencil width={24} height={24} />
            </TouchableOpacity>
            {(item?.total_amount < item?.amount ||
              params?.type === 'category') &&
              !item?.entries?.length && (
                <TouchableOpacity
                  style={[styles.action]}
                  onPress={() =>
                    navigation.navigate('deleteGoals', {
                      id: item?.id,
                      type: params?.type || params?.itemType,
                      itemType: params?.itemType,
                    })
                  }>
                  <Trash width={24} height={24} />
                </TouchableOpacity>
              )}
          </View>
          <View>
            {(item?.total_amount < item?.amount ||
              params?.type === 'category') && (
              <Button
                text={
                  params?.type === 'category'
                    ? translate(
                        params?.itemType === 'compromise'
                          ? 'new_compromise'
                          : 'new_desire',
                      )
                    : translate('new_deposit')
                }
                style={[
                  {
                    backgroundColor:
                      params?.itemType === 'compromise'
                        ? colors.progress.needs
                        : colors.progress.wish,
                  },
                ]}
                styleText={{color: colors.typography2}}
                onPress={() => {
                  if (params?.type === 'category')
                    return navigation.navigate('newGoals', {
                      type: params?.type,
                      id: params?.id,
                      entry_type: item?.payment_type || item?.type,
                    })
                  setNewModal(!newModal)
                  setCreateValues((prev: any) => ({
                    ...prev,
                    account: accounts[0]?.id,
                  }))
                }}
                disabled={false}
              />
            )}
          </View>
        </View>
        <View style={[styles.actionContent]}>
          <TouchableOpacity style={[styles.action]} onPress={() => {}}>
            {/* <FileArrowUp width={24} height={24} /> */}
          </TouchableOpacity>
          <Text>{translate('made_deposits')}</Text>
          <TouchableOpacity
            onPress={() => setShortInfo(!shortInfo)}
            style={[styles.action, !shortInfo ? styles.actionUp : null]}>
            <CaretDown width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      <ItemList
        items={item?.entries}
        type={params?.type === 'category' ? 'goals' : 'dashboard'}
      />

      <Modal
        transparent={true}
        animationType="slide"
        visible={newModal}
        onRequestClose={() => {
          setNewModal(!newModal)
        }}>
        <View style={[styles.rootModal]}>
          <View style={[styles.modal, {backgroundColor: colors.background50}]}>
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
                  {
                    backgroundColor:
                      params?.itemType === 'compromise'
                        ? colors.progress.needs
                        : colors.progress.wish,
                  },
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

export default DetailGoals
