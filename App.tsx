import React, { useEffect } from 'react'
import { ErrorBoundary } from '@components'
import { store, persistor } from '@store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Main } from '@screens'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@providers'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './src/utils/hideLogs'
import notifee, { EventType } from '@notifee/react-native';
import { emitter } from 'utils/eventEmitter'
import RNLocalize from 'react-native-localize'
import { setI18nConfig } from '@utils'

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;

  if (type === EventType.PRESS) emitter.emit('check_notification', notification?.id)

});

const App = () => {

  const handleLocalizationChange = () => {
    setI18nConfig()
  }
  useEffect(() => {
    setI18nConfig()
    RNLocalize.addEventListener('change', handleLocalizationChange)
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange)
    }
  }, [])


  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
              <ErrorBoundary>
                <Main />
              </ErrorBoundary>
            </PersistGate>
          </Provider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
