const update = (blockchains) => {
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    // If this is the BEOS chain, change defaults.
    if (chain.chainId === '50f1cee2e3750f473e673049c1b828ec10e10eb96c7211a91cc2bd29ae94c6dd') {
      chain.node = 'https://api.beos.world';
      chain.supportedContracts = [];
      ['beosexchange', 'customtokens', 'producerinfo', 'proposals', 'regproxyinfo'].forEach((feature) => {
        chain.supportedContracts.push(feature);
      }); // If this is the EOS mainnet chain, change defaults.
    } else if (chain.chainId === 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906') {
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
