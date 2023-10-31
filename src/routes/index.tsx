import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {PrivateStack, PublicStack} from './Stacks'
//import SplashScreen from 'react-native-splash-screen'

const AppNavigation = () => {
  const {isAuth} = useSelector((state: any) => state.account)

  useEffect(() => {
    //    SplashScreen.hide()
  }, [])
  return <>{isAuth ? <PrivateStack /> : <PublicStack />}</>
}

export default AppNavigation
