import { createMigrate } from 'redux-persist';

import { PrivateKey } from '@greymass/eosio';
import Store from '../../electron/store';

const fixRequestKey = (sessions) => {
  const newSessions = Object.assign({}, sessions);
  try {
    PrivateKey.fromString(sessions.requestKey, true);
  } catch (e) {
    newSessions.requestKey = PrivateKey.generate('K1');
  }
  return newSessions;
};

const migrations = {
  2: (state) => Object.assign({}, state, {
    sessions: fixRequestKey(state.sessions),
  }),
};

const createElectronStorage = ({ electronStoreOpts } = {}) => {
  const store = new Store(electronStoreOpts || {});

  return {
    getItem: key => Promise.resolve(store.get(key)),
    setItem: (key, item) => Promise.resolve(store.set(key, item)),
    removeItem: key => Promise.resolve(store.delete(key))
  };
};

const persistConfig = {
  key: 'anchor-config',
  version: 2,
  migrate: createMigrate(migrations, { debug: true }),
  storage: createElectronStorage(),
  timeout: 0, // The code base checks for falsy, so 0 disables
  whitelist: [
    'blockchains',
    'pending',
    'sessions',
    'settings',
    'storage',
    'wallet',
    'wallets',
  ]
};

export default persistConfig;

function updateBlockchainData(blockchains, chainId, keysToUpdate) {
  const chainToUpdate = blockchains.find((blockchain) => blockchain._id === chainId);

  if (!chainToUpdate) {
    return blockchains;
  }

  const updatedBlockchain = {
    ...chainToUpdate,
    ...keysToUpdate,
  };

  const allOtherChains = blockchains.filter((blockchain) => blockchain._id !== chainId);

  return allOtherChains.concat(updatedBlockchain);
}
