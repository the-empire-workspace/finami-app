import React, {FC, useState} from 'react'
import {Text, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {translate} from 'utils'
import {ItemList} from 'components'

const Dashboard: FC = () => {
  const {colors} = useTheme()

  const [allItems] = useState<any>([])

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[styles.upperBox]}>
        <View style={styles.downBox}>
          {allItems?.length ? (
            <ItemList items={allItems} type="dashboard" />
          ) : (
            <View style={styles.noItemBox}>
              <Text style={[styles.noItemText, {color: colors.typography}]}>
                {translate('no_items')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Dashboard
