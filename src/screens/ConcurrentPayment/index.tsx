import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { ItemList } from 'components'
import { ConcurrentHeader, ConcurrentInfo } from './elements'
import { getDeepItem } from 'utils'

const ConcurrentPayment: FC = () => {
  const { colors } = useTheme()
  const {
    incoming: { items: incomingsItems },
  } = useSelector((state: any) => state)

  const route = useRoute()

  const { params = {} }: any = route

  const item = params?.categoryId
    ? getDeepItem(params.categoryId, incomingsItems, params.id)
    : incomingsItems?.find((it: any) => it.id === params?.id)

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ConcurrentHeader item={item} />
      <ConcurrentInfo item={item} />
      <ItemList items={item?.entries || []} type="entry" />
    </View>
  )
}

export default ConcurrentPayment
