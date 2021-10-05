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
      'powerup',
      'rex',
      'regproxyinfo',
    ],
  },
  {
    // 'eos-testnet-jungle-2'
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    supportedContracts: [
      'bidname',
      'greymassfuel',
    ],
  },
  {
    // 'eos-testnet-jungle-3'
    chainId: '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
    supportedContracts: [
      'bidname',
      'greymassfuel',
      'powerup',
      'rex',
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
    supportedContracts: [
      'bidname',
      'greymassfuel',
      'rex',
    ],
  },
  {
    // 'telos-testnet'
    chainId: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
    supportedContracts: ['bidname'],
  },
  {
    // 'uxnetwork-mainnet'
    chainId: '8fc6dce7942189f842170de953932b1f66693ad3788f766e777b6f9d22335c02',
    supportedContracts: [],
  },
  {
    chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
    supportedContracts: [
      'producerinfo',
      'delphioracle',
      'greymassfuel',
    ],
  },
  {
    // 'worbli-mainnet'
    chainId: '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f',
    supportedContracts: [],
  },
];

const defaultValues = {
  keyPrefix: 'EOS',
  testnet: false,
};

// Intentionally formatting with JSON styles for easy publishing.
/* eslint-disable */
const knownChains = [
  {
    "_id": "beos-mainnet",
    "chainId": "cbef47b0b26d2b8407ec6a6f91284100ec32d288a39d4b4bbd49655f7c484112",
    "name": "BEOS",
    "node": "https://api.beos.world",
    "symbol": "BEOS"
  },
  {
    "_id": "beos-testnet-2",
    "chainId": "b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4",
    "name": "BEOS (Testnet)",
    "node": "https://api.testnet.beos.world",
    "symbol": "BEOS",
    "testnet": true
  },
  {
    "_id": "bos-mainnet",
    "chainId": "d5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86",
    "name": "BOS",
    "node": "https://bos.eosn.io",
    "symbol": "BOS"
  },
  {
    "_id": "eos-mainnet",
    "chainId": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    "name": "EOS",
    "node": "https://eos.greymass.com",
    "symbol": "EOS"
  },
  {
    "_id": "eos-testnet-jungle-2",
    "chainId": "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
    "name": "Jungle 2 (EOS Testnet)",
    "node": "https://jungle.greymass.com",
    "symbol": "EOS",
    "testnet": true
  },
  {
    "_id": "eos-testnet-jungle-3",
    "chainId": "2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840",
    "name": "Jungle 3 (EOS Testnet)",
    "node": "https://jungle3.greymass.com",
    "symbol": "EOS",
    "testnet": true
  },
  {
    "_id": "eos-testnet-cryptokylin",
    "chainId": "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    "name": "CryptoKylin (EOS Testnet)",
    "node": "https://kylin.eosn.io",
    "symbol": "EOS",
    "testnet": true
  },
  {
    "_id": "europechain",
    "chainId": "f778f7d2f124b110e0a71245b310c1d0ac1a0edd21f131c5ecb2e2bc03e8fe2e",
    "keyPrefix": "EOS",
    "name": "Europechain",
    "node": "https://api.xec.cryptolions.io",
    "symbol": "XEC",
  },
  {
    "_id": "fio",
    "chainId": "21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c",
    "keyPrefix": "FIO",
    "name": "FIO",
    "node": "https://fio.greymass.com",
    "voteDecay": false,
    "stakedResources": false,
    "symbol": "FIO",
    "systemContract": "fio",
    "tokenContract": "fio.token",
    "tokenPrecision": 8,
    "votePrecision": 9
  },
  {
    "_id": "fio-testnet-3",
    "chainId": "b20901380af44ef59c5918439a1f9a41d83669020319a80574b804a5f95cbd7e",
    "keyPrefix": "FIO",
    "name": "FIO (Testnet)",
    "node": "https://fiotestnet.greymass.com",
    "voteDecay": false,
    "stakedResources": false,
    "symbol": "FIO",
    "systemContract": "fio",
    "testnet": true,
    "tokenContract": "fio.token",
    "tokenPrecision": 8,
    "votePrecision": 9
  },
  {
    "_id": "insights-mainnet",
    "chainId": "b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664",
    "name": "Insights",
    "node": "https://instar.greymass.com",
    "symbol": "INSTAR"
  },
  {
    "_id": "lynx-mainnet",
    "chainId": "b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573",
    "name": "Lynx",
    "node": "https://lynx.greymass.com/",
    "symbol": "LNX"
  },
  {
    "_id": "lynx-testnet",
    "chainId": "0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978",
    "name": "Lynx (Testnet)",
    "node": "https://lynxtestnet.greymass.com/",
    "symbol": "SYS",
    "testnet": true
  },
  {
    "_id": "meetone-mainnet",
    "chainId": "cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422",
    "name": "MEET.ONE",
    "node": "https://meetone.eosn.io",
    "symbol": "MEETONE"
  },
  {
    "_id": "remme-testnet",
    "chainId": "93ece941df27a5787a405383a66a7c26d04e80182adf504365710331ac0625a7",
    "name": "Remme (Testnet)",
    "node": "https://testchain.remme.io/",
    "symbol": "REM",
    "testnet": true
  },
  {
    "_id": "proton-mainnet",
    "chainId": "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0",
    "name": "Proton",
    "node": "https://proton.greymass.com/",
    "stakedResources": false,
    "symbol": "XPR"
  },
  {
    "_id": "proton-testnet",
    "chainId": "71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd",
    "name": "Proton (Testnet)",
    "node": "https://protontestnet.greymass.com/",
    "stakedResources": false,
    "symbol": "XPR",
    "testnet": true
  },
  {
    "_id": "telos-mainnet",
    "chainId": "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
    "name": "Telos",
    "node": "https://telos.greymass.com",
    "voteDecay": false,
    "symbol": "TLOS"
  },
  {
    "_id": "telos-testnet-2",
    "chainId": "1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f",
    "name": "Telos (Testnet)",
    "node": "https://telostestnet.greymass.com",
    "voteDecay": false,
    "symbol": "TLOS",
    "testnet": true
  },
  {
    "_id": "uxnetwork-mainnet",
    "chainId": "8fc6dce7942189f842170de953932b1f66693ad3788f766e777b6f9d22335c02",
    "chainRamSymbol": "UTXRAM",
    "name": "UX Network",
    "node": "https://explorer.uxnetwork.io/",
    "symbol": "UTX",
    "tokenPrecision": 4,
  },
  {
    "_id": "worbli-mainnet",
    "chainId": "73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f",
    "name": "Worbli",
    "node": "https://api.worbli.io",
    "symbol": "WBI"
  },
  {
    "_id": "wax-mainnet",
    "chainId": "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    "name": "WAX",
    "node": "https://wax.greymass.com",
    "symbol": "WAX",
    "tokenPrecision": 8,
    "voteDecayPeriod": 13
  },
  {
    "_id": "wax-testnet",
    "chainId": "f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12",
    "name": "WAX (Testnet)",
    "node": "https://waxtestnet.greymass.com",
    "symbol": "WAX",
    "testnet": true,
    "tokenPrecision": 8,
    "voteDecayPeriod": 13
  }
];
/* eslint-enable */

