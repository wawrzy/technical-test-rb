import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)
const middleware = applyMiddleware(logger);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store)

export {
  store,
  persistor,
};
