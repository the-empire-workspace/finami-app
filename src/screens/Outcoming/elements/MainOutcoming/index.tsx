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
import {getOutcomes} from 'store/actions'

const MainOutcoming: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const {items} = useSelector((state: any) => state.outcoming)

  const infoValues = useMemo(() => {
    return {
      month1: {
        value: items?.monthExpense,
        label: 'month_outcome',
        color: colors.progress.egress,
      },
      month2: {
        value: items?.basicExpense,
        label: 'basic_expenses',
        color: colors.typography,
      },
      month3: {
        value: items?.debts,
        label: 'debts',
        color: colors.progress.needs,
      },
    }
  }, [items, colors])

  const DropDownInfo = [
    {
      label: translate('basic_expenses'),
      router: 'fixedOutcome',
    },
    {
      label: translate('debts'),
      router: 'pendingOutcome',
    },
    {
      title: translate('made_outcomes'),
    },
  ]
  useEffect(() => {
    dispatch(getOutcomes())
  }, [])

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[{backgroundColor: colors.background50}]}>
        <Header />
        <InfoBanner values={infoValues} />
        <DropDownButtons DropDownInfo={DropDownInfo} type="outcomes" />
      </View>
      {items?.entries?.length ? (
        <ItemList items={items?.entries || []} type="dashboard" />
      ) : (
        <View style={styles.noItemBox}>
          <Text style={[styles.noItemText, {color: colors.typography}]}>
            {translate('no_items')}
          </Text>
        </View>
      )}
      <ActionBanner payment={false} expense={true} />
    </View>
  )
}

export default MainOutcoming
