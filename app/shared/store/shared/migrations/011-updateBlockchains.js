const update = (blockchains) => {
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    if (chain.chainId === '50f1cee2e3750f473e673049c1b828ec10e10eb96c7211a91cc2bd29ae94c6dd') {
      // If this is the BEOS chain, change defaults.
      chain.node = 'https://api.beos.world';
      chain.supportedContracts = [];
      ['beosexchange', 'customtokens', 'producerinfo', 'proposals', 'regproxyinfo'].forEach((feature) => {
        chain.supportedContracts.push(feature);
      });
    } else if (chain.chainId === 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906') {
      // If this is the EOS mainnet chain, change defaults.
      chain.supportedContracts = [];
      ['crosschaintransfer', 'customtokens', 'producerinfo', 'proposals', 'regproxyinfo'].forEach((feature) => {
        chain.supportedContracts.push(feature);
      });
    }
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export default { update };
