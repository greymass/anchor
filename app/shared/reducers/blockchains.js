import { find, partition, unionBy } from 'lodash';

import * as types from '../actions/types';

const supportedContracts = [
  {
    // 'beos-mainnet'
    chainId: 'cbef47b0b26d2b8407ec6a6f91284100ec32d288a39d4b4bbd49655f7c484112',
    supportedContracts: ['beosexchange', 'bidname', 'producerinfo', 'regproxyinfo'],
  },
  {
    // 'beos-testnet-2'
    chainId: 'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4',
    supportedContracts: ['beosexchange', 'bidname', 'producerinfo', 'regproxyinfo'],
  },
  {
    // 'bos-mainnet'
    chainId: 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86',
    supportedContracts: ['bidname', 'regproxyinfo'],
  },
  {
    // 'eos-mainnet'
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    supportedContracts: [
      'bidname',
      'crosschaintransfer',
      'customtokens',
      'delphioracle',
      'greymassfuel',
      'producerinfo',
      'proposals',
      'rex',
      'regproxyinfo'
    ],
  },
  {
    // 'eos-testnet-jungle'
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    supportedContracts: [
      'bidname',
      'greymassfuel',
    ],
  },
  {
    // 'eos-testnet-cryptokylin'
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    supportedContracts: ['bidname'],
  },
  {
    // 'insights-mainnet'
    chainId: 'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664',
    supportedContracts: ['bidname'],
  },
  {
    // 'meetone-mainnet'
    chainId: 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422',
    supportedContracts: [],
  },
  {
    // 'telos-mainnet'
    chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
    supportedContracts: ['bidname'],
  },
  {
    // 'telos-testnet'
    chainId: 'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3',
    supportedContracts: ['bidname'],
  },
  {
    // 'worbli-mainnet'
    chainId: '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f',
    supportedContracts: [],
  },
];

