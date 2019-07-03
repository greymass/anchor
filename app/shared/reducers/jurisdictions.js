import * as types from '../actions/types';

const initialState = {
  loading: false,
  jurisdictions: [],
};

export default function jurisdictions(state = initialState, action) {
  switch (action.type) {
    case types.GET_JURISDICTION_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_JURISDICTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        jurisdictions: action.payload.jurisdictions
      };
    }
    case types.GET_JURISDICTION_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.GET_JURISDICTION_PRODUCER_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_JURISDICTION_PRODUCER_SUCCESS: {
      return {
        ...state,
        loading: false,
        producer_jurisdictions: action.payload.producer_jurisdictions
      };
    }
    case types.GET_JURISDICTION_PRODUCER_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
