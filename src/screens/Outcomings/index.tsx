import React, { FC } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import PieChart from 'react-native-pie-chart';
import { useTheme } from 'providers';
import { TransactionCategory } from 'interfaces';
import LogoI from '@assets/img/logoI.png'
import { Transaction } from 'interfaces/transaction';
import uuid from 'react-native-uuid';

const Dashboard: FC = () => {

  const widthAndHeight = 220
  const series = [123, 321, 123, 789, 537]
  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']
  const { colors } = useTheme()

  const transactionCategories: Array<TransactionCategory> = [
    {
      name: 'Friday',
      icon: LogoI
    },
    {
      name: 'Mercado',
      icon: LogoI
    },
    {
      name: 'Entretenimiento',
      icon: LogoI
    },
    {
      name: 'Alquileres',
      icon: LogoI
    }
  ]

  const transactions: Array<Transaction> = [
    {
      id: uuid.v4(),
      description: 'Friday',
      amount: 5.08,
      type: 'out',
      category: 'Friday',
      payment_date: '10/10/2010',
      status: 'complete',
    },
    {
      id: uuid.v4(),
      description: 'Mercado',
      amount: 1000.08,
      type: 'out',
      category: 'Mercado',
      payment_date: '10/10/2010',
      status: 'pending',
    },
    {
      id: uuid.v4(),
      description: 'Entretenimiento',
      amount: 17000.00,
      type: 'in',
      category: 'Entretenimiento',
      payment_date: '10/10/2010',
      status: 'complete',
    },
    {
      id: uuid.v4(),
      description: 'Alquileres',
      amount: 270000.00,
      type: 'in',
      category: 'Alquileres',
      payment_date: '10/10/2010',
      status: 'pending',
    }
  ]

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.upperBox]}>
        <Text style={[styles.amountText, { color: colors.text }]}>$ +/-000.000.000,00</Text>
        <Text style={[styles.labelText, { color: colors.text }]}>Estado Financiero</Text>

        <PieChart
          style={styles.chart}
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.9}
          coverFill={colors.background}
        />

        <View style={styles.categories}>
          {
            transactionCategories.map((data: TransactionCategory, index: any) => (
              <TouchableOpacity style={styles.categoryBox} key={index}>
                <Image style={styles.categoryIcon} source={data.icon} />
                <Text style={[styles.categoryText, { color: colors.text }]}>{data.name}</Text>
              </TouchableOpacity>
            ))
          }
        </View>

        <View style={styles.downBox}>
          <FlatList style={styles.transactionsBox} data={transactions} keyExtractor={(item) => item.id} renderItem={({ item }: any) => (
            <TouchableOpacity style={styles.transactionItem}>
              <View style={styles.transactionItemBox}>
                <Text style={[styles.transactionTitle, { color: colors.text }]}>{item.description}</Text>
                <Text style={[styles.transactionCategory, { color: colors.text }]}>{item.category}</Text>
              </View>
              <View style={styles.transactionItemBox}>
                <Text style={[styles.transactionAmount, { color: colors.text }]}>{item.amount}</Text>
                <Text style={[styles.transactionDate, { color: colors.text }]}>{item.payment_date}</Text>
              </View>
            </TouchableOpacity>
          )} />
        </View>

      </View>
    </View>
  )
}

export default Dashboard
