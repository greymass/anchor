import { createMigrate } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';

const migrations = {};

const persistConfig = {
  key: 'anchor-config',
  version: 1,
  migrate: createMigrate(migrations, { debug: true }),
  storage: createElectronStorage(),
  timeout: 0, // The code base checks for falsy, so 0 disables
  whitelist: [
    'blockchains',
    'settings',
    'storage',
    'wallet',
    'wallets',
  ]
};

export default persistConfig;

function updateBlockchainData(blockchains, chainId, keysToUpdate) {
  const chainToUpdate = blockchains.find((blockchain) => {
    return blockchain._id === chainId;
  });

  if (!chainToUpdate) {
    return blockchains;
  }

  const updatedBlockchain = {
    ...chainToUpdate,
    ...keysToUpdate,
  };

  const allOtherChains = blockchains.filter((blockchain) => {
    return blockchain._id !== chainId;
  });

  return allOtherChains.concat(updatedBlockchain);
}
