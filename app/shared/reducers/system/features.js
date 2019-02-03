import * as types from '../../actions/types';

const initialState = {
  endpoints: {
    '/v1/chain/abi_bin_to_json': true,
    '/v1/chain/abi_json_to_bin': true,
    '/v1/chain/get_abi': true,
    '/v1/chain/get_account': true,
    '/v1/chain/get_accounts': false,
    '/v1/chain/get_block': true,
    '/v1/chain/get_block_header_state': true,
    '/v1/chain/get_blocks': false,
    '/v1/chain/get_code': false,
    '/v1/chain/get_currency_balance': true,
    '/v1/chain/get_currency_balances': false,
    '/v1/chain/get_currency_stats': true,
    '/v1/chain/get_info': true,
    '/v1/chain/get_producers': true,
    '/v1/chain/get_raw_code_and_abi': true,
    '/v1/chain/get_required_keys': true,
    '/v1/chain/get_table_rows': true,
    '/v1/history/get_actions': false,
    '/v1/history/get_controlled_accounts': false,
    '/v1/history/get_key_accounts': false,
    '/v1/history/get_transaction': false
  }
};

export default function features(state = initialState, action) {
  switch (action.type) {
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
