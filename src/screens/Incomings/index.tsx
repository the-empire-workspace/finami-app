import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { ItemList, TotalBox } from 'components'

const Incomings: FC = () => {
  const { colors } = useTheme()
  const navigation: any = useNavigation()

  const {
    incoming: { items: incomingsItems },
  } = useSelector((state: any) => state)

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.upperBox]}>
        <TotalBox />
        <TouchableOpacity
          style={[styles.newButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('entry', { type: 'incomings' })}
        >
          <Text style={[styles.newButtonText, { color: colors.background }]}>
            +
          </Text>
        </TouchableOpacity>
        <View style={styles.downBox}>
          {incomingsItems?.length ? (
            <ItemList items={incomingsItems} type="incomings" />
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

export default Incomings
