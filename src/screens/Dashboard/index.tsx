import React, { FC, useCallback, useState } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useSelector } from 'react-redux'
import { processEntries, translate } from 'utils'
import { useFocusEffect } from '@react-navigation/native'
import { ItemList } from 'components'
import { PieChart } from 'react-native-chart-kit'

const Dashboard: FC = () => {
  const { colors } = useTheme()

  const [allItems, setAllItems] = useState<any>([])

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <View style={[styles.upperBox]}>
        <View style={styles.downBox}>
          {allItems?.length ? (
            <ItemList items={allItems} type="dashboard" />
          ) : (
            <View style={styles.noItemBox}>
              <Text style={[styles.noItemText, { color: colors.typography }]}>
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
