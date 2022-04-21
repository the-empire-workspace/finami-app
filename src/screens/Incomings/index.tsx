import React, {FC, useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useNavigation} from '@react-navigation/core'
import {useSelector} from 'react-redux'
import {ItemList, TotalBox} from 'components'
import {processEntries, translate} from 'utils'

const Incomings: FC = () => {
  const {colors} = useTheme()
  const navigation: any = useNavigation()

  const {
    incoming: {items: incomingsItems},
    currency: {defaultPrices},
  } = useSelector((state: any) => state)
  const [total, setTotal] = useState({monthly: 0, total: 0, pending: 0})

  useEffect(() => {
    setTotal(processEntries(incomingsItems, defaultPrices))
  }, [incomingsItems?.length, defaultPrices])

  return (
    <View style={[styles.root, {backgroundColor: colors.background}]}>
      <View style={[styles.upperBox]}>
        <TotalBox total={total} type="incomings" />
        <TouchableOpacity
          style={[styles.newButton, {backgroundColor: colors.primary}]}
          onPress={() => navigation.navigate('entry', {type: 'incomings'})}>
          <Text style={[styles.newButtonText, {color: colors.background}]}>
            +
          </Text>
        </TouchableOpacity>
        <View style={styles.downBox}>
          {incomingsItems?.length ? (
            <ItemList items={incomingsItems} type="incomings" />
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

export default Incomings
