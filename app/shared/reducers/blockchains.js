import { partition } from 'lodash';

import * as types from '../actions/types';

const initialState = [
  {
    "_id": "eos-mainnet",
    "chainId": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    "keyPrefix": "EOS",
    "name": "EOS",
    "node": "https://eos.greymass.com",
    "supportedContracts": [
      "customtokens",
      "producerinfo",
      "proposals",
      "regproxyinfo"
    ],
    "symbol": "EOS",
    "testnet": false
  },
  {
    "_id": "eos-testnet-jungle",
    "chainId": "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca",
    "keyPrefix": "EOS",
    "name": "Jungle (EOS)",
    "node": "http://jungle.cryptolions.io:18888",
    "supportedContracts": [
    ],
    "symbol": "EOS",
    "testnet": true
  },
  {
    "_id": "eos-testnet-cryptokylin",
    "chainId": "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    "keyPrefix": "EOS",
    "name": "CryptoKylin (EOS)",
    "node": "https://kylin.eoscanada.com:443",
    "supportedContracts": [
    ],
    "symbol": "EOS",
    "testnet": true
  },
  {
    "_id": "insights-mainnet",
    "chainId": "b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664",
    "keyPrefix": "EOS",
    "name": "Insights",
    "node": "https://ireland-history.insights.network",
    "supportedContracts": [
    ],
    "symbol": "INSTAR",
    "testnet": true
  },
  {
    "_id": "telos-mainnet",
    "chainId": "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
    "keyPrefix": "EOS",
    "name": "Telos",
    "node": "https://telos.greymass.com",
    "supportedContracts": [
    ],
    "symbol": "TLOS",
    "testnet": false
  },
  {
    "_id": "telos-testnet",
    "chainId": "e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3",
    "keyPrefix": "EOS",
    "name": "Telos",
    "node": "https://api.eos.miami:17441",
    "supportedContracts": [
    ],
    "symbol": "TLOS",
    "testnet": true
  }
];

export default function blockchains(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return [...initialState];
    }
    case types.SYSTEM_BLOCKCHAINS_ENSURE: {
      const [existing, others] = partition(state, {
        chainId: action.payload.chainId,
      });
      // If this blockchain doesn't exist in state, add it as an unknown entry that can be edited later
      if (!existing.length) {
        return [{
          _id: `unknown-${action.payload.chainId}`,
          chainId: action.payload.chainId,
          keyPrefix: 'EOS',
          name: `Unknown (${action.payload.chainId.substr(0, 5)})`,
          node: action.payload.node,
          supportedContracts: [],
          symbol: 'EOS',
          testnet: false
        }, ...others];
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
