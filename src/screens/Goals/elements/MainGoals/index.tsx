import React, { FC, useEffect } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { translate } from 'utils'
import { useDispatch, useSelector } from 'react-redux'
import { Header, DropDownButtons, ActionBanner, ItemList } from '@components'
import { getDashboardValues, getEntriesGoals } from 'store/actions'
import { Button } from 'theme'

const MainGoals: FC = () => {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const { defaultPrices } = useSelector((state: any) => state.currency)
  const { items } = useSelector((state: any) => state.goals)
  const [selectedType, setSelectedType] = React.useState('compromise')

  useEffect(() => {
    if (Object.keys(defaultPrices)?.length) dispatch(getDashboardValues())
  }, [defaultPrices])

  const DropDownInfo = [
    {},
    {},
    {
      title:
        selectedType === 'compromise'
          ? translate('compromises_list')
          : translate('desires_list'),
    },
  ]
  useEffect(() => {
    dispatch(getEntriesGoals(selectedType))
  }, [selectedType])

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <View style={[{ backgroundColor: colors.background50 }]}>
        <Header />
        <View style={[styles.actionBanner]}>
          <Button
            style={{
              ...styles.button,
              ...(selectedType === 'compromise'
                ? { borderColor: colors.typography }
                : {}),
            }}
            text={translate('compromise')}
            disabled={false}
            onPress={() => setSelectedType('compromise')}
          />
          <Button
            style={{
              ...styles.button,
              ...(selectedType === 'desire'
                ? { borderColor: colors.typography }
                : {}),
            }}
            text={translate('desire')}
            disabled={false}
            onPress={() => setSelectedType('desire')}
          />
        </View>
        <DropDownButtons DropDownInfo={DropDownInfo} type={selectedType} />
      </View>
      {items?.length ? (
        <ItemList items={items} type="goals" />
      ) : (
        <View style={styles.noItemBox}>
          <Text style={[styles.noItemText, { color: colors.typography }]}>
            {translate('no_items')}
          </Text>
        </View>
      )}
      <ActionBanner
        payment={false}
        expense={false}
        goals={true}
        type={selectedType}
      />
    </View>
  )
}

export default MainGoals
