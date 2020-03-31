import { createMigrate } from 'redux-persist';
import createElectronStorage from 'redux-persist-electron-storage';

const migrations = {
  2: (state) => {
    let { blockchains } = state;

    blockchains = updateBlockchainData(blockchains, 'fio', {
      votePrecision: 4,
    });

    blockchains = updateBlockchainData(blockchains, 'fio-testnet-3', {
      votePrecision: 4,
    });

    blockchains = updateBlockchainData(blockchains, 'wax-mainnet', {
      voteDecayPeriod: 13,
    });

    blockchains = updateBlockchainData(blockchains, 'telos-mainnet', {
      oneTokenOneVote: true,
    });

    blockchains = updateBlockchainData(blockchains, 'telos-testnet-2', {
      oneTokenOneVote: true,
    });

    // Update the blockchains state.
    return {
      ...state,
      blockchains,
    };
  },
};

const persistConfig = {
  key: 'anchor-config',
  version: 2,
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