const initialState = [...knownChains];

export default function blockchains(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      // When the app initializes, merge any unknown chains into state
      const mergedChains = unionBy(state, initialState, 'chainId');
      // Then merge contract support
      const mergedContracts = mergeSupportedContracts(mergedChains);
      return mergedContracts;
    }
    case types.RESET_ALL_STATES: {
      return mergeSupportedContracts(initialState);
    }
    case types.SYSTEM_BLOCKCHAINS_RESYNC: {
      return resync(state, action.payload.constants);
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
      const blockchain = Object.assign({}, known, action.payload, {
        node: action.payload.node || known.node
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

function mergeSupportedContracts(state) {
  const merged = state.map((chain) => {
    const matching = find(supportedContracts, { chainId: chain.chainId });
    const merging = Object.assign({}, defaultValues, chain, {
      supportedContracts: (matching) ? matching.supportedContracts : [],
    });
    return merging;
  });
  return merged;
}

function resync(state, constants = {}) {
  const resynced = [];
  // Resync all known chains
  state.forEach((chain) =>
    resynced.push(resyncMerge(chain, constants)));
  // Resync all potential chains from constants
  if (constants && constants.blockchains && constants.blockchains.length > 0) {
    constants.blockchains
      // Filter out chains we already have a definition for
      .filter((b) => !find(resynced, { chainId: b.chainId }))
      .forEach((chain) =>
        resynced.push(resyncMerge(chain, constants)));
  }
  return mergeSupportedContracts(resynced);
}

function resyncMerge(chain, constants) {
  // Loaded definition from on-chain contract
  const loaded = (constants && constants.blockchains)
    ? find(constants.blockchains, { chainId: chain.chainId })
    : {};
  // Predefined here in this file
  const predefined = find(knownChains, { chainId: chain.chainId });
  /*
    Create a merged object with the following priority:

      1st - Ensure the custom node specified is retained
      2nd - Use any values found within the constants from the smart contract
      3rd - Use any values predefined in this file from the known chain
      4th - the default values of any chain
  */
  const merging = Object.assign({}, defaultValues, predefined, loaded, {
    node: chain.node, // Retain any custom node settings for the chain
  });
  return merging;
}
