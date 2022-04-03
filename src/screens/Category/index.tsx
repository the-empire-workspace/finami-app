import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useTheme } from 'providers'
import { useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ItemList } from 'components'
import { CategoryHeader } from './elements'
import { getDeepItem } from 'utils'

const Category: FC = () => {
  const { colors } = useTheme()
  const {
    incoming: { items: incomingsItems },
  } = useSelector((state: any) => state)

  const route = useRoute()

  const { params = {} }: any = route

  const item = params?.categoryId
    ? getDeepItem(params.categoryId, incomingsItems, params.id)
    : incomingsItems?.find((it: any) => it.id === params?.id)

  const navigation: any = useNavigation()

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <CategoryHeader item={item} />
      <TouchableOpacity
        style={[styles.newButton, { backgroundColor: colors.primary }]}
        onPress={() =>
          navigation.navigate('entry', {
            type: 'incomings',
            categoryId: params?.categoryId
              ? [...params?.categoryId, item?.id]
              : [item?.id],
          })
        }
      >
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
            No Items
          </Text>
        </View>
      )}
    </View>
  )
}

export default Category
