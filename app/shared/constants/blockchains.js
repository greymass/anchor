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
    chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
    defaultNode: 'https://api.eos.miami:17441',
    key: 'telos-mainnet',
    name: 'Telos',
    symbol: 'TLOS',
    keyPrefix: 'EOS',
    supportedContracts: []
  },
  {
    chainId: 'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664',
    defaultNode: 'https://ireland-history.insights.network',
    key: 'insights-mainnet',
    name: 'Insights Mainnet',
    symbol: 'INSTAR',
    keyPrefix: 'EOS',
    supportedContracts: []
  }
];

export default blockchains;
