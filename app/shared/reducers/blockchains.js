import { partition, unionBy } from 'lodash';

import * as types from '../actions/types';

const knownChains = [
  {
    _id: 'snax-testnet',
    chainId: '56be9cbec04d021da6aee34327ff3a62c127b0b464fb72091001e285fc6c4b44',
    keyPrefix: 'SNAX',
    name: 'SNAX',
    node: 'https://testnetcdn.snax.one',
    supportedContracts: [],
    symbol: 'SNAX',
    testnet: true,
  },
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
        chainId: action.payload.chainId,
      });

      // If this blockchain doesn't exist in state,
      // add it as an unknown entry that can be edited later
      // if (!existing.length) {
      //   return [
      //     {
      //       _id: `unknown-${action.payload.chainId}`,
      //       chainId: action.payload.chainId,
      //       keyPrefix: 'EOS',
      //       name: `Unknown (${action.payload.chainId.substr(0, 5)})`,
      //       node: action.payload.node,
      //       supportedContracts: [],
      //       symbol: 'EOS',
      //       testnet: false,
      //     },
      //     ...others,
      //   ];
      // }
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
        chainId: info.chain_id,
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
          testnet: false,
        };
      }
      return [modified, ...others];
    }
    default: {
      return state;
    }
  }
}
