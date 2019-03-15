import { find } from 'lodash';
import { createMigrate } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';

import EOSAccount from '../../utils/EOS/Account';

import { update as update009 } from './migrations/009-updateSettings';
import { update as update010 } from './migrations/010-updateBlockchains';
import { update as update011 } from './migrations/011-updateBlockchains';
import { update as update012 } from './migrations/012-updateBlockchains';
import { update as update013 } from './migrations/013-updateBlockchains';

const defaultChainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

const migrations = {
  /*
    2 - Wallet Migration

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
  },
  /*
    3 - Wallet Migration

      - Ensure the customTokens field is set with the base token

  */
  3: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.customTokens
      || !newSettings.customTokens.length
    ) {
      newSettings.customTokens = ['eosio.token:EOS'];
    }
    if (
      newSettings.customTokens
      && newSettings.customTokens.indexOf('eosio.token:EOS') === -1
    ) {
      newSettings.customTokens.push('eosio.token:EOS');
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  4 - Wallet Migration

    - Correct format of all customTokens

  */
  4: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      newSettings.customTokens
      && newSettings.customTokens.length > 0
    ) {
      newSettings.customTokens.forEach((token, idx) => {
        const [contract, symbol] = token.split(':');
        newSettings.customTokens[idx] = [contract.toLowerCase(), symbol.toUpperCase()].join(':');
      });
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  5 - Settings Migration

    - Add recentContracts array to existing settings

  */
  5: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.recentContracts
    ) {
      newSettings.recentContracts = [];
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  6 - Settings Migration

    - Add contacts array to existing settings
    - Add recentProposalsScopes array to existing settings

  */
  6: (state) => {
    const {
      settings
    } = state;
    const newSettings = Object.assign({}, settings);
    if (
      !newSettings.recentProposalsScopes
    ) {
      newSettings.recentProposalsScopes = [];
    }
    if (
      !newSettings.contacts
    ) {
      newSettings.contacts = [];
    }
    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  /*
  7 - Wallet Authorizations

    -

  */
  7: (state) => {
    const {
      wallet,
      wallets
    } = state;
    // Convert loaded wallet to new format
    const modifiedWallet = Object.assign({}, wallet);
    modifiedWallet.version = 3;
    modifiedWallet.authorization = false;
    // Update from the wallet the wallets collection
    if (!wallet.accountData) {
      const found = find(wallets, {
        account: wallet.account
      });
      if (found) {
        modifiedWallet.accountData = found.accountData;
        modifiedWallet.pubkey = found.pubkey;
      }
    }
    // If we have the pubkey and data, set the authorization
    if (modifiedWallet.pubkey && modifiedWallet.accountData) {
      const auth =
        new EOSAccount(modifiedWallet.accountData)
          .getAuthorization(modifiedWallet.pubkey);
      if (auth) {
        const [, authorization] = auth.split('@');
        if (authorization) {
          modifiedWallet.authorization = authorization;
        }
      }
    }
    // Remove temporary account data
    delete modifiedWallet.accountData;
    // Convert all wallets to new format
    const modifiedWallets = [];
    wallets.forEach((currentWallets) => {
      const currentWallet = Object.assign({}, currentWallets);
      currentWallet.version = 3;
      currentWallet.authorization = false;
      // If we have the pubkey and data, set the authorization
      if (currentWallets.pubkey && currentWallets.accountData) {
        const auth =
          new EOSAccount(currentWallets.accountData)
            .getAuthorization(currentWallets.pubkey);
        if (auth) {
          const [, authorization] = auth.split('@');
          if (authorization) {
            currentWallet.authorization = authorization;
          }
        }
      }
      modifiedWallets.push(currentWallet);
    });
    return Object.assign({}, state, {
      wallet: modifiedWallet,
      wallets: modifiedWallets
    });
  },
  /*
  8 - Networks

    - Force all existing wallets to EOS Mainnet

  */
  8: (state) => {
    const {
      settings,
      wallet,
      wallets
    } = state;
    const modifiedWallet = Object.assign({}, wallet);
    modifiedWallet.chainId = defaultChainId;
    const modifiedWallets = [];
    wallets.forEach((current) => {
      const newWallet = Object.assign({}, current);
      newWallet.chainId = defaultChainId;
      modifiedWallets.push(newWallet);
    });
    const modifiedSettings = Object.assign({}, settings);
    modifiedSettings.chainId = defaultChainId;
    return Object.assign({}, state, {
      settings: modifiedSettings,
      wallet: modifiedWallet,
      wallets: modifiedWallets
    });
  },
  /*
    9 - More blockchain options

    - Provide exclude in settings
    - Update default settings.customTokens
  */
  9: (state) => Object.assign({}, state, {
    settings: update009(state.settings, defaultChainId)
  }),
  /*
    10 - Added excludeFeatures to all chains
  */
  10: (state) => Object.assign({}, state, {
    blockchains: update010(state.blockchains),
  }),
  /*
    11 - Rechange blockchains supported contracts
  */
  11: (state) => Object.assign({}, state, {
    blockchains: update011(state.blockchains),
  }),
  /*
   12 - Rechange blockchains supported contracts
 */
  12: (state) => Object.assign({}, state, {
    blockchains: update012(state.blockchains),
  }),
  /*
   13 - Mark current BEOS as testnet
 */
  13: (state) => Object.assign({}, state, {
    blockchains: update013(state.blockchains),
  }),
};

const persistConfig = {
  key: 'eos-voter-config',
  version: 13,
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
