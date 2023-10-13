import React, {FC, useMemo} from 'react'
import {FlatList} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {Props} from './interface'
import {ItemElement} from './elements'
import {random} from 'lodash'
import {useSelector} from 'react-redux'

const ItemList: FC<Props> = ({items, type}) => {
  const {colors} = useTheme()

  const {currencies} = useSelector((state: any) => state.currency)
  const {user} = useSelector((state: any) => state.account)

  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === user?.currency_id)
  }, [currencies?.length, user?.currency_id])

  return (
    <FlatList
      style={[styles.transactionsBox, {backgroundColor: colors.background100}]}
      data={items}
      keyExtractor={item => item.concept + random(0, 1000)}
      renderItem={({item, index}: any) => (
        <ItemElement item={item} key={index} type={type} currency={currency} />
      )}
    />
  )
}

export default ItemList
