import React, {FC} from 'react'
import {FlatList} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'
import {ItemElement} from './elements'
const ItemList: FC<Props> = ({items, type}) => {
  const {colors} = useTheme()

  return (
    <FlatList
      style={[styles.transactionsBox, {backgroundColor: colors.background100}]}
      data={items}
      keyExtractor={item => item.id}
      renderItem={({item, index}: any) => (
        <ItemElement item={item} key={index} type={type} />
      )}
    />
  )
}

export default ItemList
