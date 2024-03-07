import React, {FC, useEffect, useMemo} from 'react'
import {Text, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {translate} from 'utils'
import {useDispatch, useSelector} from 'react-redux'
import {
  Header,
  InfoBanner,
  DropDownButtons,
  ActionBanner,
  ItemList,
} from '@components'
import {getDashboardValues, getIncomes} from 'store/actions'

const MainIncoming: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const {defaultPrices} = useSelector((state: any) => state.currency)
  const {items} = useSelector((state: any) => state.incoming)

  useEffect(() => {
    if (Object.keys(defaultPrices)?.length) dispatch(getDashboardValues())
  }, [defaultPrices])

  const infoValues = useMemo(() => {
    return {
      month1: {
        value: items?.monthIncome,
        label: 'month_income',
        color: colors.progress.ingress,
      },
      month2: {
        value: items?.fixedIncome,
        label: 'fixed_income',
        color: colors.typography,
      },
      month3: {
        value: items?.receivableAccount,
        label: 'pending',
        color: colors.progress.needs,
      },
    }
  }, [items, colors])

  const DropDownInfo = [
    {
      label: translate('fixed_incomes'),
      router: 'fixedIncome',
    },
    {
      label: translate('receivable_accounts'),
      router: 'pendingIncome',
    },
    {
      title: translate('made_incomes'),
    },
  ]
  useEffect(() => {
    dispatch(getIncomes())
  }, [])

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[{backgroundColor: colors.background50}]}>
        <Header />
        <InfoBanner values={infoValues} />
        <DropDownButtons DropDownInfo={DropDownInfo} type="incomes" />
      </View>
      {items?.entries?.length ? (
        <ItemList items={items.entries} type="dashboard" />
      ) : (
        <View style={styles.noItemBox}>
          <Text style={[styles.noItemText, {color: colors.typography}]}>
            {translate('no_items')}
          </Text>
        </View>
      )}
      <ActionBanner payment={true} expense={false} />
    </View>
  )
}

export default MainIncoming
