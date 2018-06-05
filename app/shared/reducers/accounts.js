import * as types from '../actions/types';

const initialState = {
  __lookups: []
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.GET_ACCOUNT_SUCCESS: {
      const payload_results = action.payload.results
      const net_weight = payload_results.delegated_bandwidth.net_weight
      const cpu_weight = payload_results.delegated_bandwidth.cpu_weight

      payload_results.coins_staked_to_net = parseFloat(net_weight.split(" ")[0]);
      payload_results.coins_staked_to_cpu = parseFloat(cpu_weight.split(" ")[0]);

      return Object.assign({}, state, {
        __updated: Date.now(),
        [action.payload.results.account_name]: payload_results
      });
    }
    case types.GET_ACCOUNT_BY_KEY_SUCCESS: {
      return Object.assign({}, state, {
        __lookups: action.payload.accounts.account_names
      });
    }
    case types.GET_ACCOUNT_BY_KEY_REQUEST:
    case types.GET_ACCOUNT_BY_KEY_FAILURE:
    case types.GET_ACCOUNT_BY_KEY_CLEAR: {
      return Object.assign({}, state, {
        __lookups: []
      });
    }
    default: {
      return state;
    }
  }
}
