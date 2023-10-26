/* import AsyncStorage from '@react-native-async-storage/async-storage' */
import {createStore, applyMiddleware} from 'redux'
/* import {persistStore /* persistReducer  from 'redux-persist' */
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'
/*
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['account', 'incoming', 'outcoming', 'currency'],
  blacklist: [
    /* 'account'
    /* 'incoming'
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers) */

const sagaMiddleware = createSagaMiddleware()
const store: any = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

/* const persistor = persistStore(store) */

export {store, /* persistor */}
