import React, {FC, useMemo} from 'react'
import {Text, View} from 'react-native'
import {translate} from 'utils'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useSelector} from 'react-redux'

const InfoBanner: FC<any> = ({values}) => {
  const {colors} = useTheme()

  const {currencies} = useSelector((state: any) => state.currency)
  const {user} = useSelector((state: any) => state.account)

  const currency = useMemo(() => {
    return currencies.find((c: any) => c.id === user?.currency_id)
  }, [currencies?.length, user?.currency_id])

  return (
    <View style={[styles.root]}>
      <View style={[styles.infoBox]}>
        <Text style={[styles.strongBody, {color: values?.month1?.color}]}>
          {currency?.symbol || ''}{' '}
          {values?.month1?.value?.toLocaleString('en-US', {
            maximumFractionDigits: currency?.decimal,
          })}
        </Text>
        <Text style={[styles.extraSmallBody, {color: colors.typography}]}>
          {translate(values?.month1?.label)}
        </Text>
      </View>
      {!!values?.month2 && (
        <View style={[styles.infoBox]}>
          <Text style={[styles.strongBody, {color: values?.month2?.color}]}>
            {currency?.symbol || ''}{' '}
            {values?.month2?.value?.toLocaleString('en-US', {
              maximumFractionDigits: currency?.decimal,
            })}
          </Text>
          <Text style={[styles.extraSmallBody, {color: colors.typography}]}>
            {translate(values?.month2?.label)}
          </Text>
        </View>
      )}
      <View style={[styles.infoBox]}>
        <Text style={[styles.strongBody, {color: colors.states.caution}]}>
          {currency?.symbol || ''}{' '}
          {values?.month3?.value?.toLocaleString('en-US', {
            maximumFractionDigits: currency?.decimal,
          })}
        </Text>
        <Text style={[styles.extraSmallBody, {color: colors.typography}]}>
          {translate(values?.month3?.label)}
        </Text>
      </View>
    </View>
  )
}

export default InfoBanner
