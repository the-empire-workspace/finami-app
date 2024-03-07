import React, { FC, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { BackHandler } from 'components'
import { useTheme } from 'providers'
import { translate } from 'utils'
import { useDispatch } from 'react-redux'
import { getCurrencies } from 'store/actions'
import { useSelector } from 'react-redux'
import SvgFileArrowUp from '@assets/img/FileArrowUp.svg'
import { useNavigation } from '@react-navigation/native'
const Currencies: FC = () => {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const { currencies } = useSelector((state: any) => state.currency)
  const navigation: any = useNavigation()

  useEffect(() => {
    dispatch(getCurrencies())
  }, [])

  return (
    <View style={[styles.root, { backgroundColor: colors.background100 }]}>
      <BackHandler title={translate('currencies')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {currencies?.map((item: any, index: any) => (
          <TouchableOpacity style={[styles.currencyItem]} key={index}>
            <Text
              style={[
                styles.strongBody,
                {
                  color:
                    item?.total_amount === 0
                      ? colors.typography
                      : colors.progress.ingress,
                },
              ]}>
              {item?.total_amount.toLocaleString('en-US', {
                minimumFractionDigits:
                  item?.total_amount > 0
                    ? item?.decimal > 8
                      ? 8
                      : item?.decimal
                    : 0,
              })}
            </Text>
            <Text style={[styles.strongBody, { color: colors.typography }]}>
              {item?.name} {`(${item?.symbol})`}
            </Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => { navigation.navigate('report', { type: 'currency', id: item?.id }) }}>
                <SvgFileArrowUp width={24} height={24} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Currencies
