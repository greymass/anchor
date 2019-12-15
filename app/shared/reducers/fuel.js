import * as types from '../actions/types';

const initialState = {};

export default function fuel(state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
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
