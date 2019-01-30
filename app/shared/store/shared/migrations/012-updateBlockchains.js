const update = (blockchains) => {
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    // If this is the BEOS id, change defaults.
    if (chain._id === 'beos-testnet') {
      chain.node = 'https://api.beos.world';
      chain.chainId = 'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4';
    }
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export default { update };
