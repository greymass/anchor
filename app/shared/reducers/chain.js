import * as types from '../actions/types';

const initialState = {};

export default function chain(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.GET_CHAIN_INFO_SUCCESS: {
      return Object.assign({}, state, action.payload.chain);
    }
    case types.GET_DISTRIBUTION_PERIOD_INFO: {
      return Object.assign({}, state, { ...action.payload })
    }
    case types.REMOVE_DISTRIBUTION_PERIOD_INFO: {
      const newState = Object.assign({}, state);
      delete newState.distributionPeriodInfo;
      return newState;
    }
    default: {
      return state;
    }
  }
}
