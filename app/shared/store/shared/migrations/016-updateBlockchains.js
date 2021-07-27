const update = (blockchains) => {
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    // Change default API of insights
    if (
      chain.chainId === 'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664'
      && chain.node === 'https://ireland-history.insights.network'
    ) {
      chain.node = 'https://instar.greymass.com';
    }
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export default { update };
