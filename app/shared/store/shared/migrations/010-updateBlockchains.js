import { uniq } from 'lodash';

const update = (blockchains) => {
  // If prior state had no array, return one
  if (!blockchains) return [];
  // Otherwise update it
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    // Ensure array exists for value
    if (!chain.excludeFeatures) {
      chain.excludeFeatures = [];
    }
    // If this is the BEOS chain, add defaults.
    if (chain.chainId === '50f1cee2e3750f473e673049c1b828ec10e10eb96c7211a91cc2bd29ae94c6dd') {
      // Disable RAM Buy/Sell, and Token Staking
      ['rambuy', 'ramsell', 'tokenstaking'].forEach((feature) => {
        if (!chain.excludeFeatures.includes(feature)) {
          chain.excludeFeatures.push(feature);
        }
      });
    }
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export { update };