const knownChains = [
  {
    _id: 'beos-mainnet',
    chainId: 'cbef47b0b26d2b8407ec6a6f91284100ec32d288a39d4b4bbd49655f7c484112',
    keyPrefix: 'EOS',
    name: 'BEOS',
    node: 'https://api.beos.world',
    symbol: 'BEOS',
    testnet: false
  },
  {
    _id: 'beos-testnet-2',
    chainId: 'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4',
    keyPrefix: 'EOS',
    name: 'BEOS',
    node: 'https://api.testnet.beos.world',
    symbol: 'BEOS',
    testnet: true
  },
  {
    _id: 'bos-mainnet',
    chainId: 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86',
    keyPrefix: 'EOS',
    name: 'BOS',
    node: 'https://hapi.bos.eosrio.io',
    symbol: 'BOS',
    testnet: false
  },
  {
    _id: 'eos-mainnet',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    keyPrefix: 'EOS',
    name: 'EOS',
    node: 'https://eos.greymass.com',
    symbol: 'EOS',
    testnet: false
  },
  {
    _id: 'eos-testnet-jungle-2',
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    keyPrefix: 'EOS',
    name: 'Jungle (EOS)',
    node: 'https://jungle.greymass.com',
    symbol: 'EOS',
    testnet: true
  },
  {
    _id: 'eos-testnet-cryptokylin',
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    keyPrefix: 'EOS',
    name: 'CryptoKylin (EOS)',
    node: 'https://kylin.eoscanada.com:443',
    symbol: 'EOS',
    testnet: true
  },
  // {
  //   _id: 'eosforce-mainnet',
  //   chainId: 'bd61ae3a031e8ef2f97ee3b0e62776d6d30d4833c8f7c1645c657b149151004b',
  //   keyPrefix: 'EOS',
  //   name: 'EOSForce',
  //   node: 'https://w1.eosforce.cn',
  //   ],
  //   symbol: 'EOS',
  //   testnet: false
  // },
  {
    _id: 'fio',
    chainId: '21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c',
    keyPrefix: 'FIO',
    name: 'FIO',
    node: 'https://fio.greymass.com',
    voteDecay: true,
    supportedContracts: [],
    stakedResources: false,
    symbol: 'FIO',
    systemContract: 'fio',
    testnet: false,
    tokenContract: 'fio.token',
    tokenPrecision: 8,
    votePrecision: 9,
  },
  {
    _id: 'fio-testnet-3',
    chainId: 'b20901380af44ef59c5918439a1f9a41d83669020319a80574b804a5f95cbd7e',
    keyPrefix: 'FIO',
    name: 'FIO (Testnet 3)',
    node: 'https://fiotestnet.greymass.com',
    voteDecay: true,
    supportedContracts: [],
    stakedResources: false,
    symbol: 'FIO',
    systemContract: 'fio',
    testnet: true,
    tokenContract: 'fio.token',
    tokenPrecision: 8,
    votePrecision: 9,
  },
  {
    _id: 'insights-mainnet',
    chainId: 'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664',
    keyPrefix: 'EOS',
    name: 'Insights',
    node: 'https://instar.greymass.com',
    supportedContracts: ['bidname'],
    symbol: 'INSTAR',
    testnet: false
  },
  {
    _id: 'lynx-mainnet',
    chainId: 'b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573',
    keyPrefix: 'EOS',
    name: 'Lynx',
    node: 'https://lynx.greymass.com/',
    symbol: 'LNX',
    testnet: false
  },
  {
    _id: 'lynx-testnet',
    chainId: '0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978',
    keyPrefix: 'EOS',
    name: 'Lynx Testnet',
    node: 'https://lynxtestnet.greymass.com/',
    symbol: 'SYS',
    testnet: true
  },
  {
    _id: 'meetone-mainnet',
    chainId: 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422',
    keyPrefix: 'EOS',
    name: 'MEET.ONE',
    node: 'https://fullnode.meet.one',
    symbol: 'MEETONE',
    testnet: false
  },
  {
    _id: 'remme-testnet',
    chainId: '93ece941df27a5787a405383a66a7c26d04e80182adf504365710331ac0625a7',
    keyPrefix: 'EOS',
    name: 'Remme Testnet',
    node: 'https://testchain.remme.io/',
    symbol: 'REM',
    testnet: true
  },
  {
    _id: 'proton-testnet',
    chainId: 'e0a0743522e90db0a1802632b90fc48272957f9c32e4d35639d769546c10b763',
    keyPrefix: 'EOS',
    name: 'Proton Testnet',
    node: 'https://protontestnet.greymass.com/',
    symbol: 'XPT',
    testnet: true
  },
  {
    _id: 'telos-mainnet',
    chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
    keyPrefix: 'EOS',
    name: 'Telos',
    node: 'https://telos.greymass.com',
    voteDecay: true,
    symbol: 'TLOS',
    testnet: false,
  },
  {
    _id: 'telos-testnet-2',
    chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
    keyPrefix: 'EOS',
    name: 'Telos',
    node: 'https://testnet.eos.miami',
    voteDecay: true,
    symbol: 'TLOS',
    testnet: true
  },
  {
    _id: 'worbli-mainnet',
    chainId: '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f',
    keyPrefix: 'EOS',
    name: 'Worbli',
    node: 'https://api.worbli.io',
    symbol: 'WBI',
    testnet: false
  },
  {
    _id: 'wax-mainnet',
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    keyPrefix: 'EOS',
    name: 'WAX',
    node: 'https://wax.greymass.com',
    supportedContracts: [],
    symbol: 'WAX',
    testnet: false,
    tokenPrecision: 8,
    voteDecayPeriod: 13,
  },
  {
    _id: 'wax-testnet',
    chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
    keyPrefix: 'EOS',
    name: 'WAX',
    node: 'https://waxtestnet.greymass.com',
    supportedContracts: [],
    symbol: 'WAX',
    testnet: true,
    tokenPrecision: 8,
    voteDecayPeriod: 13,
  }
];

const initialState = [...knownChains];

export default function blockchains(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      // When the app initializes, merge any unknown chains into state
      const amendChains = unionBy(state, initialState, 'chainId');
      const mergeContracts = _(amendChains).keyBy('chainId')
        .merge(_.keyBy(supportedContracts, 'chainId'))
        .values().value();
      return mergeContracts;
    }
    case types.RESET_ALL_STATES: {
      return [...initialState];
    }
    case types.SYSTEM_BLOCKCHAINS_SET_SETTING: {
      const [selected, others] = partition(state, {
        chainId: action.payload.chainId,
      });
      if (selected && selected.length > 0) {
        const modified = Object.assign({}, selected[0], {
          [action.payload.key]: action.payload.value
        });
        return [modified, ...others];
      }
      return state;
    }
    case types.SYSTEM_BLOCKCHAINS_UPDATE: {
      const [, others] = partition(state, {
        chainId: action.payload.chainId,
      });
      const known = find(knownChains, { chainId: action.payload.chainId });
      const blockchain = Object.assign({}, action.payload, known, {
        node: action.payload.node
      });

      return [blockchain, ...others];
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
