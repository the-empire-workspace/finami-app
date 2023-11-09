import {View} from 'react-native'
import React from 'react'
import {styles} from './styles'
import {useTheme} from 'providers'
import {BackHandler, DetailsList, DropDownButtons} from 'components'
import {translate} from 'utils'
import {useSelector} from 'react-redux'
const DetailsFixedIncome = () => {
  const {colors} = useTheme()

  const {items} = useSelector((state: any) => state.incoming)
  const DropDownInfo = [
    {
      label: translate('fixed_incoming'),
      router: 'fixedIncoming',
    },
    {
      label: translate('pending_incoming'),
      router: 'pendingIncoming',
    },
    {
      title: translate('last_payments'),
    },
  ]
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler title={translate('fixed_income_detail')} />
      <DropDownButtons DropDownInfo={DropDownInfo} />
      <DetailsList items={items} type="default" />
    </View>
  )
}

export default DetailsFixedIncome
