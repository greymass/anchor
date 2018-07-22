import * as types from '../actions/types';

const initialState = {};

export default function contracts(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.SYSTEM_GETABI_SUCCESS: {
      return Object.assign({}, state, {
        [action.payload.contract.account_name]: action.payload.contract
      });
    }
    default: {
      return state;
    }
  }
}
