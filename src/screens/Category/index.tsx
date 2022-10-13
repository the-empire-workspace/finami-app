import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ItemList } from 'components'
import { CategoryHeader } from './elements'
import { getDeepItem, translate } from 'utils'

const Category: FC = () => {
  const { colors } = useTheme()
  const {
    incoming: { items: incomingsItems },
    outcoming: { items: outcomingsItems }
  } = useSelector((state: any) => state)

  const route = useRoute()

  const { params = {} }: any = route

  const items = (params?.type === 'incomings') ? incomingsItems : outcomingsItems
  const item = params?.categoryId
    ? getDeepItem(params.categoryId, items, params.id)
    : items?.find((it: any) => it.id === params?.id)

  const navigation: any = useNavigation()
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <CategoryHeader item={item} />
      <TouchableOpacity
        style={[styles.newButton, { backgroundColor: colors.primary }]}
        onPress={() =>
          navigation.navigate('entry', {
            type: params?.type,
            categoryId: params?.categoryId
              ? [...params?.categoryId, item?.id]
              : [item?.id],
          })
        }>
        <Text style={[styles.newButtonText, { color: colors.background }]}>
          +
        </Text>
      </TouchableOpacity>
      {item?.entries?.length ? (
        <ItemList
          items={item?.entries || []}
          type="category"
          categoryId={
            params?.categoryId ? [...params?.categoryId, item?.id] : [item?.id]
          }
        />
      ) : (
        <View style={styles.noItemBox}>
          <Text style={[styles.noItemText, { color: colors.text }]}>
            {translate('no_items')}
          </Text>
        </View>
      )}
    </View>
  )
}

export default Category
