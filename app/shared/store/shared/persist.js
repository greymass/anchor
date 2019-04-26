import { createMigrate } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';

const migrations = {

};

const persistConfig = {
  key: 'eos-voter-config',
  version: 1,
  migrate: createMigrate(migrations, { debug: true }),
  storage: createElectronStorage(),
  timeout: 0, // The code base checks for falsy, so 0 disables
  whitelist: [
    'blockchains',
    'settings',
    'wallet',
    'wallets'
  ]
};

export default persistConfig;
