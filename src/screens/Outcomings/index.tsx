import React, { FC, useCallback, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useNavigation, useFocusEffect } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { ItemList, TotalBox } from 'components'
import { processEntries } from 'utils'

const Outcomings: FC = () => {
  const { colors } = useTheme()
  const navigation: any = useNavigation()

  const {
    outcoming: { items: outcomingsItems },
    currency: { defaultPrices },
  } = useSelector((state: any) => state)
  const [total, setTotal] = useState({ monthly: 0, total: 0, pending: 0 })

  useFocusEffect(
    useCallback(() => {
      setTotal(processEntries(outcomingsItems, defaultPrices))
    }, [outcomingsItems]),
  )

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.upperBox]}>
        <TotalBox total={total} type="Egresos" />
        <TouchableOpacity
          style={[styles.newButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('entry', { type: 'outcomings' })}
        >
          <Text style={[styles.newButtonText, { color: colors.background }]}>
            +
          </Text>
        </TouchableOpacity>
        <View style={styles.downBox}>
          {outcomingsItems?.length ? (
            <ItemList items={outcomingsItems} type="outcomings" />
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

export default Outcomings
