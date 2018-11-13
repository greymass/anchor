const blockchains = [
  {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    defaultNode: 'https://eos.greymass.com',
    key: 'eos-mainnet',
    name: 'EOS Mainnet',
    symbol: 'EOS',
    keyPrefix: 'EOS',
    supportedContracts: ['customtokens', 'producerinfo', 'proposals', 'regproxyinfo']
  },
  {
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
    defaultNode: 'http://jungle.cryptolions.io:18888',
    key: 'jungle-testnet',
    name: 'Jungle Testnet',
    symbol: 'EOS',
    keyPrefix: 'EOS',
    supportedContracts: []
  },
  {
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    defaultNode: 'https://kylin.eoscanada.com:443',
    key: 'cryptokylin-testnet',
    name: 'CryptoKylin Testnet',
    symbol: 'EOS',
    supportedContracts: []
  },
  {
    chainId: '6c8aacc339bf1567743eb9c8ab4d933173aa6dca4ae6b6180a849c422f5bb207',
    defaultNode: 'https://api.eos.miami:17441',
    key: 'telos-testnet',
    name: 'Telos Testnet',
    symbol: 'TLOS',
    keyPrefix: 'EOS',
    supportedContracts: []
  },
  {
    chainId: 'f954e87e8fe791d27b018513a6f67165c0227eadc2d729196e827ee007128677',
    defaultNode: 'https://shannon.insights.network',
    key: 'insight-testnet',
    name: 'Insight Testnet',
    symbol: 'INSTAR',
    keyPrefix: 'EOS',
    supportedContracts: []
  }
];

export default blockchains;
