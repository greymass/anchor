import * as types from '../actions/types';

const initialState = {
  __contracts: {
    EOS: 'eosio.token'
  }
};

export default function balances(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.CLEAR_BALANCE_CACHE:
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.GET_ACCOUNT_BALANCE_SUCCESS: {
      const {
        account_name,
        contract,
        symbol,
        tokens
      } = action.payload;
      return Object.assign({}, state, {
        __contracts: Object.assign({}, state.__contracts, {
          [symbol.toUpperCase()]: contract
        }),
        [account_name]: Object.assign({}, state[account_name], tokens)
      });
    }
    default: {
      return state;
    }
  }
}
