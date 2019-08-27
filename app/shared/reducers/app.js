import * as types from '../actions/types';

const contractBasedFeatures = [
  // Used in retrieval of EOS Token information
  // https://github.com/greymass/customtokens
  'customtokens',
  // Used to retrieve USD price feeds
  // https://github.com/eostitan/delphioracle
  'delphioracle',
  // Used in retrieval of EOS Block Producer information
  // https://github.com/greymass/producerjson
  'producerinfo',
  // Used in retrieval of EOS Referendum Proposals
  // https://github.com/eoscanada/eosio.forum
  'proposals',
  // Used in retrieval of EOS Proxies information
  // https://github.com/AlohaEOS/eos-proxyinfo
  'regproxyinfo',
  // BEOS features for exchanging BTS <-> BEOS
  'beosexchange',
  // REX Smart Contract
  // https://github.com/EOSIO/eosio.contracts
  'rex',
];

const initialState = {
  constants: {},
  download: undefined,
  init: false,
  features: contractBasedFeatures
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      return Object.assign({}, state, {
        init: true
      });
    }
    case types.APP_UPDATE_DOWNLOAD_PROGRESS: {
      return Object.assign({}, state, {
        download: action.payload
      });
    }
    case types.SYSTEM_GETCONSTANTS_SUCCESS: {
      return Object.assign({}, state, {
        constants: action.payload.data
      });
    }
    case types.SYSTEM_GETCONSTANTS_FAILURE: {
      return Object.assign({}, initialState);
    }
    default: {
      return state;
    }
  }
}
