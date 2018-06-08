import { createStore, applyMiddleware, compose } from 'redux';
import { electronEnhancer } from 'redux-electron-store';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import persistConfig from '../shared/persist';
import { configureLocalization } from '../shared/i18n';

const configureStore = (initialState, resourcePath) => {
  const middleware = [];

  middleware.push(thunk);

  const enhancer = compose(
    applyMiddleware(...middleware),
    electronEnhancer({
      dispatchProxy: a => store.dispatch(a),
    })
  );

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store, null, () => {
    // Configure localization after the store has rehydrated to get the language from settings
    configureLocalization(resourcePath, store.getState());
  });

  if (module.hot) {
    module.hot.accept('../../reducers', () =>
      store.replaceReducer(require('../../reducers'))); // eslint-disable-line global-require
  }

  return { store, persistor };
};

export default { configureStore };
