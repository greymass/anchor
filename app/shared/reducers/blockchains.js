import { partition, unionBy } from 'lodash';

import * as types from '../actions/types';

const knownChains = [
  {
    _id: 'beos-testnet',
    chainId: '50f1cee2e3750f473e673049c1b828ec10e10eb96c7211a91cc2bd29ae94c6dd',
    keyPrefix: 'EOS',
    name: 'BEOS',
    node: 'https://api.beos.world',
    supportedContracts: [
      'beosexchange',
      'customtokens',
      'producerinfo',
      'proposals',
      'regproxyinfo',
    ],
    symbol: 'BEOS',
    testnet: false
  },
  {
    _id: 'bos-mainnet',
    chainId: 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86',
    keyPrefix: 'BOS',
    name: 'BOS',
    node: 'https://hapi.bos.eosrio.io',
    supportedContracts: [
      'regproxyinfo',
    ],
    symbol: 'BOS',
    testnet: false
  },
  {
    _id: 'eos-mainnet',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    keyPrefix: 'EOS',
    name: 'EOS',
    node: 'https://eos.greymass.com',
    supportedContracts: [
      'crosschaintransfer',
      'customtokens',
      'producerinfo',
      'proposals',
      'regproxyinfo'
    ],
    symbol: 'EOS',
    testnet: false
  },
  {
    _id: 'eos-testnet-jungle',
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
    keyPrefix: 'EOS',
    name: 'Jungle (EOS)',
    node: 'http://jungle.cryptolions.io:18888',
    supportedContracts: [],
    symbol: 'EOS',
    testnet: true
  },
  {
    _id: 'eos-testnet-cryptokylin',
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    keyPrefix: 'EOS',
    name: 'CryptoKylin (EOS)',
    node: 'https://kylin.eoscanada.com:443',
    supportedContracts: [],
    symbol: 'EOS',
    testnet: true
  },
  // {
  //   _id: 'eosforce-mainnet',
  //   chainId: 'bd61ae3a031e8ef2f97ee3b0e62776d6d30d4833c8f7c1645c657b149151004b',
  //   keyPrefix: 'EOS',
  //   name: 'EOSForce',
  //   node: 'https://w1.eosforce.cn',
  //   supportedContracts: [
  //   ],
  //   symbol: 'EOS',
  //   testnet: false
  // },
  {
    _id: 'insights-mainnet',
    chainId: 'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664',
    keyPrefix: 'EOS',
    name: 'Insights',
    node: 'https://ireland-history.insights.network',
    supportedContracts: [],
    symbol: 'INSTAR',
    testnet: false
  },
  {
    _id: 'telos-mainnet',
    chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
    keyPrefix: 'EOS',
    name: 'Telos',
    node: 'https://telos.greymass.com',
    supportedContracts: [],
    symbol: 'TLOS',
    testnet: false
  },
  {
    _id: 'telos-testnet',
    chainId: 'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3',
    keyPrefix: 'EOS',
    name: 'Telos',
    node: 'https://api.eos.miami:17441',
    supportedContracts: [],
    symbol: 'TLOS',
    testnet: true
  },
  {
    _id: 'worbli-mainnet',
    chainId: '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f',
    keyPrefix: 'EOS',
    name: 'Worbli',
    node: 'https://api.worbli-mainnet.eoscalgary.io',
    supportedContracts: [],
    symbol: 'WBI',
    testnet: false
  }
];

const initialState = [...knownChains];

export default function blockchains(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      // When the app initializes, merge any unknown _ids (new chains) into state
      return unionBy(state, initialState, '_id');
    }
    case types.RESET_ALL_STATES: {
      return [...initialState];
    }
    case types.SYSTEM_BLOCKCHAINS_UPDATE: {
      const [, others] = partition(state, {
        chainId: action.payload.chainId,
      });
      return [action.payload, ...others];
    }
    case types.SYSTEM_BLOCKCHAINS_ENSURE: {
      const [existing, others] = partition(state, {
        chainId: action.payload.chainId
      });
      // If this blockchain doesn't exist in state,
      // add it as an unknown entry that can be edited later
      if (!existing.length) {
        return [
          {
            _id: `unknown-${action.payload.chainId}`,
            chainId: action.payload.chainId,
            keyPrefix: 'EOS',
            name: `Unknown (${action.payload.chainId.substr(0, 5)})`,
            node: action.payload.node,
            supportedContracts: [],
            symbol: 'EOS',
            testnet: false
          },
          ...others
        ];
      }
      return state;
    }
    // Upon node validation for a given chain, check if it should be set as the default
    case types.VALIDATE_NODE_SUCCESS: {
      const { info, node, saveAsDefault } = action.payload;
      // If saveAsDefault is false, ignore update
      if (!saveAsDefault) {
        return state;
      }
      const [existing, others] = partition(state, {
        chainId: info.chain_id
      });
      let modified;
      if (existing.length) {
        // If an existing entry for this chain exists, edit it
        modified = Object.assign({}, existing[0]);
        modified.node = node;
      } else {
        // Otherwise create a new entry for it
        modified = {
          _id: `unknown-${info.chain_id}`,
          chainId: info.chain_id,
          keyPrefix: 'EOS',
          name: `Unknown (${info.chain_id.substr(0, 5)})`,
          node,
          supportedContracts: [],
          symbol: 'EOS',
          testnet: false
        };
      }
      return [modified, ...others];
    }
    default: {
      return state;
    }
  }
}
