import React, {FC, useEffect, useMemo} from 'react'
import {View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
//import {useNavigation} from '@react-navigation/core'
import {useDispatch, useSelector} from 'react-redux'
import {Header, InfoBanner, DropDown} from 'components'
//import {processEntries, translate} from 'utils'
import {getDashboardValues} from 'store/actions'

const Incoming: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()

  const {defaultPrices} = useSelector((state: any) => state.currency)
  const {dashboardValues} = useSelector((state: any) => state.account)

  useEffect(() => {
    if (Object.keys(defaultPrices)?.length) dispatch(getDashboardValues())
  }, [defaultPrices])

  const infoValues = useMemo(() => {
    return {
      month1: {
        value: dashboardValues?.monthIncome,
        label: 'month_income',
        color: colors.progress.ingress,
      },
      month2: {
        value: dashboardValues?.monthExpenses,
        label: 'month_expenses',
        color: colors.progress.egress,
      },
      month3: {
        value: dashboardValues?.monthProjected,
        label: 'month_projected',
        color: colors.progress.needs,
      },
    }
  }, [dashboardValues, colors])
  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <View style={[{backgroundColor: colors.background50}]}>
        <Header />
        <InfoBanner values={infoValues} />
        <DropDown />
      </View>
    </View>
  )
  /*  const {colors} = useTheme()
   const navigation: any = useNavigation()
 
   const {
     incoming: {items: incomingsItems},
     currency: {defaultPrices},
   } = useSelector((state: any) => state)
   const [total, setTotal] = useState({monthly: 0, total: 0, pending: 0})
 
   useEffect(() => {
     setTotal(processEntries(incomingsItems, defaultPrices))
   }, [incomingsItems?.length, defaultPrices])
 
   return (
     <View style={[styles.root, {backgroundColor: colors.background}]}>
       <View style={[styles.upperBox]}>
         <TotalBox total={total} type="incomings" />
         <TouchableOpacity
           style={[styles.newButton, {backgroundColor: colors.primary}]}
           onPress={() => navigation.navigate('entry', {type: 'incomings'})}>
           <Text style={[styles.newButtonText, {color: colors.background}]}>
             +
           </Text>
         </TouchableOpacity>
         <View style={styles.downBox}>
           {incomingsItems?.length ? (
             <ItemList items={incomingsItems} type="incomings" />
           ) : (
             <View style={styles.noItemBox}>
               <Text style={[styles.noItemText, {color: colors.text}]}>
                 {translate('no_items')}
               </Text>
             </View>
           )}
         </View>
       </View>
     </View>
   ) */
}

export default Incoming
