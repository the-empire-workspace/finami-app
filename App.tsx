import React from 'react'
import { ErrorBoundary } from '@components'
import { store, persistor } from '@store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Main } from '@screens'
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
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