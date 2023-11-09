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
import {getDashboardValues, getIncoming} from 'store/actions'

const Incoming: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const {defaultPrices} = useSelector((state: any) => state.currency)
  const {dashboardValues} = useSelector((state: any) => state.account)
  const {items} = useSelector((state: any) => state.incoming)

  useEffect(() => {
    //dispatch(getIncoming())
    if (Object.keys(defaultPrices)?.length) dispatch(getDashboardValues())
    /*ciclo_infinito*/
  }, [defaultPrices])
  const infoValues = useMemo(() => {
    return {
      month1: {
        value: dashboardValues?.monthIncome,
        label: 'month_income',
        color: colors.progress.ingress,
      },
      month2: {
        value: dashboardValues?.monthExpenses,
        label: 'month_expenses',
        color: colors.progress.egress,
      },
      month3: {
        value: dashboardValues?.monthProjected,
        label: 'month_projected',
        color: colors.progress.needs,
      },
    }
  }, [dashboardValues, colors])
  const DropDownInfo = [
    {
      label: translate('fixed_incoming'),
      router: 'fixedIncoming',
    },
    {
      label: translate('pending_incoming'),
      router: 'pendingIncoming',
    },
    {
      title: translate('last_payments'),
    },
  ]
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[{backgroundColor: colors.background50}]}>
        <Header />
        <InfoBanner values={infoValues} />
        <DropDownButtons DropDownInfo={DropDownInfo} />
      </View>
      {dashboardValues.entries?.length ? (
        <ItemList
          items={[...dashboardValues.entries]?.reduce(
            (prev: any, next: any) => {
              return next.entry_type === 'income' ? [...prev, next] : prev
            },
            [],
          )}
          type="dashboard"
        />
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

export default Incoming
