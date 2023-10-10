import React, { useEffect } from 'react'
import { ErrorBoundary } from '@components'
import { store } from '@store'
import { Provider } from 'react-redux'
import { Main } from '@screens'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@providers'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import './src/utils/hideLogs'
import notifee, { EventType } from '@notifee/react-native';
import { emitter } from 'utils/eventEmitter'
import RNLocalize from 'react-native-localize'
import { setI18nConfig } from '@utils'
import SQLite from 'react-native-sqlite-storage';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;

  if (type === EventType.PRESS) emitter.emit('check_notification', notification?.id)

});

SQLite.DEBUG(false);

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
            <ErrorBoundary>
              <Main />
            </ErrorBoundary>
          </Provider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
