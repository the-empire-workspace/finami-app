import React, { FC, useCallback, useState } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useSelector } from 'react-redux'
import { processEntries, randomColor } from 'utils'
import { useFocusEffect } from '@react-navigation/native'
import { ItemList } from 'components'
import { PieChart } from 'react-native-chart-kit'

const Dashboard: FC = () => {
  const widthAndHeight = 220
  const { width: screenWidth } = useWindowDimensions()
  const { colors } = useTheme()
  const {
    incoming: { items: itemsIncomings },
    outcoming: { items: itemsOutcomings },
    account: { user },
    currency: { items: currencies },
  } = useSelector((state: any) => state)

  const [total, setTotal] = useState(0)
  const [allItems, setAllItems] = useState<any>([])
  const [chart, setChart] = useState<any>([])

  const currency = currencies.find((cur: any) => cur.id === user.currency)

  const calculateTotal = () => {
    const totalIncomings = processEntries(itemsIncomings)
    const totalOutcomings = processEntries(itemsOutcomings)
    setTotal(totalIncomings.total - totalOutcomings.total)
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

    const chartData: any = []

    for (const item of orderItems)
      if (item.status === 'paid' || item.category) {
        const amount = item?.amount || processEntries(item?.entries).total
        const color = randomColor()
        const newData = {
          name: item.name,
          amount,
          color: color,
          legendFontColor: color,
          legendFontSize: 13,
        }
        chartData.push(newData)
      }

    setChart(chartData)
  }

  useFocusEffect(
    useCallback(() => {
      calculateTotal()
      setItems()
    }, [itemsIncomings, itemsOutcomings]),
  )


  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.upperBox]}>
        <Text style={[styles.amountText, { color: colors.text }]}>
          {currency.symbol} {total ? total : '0'}
        </Text>
        <Text style={[styles.labelText, { color: colors.text }]}>
          Estado Financiero
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
          style={{ backgroundColor: colors.background }}
        />
        <View style={styles.downBox}>
          {allItems?.length ? (
            <ItemList items={allItems} type="dashboard" />
          ) : (
            <View style={styles.noItemBox}>
              <Text style={[styles.noItemText, { color: colors.text }]}>
                No Items
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Dashboard
