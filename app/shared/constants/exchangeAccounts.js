const defaultExchangeAccounts = [
  'binancecleos',
  'bitfinexdep1',
  'krakenkraken'
];

// exchange accounts by chain id
// if chain id not specified, default will be used 
const exchangeAccounts = {
  default: defaultExchangeAccounts,
  '50f1cee2e3750f473e673049c1b828ec10e10eb96c7211a91cc2bd29ae94c6dd': []
}

export default (chainId = null) => chainId && exchangeAccounts.hasOwnProperty(chainId) ? exchangeAccounts[chainId] : exchangeAccounts.default;
