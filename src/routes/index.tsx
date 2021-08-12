import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PrivateStack, PublicStack } from './Stacks'
//import SplashScreen from 'react-native-splash-screen'

const AppNavigation = () => {
  const {
    account: { isAuth },
  } = useSelector((state: any) => state)

  useEffect(() => {
    //    SplashScreen.hide()
  }, [])

  return <>{isAuth ? <PrivateStack /> : <PublicStack />}</>
}

export default AppNavigation
