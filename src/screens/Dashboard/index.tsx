import React, {FC, useEffect, useMemo} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {translate} from 'utils'
import {ActionBanner, Header, InfoBanner, ItemList} from 'components'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {getDashboardValues} from 'store/actions'
/* import SvgFileArrowUp from '@assets/img/FileArrowUp.svg' */

const Dashboard: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const {defaultPrices} = useSelector((state: any) => state.currency)
  const {dashboardValues} = useSelector((state: any) => state.account)

  useEffect(() => {
    if (Object.keys(defaultPrices)?.length) dispatch(getDashboardValues())
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

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[{backgroundColor: colors.background50}]}>
        <Header />
        <InfoBanner values={infoValues} />
        <View style={[styles.lastMovementsContainer]}>
          <TouchableOpacity style={styles.svg}>
           {/*  <SvgFileArrowUp width={24} height={24} /> */}
          </TouchableOpacity>
          <Text style={[styles.strongBody, {color: colors.typography}]}>
            {translate('last_movements')}
          </Text>
        </View>
      </View>
      <View style={[styles.upperBox]}>
        <View style={styles.downBox}>
          {dashboardValues?.entries?.length ? (
            <ItemList items={dashboardValues?.entries} type="dashboard" />
          ) : (
            <View style={styles.noItemBox}>
              <Text style={[styles.noItemText, {color: colors.typography}]}>
                {translate('no_items')}
              </Text>
            </View>
          )}
        </View>
      </View>
      <ActionBanner payment={true} expense={true} />
    </View>
  )
}

export default Dashboard
