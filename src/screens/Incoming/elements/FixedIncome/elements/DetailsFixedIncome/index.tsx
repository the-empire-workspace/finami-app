import {Text, View} from 'react-native'
import React from 'react'
import {styles} from './styles'
import {useTheme} from 'providers'
import {BackHandler, DetailsList, DropDownDetails} from 'components'
import {translate} from 'utils'
import {useSelector} from 'react-redux'
const DetailsFixedIncome = () => {
  const {colors} = useTheme()

  const {items} = useSelector((state: any) => state.incoming)
  const {item} = useSelector((state: any) => state.account)
  console.log(item)
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('fixed_income_detail')} />
      <DropDownDetails
        DropDownInfo={{item: items[0], title: translate('last_payments')}}
      />
      <DetailsList items={items} type="default" />
    </View>
  )
}

export default DetailsFixedIncome
