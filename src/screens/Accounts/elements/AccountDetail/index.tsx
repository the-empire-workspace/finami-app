import {BackHandler, ItemList} from 'components'
import {useTheme} from 'providers'
import React, {FC, useEffect, useMemo, useState} from 'react'
import {Text, View, TouchableOpacity, Modal} from 'react-native'
import {translate} from 'utils'
import {styles} from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation, useRoute} from '@react-navigation/native'
import {getAccount} from 'store/actions'
import FileArrowUp from '@assets/img/FileArrowUp.svg'
import Trash from '@assets/img/Trash.svg'
import Pencil from '@assets/img/Pencil.svg'
import CaretDown from '@assets/img/CaretDoubleDown.svg'
import Funnel from '@assets/img/Funnel.svg'

const AccountDetail: FC = () => {
  const {colors} = useTheme()

  const {account = {}} = useSelector((state: any) => state.account)
  const [shortInfo, setShortInfo] = useState(true)
  const [filter, setFilter] = useState('all')
  const [filterModal, setFilterModal] = useState(false)
  const dispatch = useDispatch()
  const router: any = useRoute()
  const navigation: any = useNavigation()
  const params = router.params
  useEffect(() => {
    if (params?.id) dispatch(getAccount(params?.id))
  }, [params?.id])

  const entries = useMemo(
    () =>
      account?.entries?.filter((item: any) => {
        if (filter === 'all') return item
        else if (filter === 'income') return item?.entry_type === 'income'
        else if (filter === 'expense') return item?.entry_type === 'expense'
      }) || [],
    [filter, account?.entries],
  )

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('account_details')} />
      <View style={[styles.mainInfo, {backgroundColor: colors.background50}]}>
        <View style={styles.accountData}>
          <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
            {translate('account_name')}:
          </Text>
          <Text style={[styles.smallBody, {color: colors.typography}]}>
            {account?.account_name}
          </Text>
        </View>
        <View style={styles.accountData}>
          <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
            {translate('account_type')}:
          </Text>
          <Text style={[styles.smallBody, {color: colors.typography}]}>
            {account?.account_type}
          </Text>
        </View>
        {account?.organization && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('bank')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {account?.organization}
            </Text>
          </View>
        )}
        {account?.account_number && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('account_number')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {account?.account_number}
            </Text>
          </View>
        )}
        {account?.account_comments && !shortInfo && (
          <View style={styles.accountData}>
            <Text style={[styles.smallStrongBody, {color: colors.typography}]}>
              {translate('account_comments')}:
            </Text>
            <Text style={[styles.smallBody, {color: colors.typography}]}>
              {account?.account_comments}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.amountIndicator,
            {
              backgroundColor:
                account?.total_amount > 0
                  ? colors.progress.ingress
                  : colors.progress.egress,
            },
          ]}>
          <Text style={[styles.strongBody, {color: colors.typography2}]}>
            {translate('balance')}:
          </Text>
          <Text style={[styles.h3, {color: colors.typography2}]}>
            {account?.currency_symbol}{' '}
            {account?.total_amount?.toLocaleString('en-US', {
              maximumFractionDigits: account?.decimal,
            })}
          </Text>
        </View>
        <View style={[styles.actionContainer]}>
          <TouchableOpacity
            style={[styles.action]}
            onPress={() => {
              navigation.navigate('report', {type: 'account', id: account?.id})
            }}>
            <FileArrowUp width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.action]}
            onPress={() =>
              navigation.navigate('editAccount', {id: account?.id})
            }>
            <Pencil width={24} height={24} />
          </TouchableOpacity>
          {!account?.entries?.length && (
            <TouchableOpacity
              style={[styles.action]}
              onPress={() =>
                navigation.navigate('accountDelete', {id: account?.id})
              }>
              <Trash width={24} height={24} />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.actionContent]}>
          <TouchableOpacity
            style={[styles.action]}
            onPress={() => setFilterModal(!filterModal)}>
            <Funnel width={24} height={24} />
          </TouchableOpacity>
          <Text>{translate('last_movements')}</Text>
          <TouchableOpacity
            onPress={() => setShortInfo(!shortInfo)}
            style={[styles.action, !shortInfo ? styles.actionUp : null]}>
            {(!!account?.organization ||
              !!account?.account_number ||
              account?.account_comments) && (
              <CaretDown width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ItemList items={entries} type="dashboard" />
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
                  setFilter('all')
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
                  setFilter('income')
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
                    setFilter('expense')
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

export default AccountDetail
