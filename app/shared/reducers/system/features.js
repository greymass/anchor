import * as types from '../../actions/types';

const initialState = {
  endpoints: [
    '/v1/chain/abi_bin_to_json',
    '/v1/chain/abi_json_to_bin',
    '/v1/chain/get_abi',
    '/v1/chain/get_account',
    '/v1/chain/get_block',
    '/v1/chain/get_block_header_state',
    '/v1/chain/get_code',
    '/v1/chain/get_currency_balance',
    '/v1/chain/get_currency_stats',
    '/v1/chain/get_info',
    '/v1/chain/get_producers',
    '/v1/chain/get_raw_code_and_abi',
    '/v1/chain/get_required_keys',
    '/v1/chain/get_table_rows',
  ]
};

export default function features(state = initialState, action) {
  switch (action.type) {
    case types.VALIDATE_NODE_SUCCESS:
    case types.FEATURES_AVAILABLE_ENDPOINTS_FAILURE:
    case types.FEATURES_AVAILABLE_ENDPOINTS_PENDING: {
      return Object.assign({}, initialState);
    }
    case types.FEATURES_AVAILABLE_ENDPOINTS_SUCCESS: {
      return Object.assign({}, state, {
        endpoints: action.payload
      });
    }
    default: {
      return state;
    }
  }
}
