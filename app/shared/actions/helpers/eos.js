const Eos = require('eosjs');

export default function eos(state) {
  const { chain, keys, settings } = state;
  return Eos.Localnet({
    chainId: chain.chain_id,
    expireInSeconds: 60,
    httpEndpoint: settings.node,
    keyProvider: keys.key
  });
}
