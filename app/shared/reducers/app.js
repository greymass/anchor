import * as types from '../actions/types';


const contractBasedFeatures = [
  // Used in retrieval of EOS Token information
  // https://github.com/greymass/customtokens
  'customtokens',
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
  'beosexchange'
];

const initialState = {
  constants: {},
  download: undefined,
  features: contractBasedFeatures
};

export default function app(state = initialState, action) {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
}
