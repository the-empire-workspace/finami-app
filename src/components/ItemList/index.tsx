import React, { FC } from 'react'
import { FlatList } from 'react-native'
import { useTheme } from '@providers'
import { styles } from './styles'
import { Props } from './interface'
import { ItemElement } from './elements'
import { random } from 'lodash'

const ItemList: FC<Props> = ({ items, type }) => {
  const { colors } = useTheme()

  return (
    <FlatList
      style={[styles.transactionsBox, { backgroundColor: colors.primary }]}
      data={items}
      keyExtractor={item => item.name + random(0, 1000)}
      renderItem={({ item, index }: any) => (
        <ItemElement item={item} key={index} type={type} />
      )}
    />
  )
}

export default ItemList
