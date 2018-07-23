import { set } from 'dot-prop-immutable';
import * as types from '../actions/types';

const initialState = {
  lastError: {},
  lastTransaction: {},
  list: [],
  producerInfo: null,
  producerInfoErrors: {},
  producersInfo: {},
  proxy: '',
  selected: [],
  updated: null
};

export default function producers(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.CLEAR_PRODUCER_CACHE: {
      return Object.assign({}, state, {
        list: []
      });
    }
    case types.GET_PRODUCERS_FAILURE: {
      return Object.assign({}, state, {
        list: []
      });
    }
    case types.GET_PRODUCERS_SUCCESS: {
      return Object.assign({}, state, {
        __updated: Date.now(),
        list: action.payload.list
      });
    }
    case types.SET_WALLET_ACTIVE: {
      return Object.assign({}, state, {
        selected: []
      });
    }
    case types.SYSTEM_PRODUCERJSON_CLEAR:
    case types.SYSTEM_PRODUCERJSON_PENDING: {
      return Object.assign({}, state, {
        producerInfo: null
      });
    }
    case types.SYSTEM_PRODUCERJSON_FAILURE: {
      return set(state, `producerInfoErrors.${action.payload.producer}`, action.payload.err);
    }
    case types.SYSTEM_PRODUCERJSON_SUCCESS: {
      return Object.assign({}, state, {
        producerInfo: action.payload
      });
    }
    case types.SYSTEM_PRODUCERSJSON_SUCCESS: {
      const producersInfo = {};
      const { rows } = action.payload;
      rows.forEach((row) => {
        try {
          producersInfo[row.owner] = JSON.parse(row.json);
        } catch (err) {
          // invalid json
        }
      });
      return Object.assign({}, state, {
        producersInfo
      });
    }
    case types.SYSTEM_VOTEPRODUCER_SUCCESS: {
      return Object.assign({}, state, {
        proxy: action.payload.proxy,
        selected: action.payload.producers
      });
    }
    case types.GET_ACCOUNT_SUCCESS: {
      const account = action.payload.results;
      if (account && account.voter_info) {
        const selected = account.voter_info.producers;
        if (!state.selected || selected.sort().toString() !== state.selected.sort().toString()) {
          return Object.assign({}, state, {
            selected
          });
        }
      }
      return state;
    }
    case types.GET_PRODUCERS_REQUEST:
    default: {
      return state;
    }
  }
}
