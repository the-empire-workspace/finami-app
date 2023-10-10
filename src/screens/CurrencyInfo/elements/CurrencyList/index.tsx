import {useFocusEffect} from '@react-navigation/native'
import {ItemList} from 'components'
import {useTheme} from 'providers'
import React, {FC, useCallback, useState} from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import {filterByCurrency} from 'utils'
import {styles} from './styles'

const CurrencyList: FC<any> = ({currency}) => {
  const [allItems, setAllItems] = useState<any>([])
  const {
    incoming: {items: itemsIncomings},
    outcoming: {items: itemsOutcomings},
  } = useSelector((state: any) => state)
  const {colors} = useTheme()

  const setItems = () => {
    const orderItems = filterByCurrency(
      currency,
      itemsIncomings,
      itemsOutcomings,
    )
    setAllItems(orderItems)
  }

  useFocusEffect(
    useCallback(() => {
      setItems()
    }, [itemsIncomings?.length, itemsOutcomings?.length]),
  )
  return (
    <View style={[styles.root, {backgroundColor: colors.background}]}>
      <ItemList items={allItems} type="dashboard" />
    </View>
  )
}

export default CurrencyList
