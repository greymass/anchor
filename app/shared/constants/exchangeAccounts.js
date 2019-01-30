const defaultExchangeAccounts = [
  'binancecleos',
  'bitfinexdep1',
  'krakenkraken'
];

// exchange accounts by chain id
// if chain id not specified, default will be used
const exchangeAccounts = {
  default: defaultExchangeAccounts,
  'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4': []
}

export default (chainId = null) => chainId && exchangeAccounts.hasOwnProperty(chainId) ? exchangeAccounts[chainId] : exchangeAccounts.default;
