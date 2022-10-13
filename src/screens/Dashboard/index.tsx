import React, {FC, useCallback, useState} from 'react'
import {Text, useWindowDimensions, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useSelector} from 'react-redux'
import {processEntries, translate} from 'utils'
import {useFocusEffect} from '@react-navigation/native'
import {ItemList} from 'components'
import {PieChart} from 'react-native-chart-kit'

const Dashboard: FC = () => {
  const widthAndHeight = 220
  const {width: screenWidth} = useWindowDimensions()
  const {colors} = useTheme()
  const {
    incoming: {items: itemsIncomings},
    outcoming: {items: itemsOutcomings},
    account: {user},
    currency: {items: currencies, defaultPrices},
  } = useSelector((state: any) => state)

  const [total, setTotal] = useState(0)
  const [allItems, setAllItems] = useState<any>([])
  const [chart, setChart] = useState<any>([])

  const currency = currencies.find((cur: any) => cur.id === user.currency)

  const calculateTotal = () => {
    const totalIncomings = processEntries(itemsIncomings, defaultPrices)
    const totalOutcomings = processEntries(itemsOutcomings, defaultPrices)

    setTotal(totalIncomings?.total - totalOutcomings?.total)

    const chartData: any = [
      {
        name: translate('incomings'),
        amount: totalIncomings?.total || 0,
        color: colors.success,
        legendFontColor: colors.success,
        legendFontSize: 13,
      },
      {
        name: translate('outcomings'),
        amount: totalOutcomings?.total || 0,
        color: colors.unsuccess,
        legendFontColor: colors.unsuccess,
        legendFontSize: 13,
      },
      {
        name: translate('pending_incomings'),
        amount: totalIncomings?.pending || 0,
        color: colors.pending,
        legendFontColor: colors.pending,
        legendFontSize: 13,
      },
      {
        name: translate('pending_outcomings'),
        amount: totalOutcomings?.pending || 0,
        color: colors.error,
        legendFontColor: colors.error,
        legendFontSize: 13,
      },
    ]

    setChart(chartData)
  }

  const setItems = () => {
    const fullItems = [...itemsIncomings, ...itemsOutcomings]

    const orderItems = fullItems.sort((a: any, b: any) => {
      const aDate = a.date || a.payment_date
      const bDate = b.date || b.payment_date
      if (aDate < bDate) return 1
      if (aDate > bDate) return -1
      return 0
    })

    setAllItems(orderItems)
  }

  useFocusEffect(
    useCallback(() => {
      calculateTotal()
      setItems()
    }, [itemsIncomings.length, itemsOutcomings.length, defaultPrices]),
  )

  return (
    <View style={[styles.root, {backgroundColor: colors.background}]}>
      <View style={[styles.upperBox]}>
        <Text
          style={[
            styles.amountText,
            {color: total > 0 ? colors.success : colors.unsuccess},
          ]}>
          {currency?.symbol} {total ? total?.toFixed(currency?.decimal) : '0'}
        </Text>
        <Text style={[styles.labelText, {color: colors.text}]}>
          {translate('finance_status')}
        </Text>

        <PieChart
          paddingLeft="10"
          data={chart}
          width={screenWidth - 10}
          height={widthAndHeight}
          accessor={'amount'}
          chartConfig={{
            backgroundColor: colors.background,
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          backgroundColor={'transparent'}
          style={{backgroundColor: colors.background}}
        />
        <View style={styles.downBox}>
          {allItems?.length ? (
            <ItemList items={allItems} type="dashboard" />
          ) : (
            <View style={styles.noItemBox}>
              <Text style={[styles.noItemText, {color: colors.text}]}>
                {translate('no_items')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Dashboard
