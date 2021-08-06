import React, { useEffect } from 'react'
import { ErrorBoundary } from '@components'
import { store, persistor } from '@store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Main } from '@screens'
import { NavigationContainer } from '@react-navigation/native';

import RNLocalize from "react-native-localize"
import { setI18nConfig } from '@utils'

const App = () => {
  const handleLocalizationChange = () => {
    setI18nConfig()
  };

  useEffect(() => {
    setI18nConfig()
    RNLocalize.addEventListener('change', handleLocalizationChange)
    return () => { RNLocalize.removeEventListener('change', handleLocalizationChange) }
  }, [])
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ErrorBoundary>
            <Main />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  )
}

export default App