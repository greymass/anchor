const update = (blockchains) => {
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    if (chain.chainId === 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906') {
      // If this is the EOS mainnet chain, change defaults.
      chain.supportedContracts = [];
      ['crosschaintransfer', 'customtokens', 'producerinfo', 'proposals', 'regproxyinfo', 'rex'].forEach((feature) => {
        chain.supportedContracts.push(feature);
      });
    }
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export default { update };
