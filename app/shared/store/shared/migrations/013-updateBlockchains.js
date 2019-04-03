const update = (blockchains) => {
  const newBlockchains = [];

  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    if (chain.chainId === 'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4') {
      chain._id = 'beos-testnet-2';
      chain.testnet = true;
      chain.node = 'https://api.testnet.beos.world';
    }
    if (chain.chainId === '50f1cee2e3750f473e673049c1b828ec10e10eb96c7211a91cc2bd29ae94c6dd') {
      chain.testnet = true;
      chain._id = 'beos-testnet-1';
    }
    // Exclude any old beos-mainnet entry, to allow for recreation
    if (chain._id !== 'beos-mainnet') {
      newBlockchains.push(chain);
    }
  });

  return newBlockchains;
};

export default { update };
