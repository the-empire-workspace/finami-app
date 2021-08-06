import React, { useEffect } from 'react'/* 
import { useSelector } from 'react-redux'*/
import { PrivateStack, PublicStack } from './Stacks'
//import SplashScreen from 'react-native-splash-screen' 

const AppNavigation = () => {
    /* const { account: { isAuth }, } = useSelector((state) => state)

    useEffect(() => {
        SplashScreen.hide()
    }, []) */

    return <>{false ? <PrivateStack /> : <PublicStack />}</>
}

export default AppNavigation