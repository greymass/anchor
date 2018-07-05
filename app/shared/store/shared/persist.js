import { createMigrate } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';

const migrations = {
  /*
    Wallet Migration 2

      - Creating a new `wallets` parameter that contains all wallets you can swap between.
      - Migrating the `walletMode` from the settings/current wallet into each individual wallet.

  */
  2: (state) => {
    const {
      settings,
      wallet
    } = state;
    // Create a copy of the existing wallet
    const existingWallet = Object.assign({}, wallet);
    // Replicate the wallet account and mode from settings onto the wallet
    existingWallet.account = settings.account;
    existingWallet.mode = settings.walletMode;
    // Update this individual wallets version
    existingWallet.version = 2;
    return {
      // Update the existing settings + wallet state
      settings: state.settings,
      wallet: existingWallet,
      // Create the new wallets state and inject the first wallet
      wallets: [existingWallet]
    };
  }
};

const persistConfig = {
  key: 'eos-voter-config',
  version: 2,
  migrate: createMigrate(migrations, { debug: true }),
  storage: createElectronStorage(),
  whitelist: [
    'settings',
    'wallet',
    'wallets'
  ]
};

export default persistConfig;
