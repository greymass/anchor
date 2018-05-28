const Eos = require('eosjs');

export default function eos(connection) {
  return Eos.Localnet(connection);
}
