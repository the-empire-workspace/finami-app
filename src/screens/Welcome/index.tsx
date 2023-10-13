import React, {FC, useEffect, useRef} from 'react'
import {View, Image} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import Logo from '@assets/img/logo.png'
import {useNavigation} from '@react-navigation/native'
import {createTables} from '@utils'
import {useSelector} from 'react-redux'

const Welcome: FC = () => {
  const router: any = useNavigation()
  const {isAuth} = useSelector((state: any) => state.account)
  const {colors} = useTheme()
  const timeout = useRef<any>(null)

  useEffect(() => {
    if (!isAuth && !timeout.current)
      timeout.current = setTimeout(() => {
        router.navigate('StepOne')
      }, 3000)
    if (isAuth && timeout.current) clearTimeout(timeout.current)
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [isAuth])

  useEffect(() => {
    createTables()
  }, [])

  return (
    <View
      style={[styles.root, {backgroundColor: colors.background100}]}
      onTouchStart={() => router.navigate('StepOne')}>
      <Image style={styles.logo} source={Logo} />
    </View>
  )
}

export default Welcome
