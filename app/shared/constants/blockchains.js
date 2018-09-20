const blockchains = [
  {
    name: 'EOS Mainnet',
    key: 'eos-mainnet',
    prefix: 'EOS',
    defaultNode: 'https://eos.greymass.com',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  },
  {
    name: 'Jungle Testnet',
    key: 'jungle-testnet',
    prefix: 'EOS',
    defaultNode: 'http://jungle.cryptolions.io:18888',
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
  },
  {
    name: 'Telos Testnet',
    key: 'telos-testnet',
    prefix: 'TLOS',
    defaultNode: 'https://api.eos.miami:17441',
    chainId: '6c8aacc339bf1567743eb9c8ab4d933173aa6dca4ae6b6180a849c422f5bb207'
  }
];

export default blockchains;
