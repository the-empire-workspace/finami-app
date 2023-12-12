import {BackHandler, ItemList} from 'components'
import {useTheme} from 'providers'
import React, {FC, useEffect, useMemo, useState} from 'react'
import {Text, View, TouchableOpacity, Modal} from 'react-native'
import {translate} from 'utils'
import {styles} from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation, useRoute} from '@react-navigation/native'
import {
  getBasicExpense,
  getCategoryOutcome,
  removeExpenseItem,
} from 'store/actions'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import Trash from '@assets/img/Trash.svg'
import Pencil from '@assets/img/Pencil.svg'
import CaretDown from '@assets/img/CaretDoubleDown.svg'
import {Button} from 'theme'

const DetailFixesOutcome: FC = () => {
  const {colors} = useTheme()

  const [shortInfo, setShortInfo] = useState(true)
  const [filterModal, setFilterModal] = useState(false)
  const dispatch = useDispatch()
  const router: any = useRoute()
  const navigation: any = useNavigation()
  const params = router.params
  const {totalBalance, user} = useSelector((state: any) => state.account)
  const {currencies} = useSelector((state: any) => state.currency)
  const {item} = useSelector((state: any) => state.outcoming)

  useEffect(() => {
    if (params?.id) {
      if (params?.type === 'category') dispatch(getCategoryOutcome(params?.id))
      if (params?.type === 'outcome') dispatch(getBasicExpense(params?.id))
    }
    if (!params?.id) navigation?.goBack()
    return () => {
      dispatch(removeExpenseItem())
    }
  }, [params?.id])

  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === user?.currency_id)
  }, [currencies?.length, user?.currency_id])

  const nextPayment = useMemo(() => {
    if (item?.entries) {
      const lastPayment = item?.entries[0]
      const date = new Date(lastPayment?.date)
      switch (item?.frecuency_type) {
        case 'days':
          const lastDay = Number(
            new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
          )
          const nextDay = Number(date.getDate()) + Number(item?.frecuency_time)
          if (nextDay > lastDay) {
            const returnDate = new Date(
              date.getFullYear(),
              date.getMonth(),
              nextDay - lastDay,
            )
            return returnDate
          }
          const returned = new Date(
            date.getFullYear(),
            date.getMonth(),
            nextDay,
          )
          return returned
        case 'weeks':
          return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + Number(item?.frecuency_time) * 7,
          )
        case 'months':
          return new Date(
            date.getFullYear(),
            date.getMonth() + Number(item?.frecuency_time),
          )
        default:
          return new Date(date.getFullYear(), date.getMonth(), date.getDate())
      }
    }
    return new Date()
  }, [item])

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler
        navigation={
          item?.category_id
            ? () => {
                navigation.navigate('detailFixesOutcome', {
                  id: item?.category_id,
                  type: 'category',
                })
              }
            : null
        }
        title={
          params?.type === 'category'
            ? translate('category_detail')
            : translate('basic_expense_detail')
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
        <View style={styles.accountData}>
          <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
            {translate('amount')}:
          </Text>
          <Text style={[styles.smallBody, {color: colors.typography}]}>
            {currency?.symbol} {item?.amount || 0}
          </Text>
        </View>
        {item?.frecuency_type && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('next_payment')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {nextPayment?.toLocaleDateString()}
            </Text>
          </View>
        )}
        {item?.frecuency_type && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('frequency')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {translate(item?.frecuency_type)}
            </Text>
          </View>
        )}
        {item?.frecuency_time && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('frequency_time')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {item?.frecuency_time}
            </Text>
          </View>
        )}
        {(item?.emissor || item?.email || item?.phone) && !shortInfo && (
          <>
            <View
              style={[styles.line, {backgroundColor: colors.background25}]}
            />
            {item?.emissor && (
              <View style={styles.accountData}>
                <Text
                  style={[styles.smallStrongBody, {color: colors.typography}]}>
                  {translate('receiver')}:
                </Text>
                <Text style={[styles.smallBody, {color: colors.typography}]}>
                  {item?.emissor}
                </Text>
              </View>
            )}
            {item?.email && (
              <View style={styles.accountData}>
                <Text
                  style={[styles.smallStrongBody, {color: colors.typography}]}>
                  {translate('email')}:
                </Text>
                <Text style={[styles.smallBody, {color: colors.typography}]}>
                  {item?.email}
                </Text>
              </View>
            )}
            {item?.phone && (
              <View style={styles.accountData}>
                <Text
                  style={[styles.smallStrongBody, {color: colors.typography}]}>
                  {translate('phonenumber')}:
                </Text>
                <Text style={[styles.smallBody, {color: colors.typography}]}>
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
                navigation.navigate('editFixedOutcome', {
                  id: item?.id,
                  type: params?.type,
                })
              }>
              <Pencil width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.action]}
              onPress={() =>
                navigation.navigate('deleteOutcome', {
                  id: item?.id,
                  type: params?.type,
                })
              }>
              <Trash width={24} height={24} />
            </TouchableOpacity>
          </View>
          <View>
            {params?.type === 'category' && (
              <Button
                text={translate('new_payment')}
                style={[{backgroundColor: colors.negative}]}
                styleText={{color: colors.typography2}}
                onPress={() => {
                  navigation.navigate('newFixedOutcome', {
                    type: params?.type,
                    id: params?.id,
                  })
                }}
                disabled={false}
              />
            )}
          </View>
        </View>
        <View style={[styles.actionContent]}>
          <TouchableOpacity
            style={[styles.action]}
            onPress={() => setFilterModal(!filterModal)}>
            <FileArrowUp width={24} height={24} />
          </TouchableOpacity>
          <Text>{translate('made_outcomes')}</Text>
          <TouchableOpacity
            onPress={() => setShortInfo(!shortInfo)}
            style={[styles.action, !shortInfo ? styles.actionUp : null]}>
            <CaretDown width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      <ItemList
        items={item?.entries}
        type={params?.type === 'category' ? 'basic_expenses' : 'dashboard'}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={filterModal}
        onRequestClose={() => {
          setFilterModal(!filterModal)
        }}>
        <View style={[styles.rootModal]}>
          <View style={[styles.modal]}>
            <View style={styles.modalTitle}>
              <Text
                style={[
                  styles.smallBody,
                  styles.titleCenter,
                  {color: colors.typography},
                ]}>
                {translate('filter_movements_list')}
              </Text>
            </View>
            <View style={[styles.modalBody]}>
              <TouchableOpacity
                style={[
                  styles.filterSelection,
                  {backgroundColor: colors.background25},
                ]}
                onPress={() => {
                  setFilterModal(!filterModal)
                }}>
                <Text
                  style={[
                    styles.strongBody,
                    styles.titleCenter,
                    {color: colors.typography},
                  ]}>
                  {translate('show_all_movements')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterSelection,
                  {backgroundColor: colors.background25},
                ]}
                onPress={() => {
                  setFilterModal(!filterModal)
                }}>
                <Text
                  style={[
                    styles.strongBody,
                    styles.titleCenter,
                    {color: colors.typography},
                  ]}>
                  {translate('show_incomes')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterSelection,
                  {backgroundColor: colors.background25},
                ]}>
                <Text
                  style={[
                    styles.strongBody,
                    styles.titleCenter,
                    {color: colors.typography},
                  ]}
                  onPress={() => {
                    setFilterModal(!filterModal)
                  }}>
                  {translate('show_outcomes')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default DetailFixesOutcome
