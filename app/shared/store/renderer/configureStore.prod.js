// @flow

import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import persistConfig from '../shared/persist';
import { electronEnhancer } from './electronEnhancer';

const history = createHashHistory();

function configureStore(initialState) {
  const router = routerMiddleware(history);
  const enhancer = compose(
    applyMiddleware(thunk, router),
    electronEnhancer({
      dispatchProxy: a => store.dispatch(a),
    }),
  );
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
}

export default { configureStore, history };
