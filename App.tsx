import React, {useEffect} from 'react'
import {ErrorBoundary} from '@components'
import {store} from '@store'
import {Provider} from 'react-redux'
import {Main} from '@screens'
import {NavigationContainer} from '@react-navigation/native'
import {ThemeProvider} from '@providers'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import './src/utils/hideLogs'
import notifee, {EventType} from '@notifee/react-native'
import {emitter} from 'utils/eventEmitter'
import {setI18nConfig} from '@utils'
import SQLite from 'react-native-sqlite-storage'
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native'
import {WagmiConfig} from 'wagmi'
import {mainnet, polygon, arbitrum} from 'wagmi/chains'

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail

  if (type === EventType.PRESS)
    emitter.emit('check_notification', notification?.id)
})

SQLite.DEBUG(false)

const projectId = '46af7327d6cb0b9caba903b3514bd6be'

// 2. Create config
const metadata = {
  name: 'Finami App',
  description: 'Finami App Web4 Modal',
  url: 'https://finami.com',
  icons: ['https://finami.com/favicon.ico'],
}

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata})

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
})

const App = () => {
  useEffect(() => {
    setI18nConfig()
  }, [])

  return (
    <SafeAreaProvider>
      <WagmiConfig config={wagmiConfig}>
        <ThemeProvider>
          <NavigationContainer>
            <Provider store={store}>
              <ErrorBoundary>
                <Main />
              </ErrorBoundary>
            </Provider>
          </NavigationContainer>
        </ThemeProvider>
        <Web3Modal />
      </WagmiConfig>
    </SafeAreaProvider>
  )
}

export default App
