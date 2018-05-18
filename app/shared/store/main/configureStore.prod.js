// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import persistConfig from '../shared/persist';

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    electronEnhancer({
      dispatchProxy: a => store.dispatch(a)
    })
  );
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}

export default { configureStore };
