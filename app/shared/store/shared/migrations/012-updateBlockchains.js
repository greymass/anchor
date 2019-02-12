const update = (blockchains) => {
  const newBlockchains = [];
  
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    // Adding bidname supportedContracts for all blockchains except for

    if (chain.chainId !== '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f') {
      chain.supportedContracts.push('bidname');
    }

    newBlockchains.push(chain);
  });

  return newBlockchains;
};

export default { update };
