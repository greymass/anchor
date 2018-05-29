import * as types from '../actions/types';

export default function balances(state = {}, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.RESET_ALL_STATES: {
      return {};
    }
    case types.GET_ACCOUNT_BALANCE_FAILURE: {
      return {
        [action.payload.account_name]: false
      };
    }
    case types.GET_ACCOUNT_BALANCE_REQUEST: {
      return state;
    }
    case types.GET_ACCOUNT_BALANCE_SUCCESS: {
      return Object.assign({}, state, {
        [action.payload.account_name]: formatBalances(action.payload.balances)
      });
    }
    default: {
      return state;
    }
  }
}

function formatBalances(balances) {
  const formatted = {};
  for (let i = 0; i < balances.length; i += 1) {
    const [amount, symbol] = balances[i].split(' ');
    formatted[symbol] = parseFloat(amount);
  }
  return formatted;
}
