const blockchains = [
  {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    defaultNode: 'https://eos.greymass.com',
    key: 'eos-mainnet',
    name: 'EOS Mainnet',
    symbol: 'EOS',
    supportedContracts: ['customtokens', 'producerinfo', 'proposals', 'regproxyinfo']
  },
  {
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
    defaultNode: 'http://jungle.cryptolions.io:18888',
    key: 'jungle-testnet',
    name: 'Jungle Testnet',
    symbol: 'EOS',
    supportedContracts: []
  },
  {
    chainId: '6c8aacc339bf1567743eb9c8ab4d933173aa6dca4ae6b6180a849c422f5bb207',
    defaultNode: 'https://api.eos.miami:17441',
    key: 'telos-testnet',
    name: 'Telos Testnet',
    symbol: 'TLOS',
    supportedContracts: []
  }
];

export default blockchains;
