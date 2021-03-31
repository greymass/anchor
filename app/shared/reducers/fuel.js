import * as types from '../actions/types';

const initialState = {};

export default function fuel(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_ESRURI_RESET:
    case types.SYSTEM_BLOCKCHAIN_SWAP:
    case types.CLEAR_ALTERNATIVE_RESOURCE_PAYMENT: {
      return Object.assign({}, state, {
        alternative: undefined
      });
    }
    case types.SET_ALTERNATIVE_RESOURCE_PAYMENT: {
      return Object.assign({}, state, {
        alternative: action.payload
      });
    }
    case types.SYSTEM_FUELQUOTASTATUS_SUCCESS: {
      return Object.assign({}, state, {
        quota: action.payload.response.data[0]
      });
    }
    default: {
      return state;
    }
  }
}
