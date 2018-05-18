import createElectronStorage from 'redux-persist-electron-storage';

const persistConfig = {
  key: 'eos-voter-config',
  storage: createElectronStorage(),
  whitelist: [
    'settings'
  ]
};

export default persistConfig;
