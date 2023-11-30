import {View} from 'react-native'
import React from 'react'
import {styles} from './styles'
import {useTheme} from 'providers'
import {
  BackHandler,
  DetailsList,
  DropDownDetails,
  ProgressBar,
} from 'components'
import {translate} from 'utils'
import {useSelector} from 'react-redux'
const DetailsPendingIncome = () => {
  const {colors} = useTheme()

  const {items} = useSelector((state: any) => state.incoming)
  const {item} = useSelector((state: any) => state.account)
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('fixed_income_detail')} />
      <ProgressBar />
      <DropDownDetails
        DropDownInfo={{item, title: translate('last_payments')}}
      />
      <DetailsList items={items} type="editable" />
    </View>
  )
}

export default DetailsPendingIncome
