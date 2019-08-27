import * as types from '../actions/types';

const initialState = {
  loading: false,
  onlyActive: false,
  fetchingError: false,
  jurisdictions: [],
  choosenJurisdictions: [],
  choosenJurisdictionsTemp: [],
  activeJurisdictions: []
};

export default function jurisdictions(state = initialState, action) {
  const { type } = action;
  const matches = /^GET_JURISDICTION_(.*)_(PENDING|SUCCESS|FAILURE)$/.exec(type);
  let requestName = 'request';
  let requestState = 'state';
  if (matches) {
    requestName = matches[1];
    requestState = matches[2];
  }

  switch (action.type) {
    case types.GET_JURISDICTION_ALL_PENDING: {
      return {
        ...state,
        [requestName]: requestState,
        loading: true,
        fetchingError: false
      };
    }
    case types.GET_JURISDICTION_ALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        [requestName]: requestState,
        jurisdictions: action.payload.jurisdictions,
        fetchingError: false,
        choosenJurisdictions: state.choosenJurisdictions.length === 0 ? state.choosenJurisdictionsTemp : state.choosenJurisdictions,
        choosenJurisdictionsTemp: []
      };
    }
    case types.GET_JURISDICTION_ALL_FAILURE: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
        fetchingError: true,
        choosenJurisdictionsTemp: state.choosenJurisdictions.length === 0 ? state.choosenJurisdictionsTemp : state.choosenJurisdictions,
        choosenJurisdictions: []
      };
    }
    case types.GET_JURISDICTION_PRODUCER_PENDING: {
      return {
        ...state,
        [requestName]: requestState,
        loading: true,
      };
    }
    case types.GET_JURISDICTION_PRODUCER_SUCCESS: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
        producer: action.payload.producer,
        producer_jurisdictions: action.payload.producer_jurisdictions
      };
    }
    case types.GET_JURISDICTION_PRODUCER_FAILURE: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
      };
    }
    case types.SET_CHOOSEN_JURISDICTIONS: {
      return {
        ...state,
        choosenJurisdictions: action.payload.choosenJurisdictions
      };
    }
    case types.GET_JURISDICTION_ALL_FOR_BLOCK_PENDING: {
      return {
        ...state,
        [requestName]: requestState,
        loading: true,
      };
    }
    case types.GET_JURISDICTION_ALL_FOR_BLOCK_SUCCESS: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
        sequenceBlock: action.payload.sequenceBlock,
        blockJurisdictions: action.payload.blockJurisdictions
      };
    }
    case types.GET_JURISDICTION_ALL_FOR_BLOCK_FAILURE: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
      };
    }
    case types.GET_JURISDICTION_ALL_FOR_TRANSACTION_PENDING: {
      return {
        ...state,
        [requestName]: requestState,
        loading: true,
      };
    }
    case types.GET_JURISDICTION_ALL_FOR_TRANSACTION_SUCCESS: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
        sequenceTransaction: action.payload.sequenceTransaction,
        transactionExtensions: action.payload.transactionExtensions
      };
    }
    case types.GET_JURISDICTION_ALL_FOR_TRANSACTION_FAILURE: {
      return {
        ...state,
        [requestName]: requestState,
        loading: false,
      };
    }
    case types.GET_ACTIVE_JURISDICTION_SUCCESS: {
      return {
        ...state,
        activeJurisdictions: action.payload.jurisdictions,
        fetchingError: false,
        choosenJurisdictions: state.choosenJurisdictions.length === 0 ? state.choosenJurisdictionsTemp : state.choosenJurisdictions,
        choosenJurisdictionsTemp: []
      };
    }
    case types.SAVE_ONLY_ACTIVE: {
      return {
        ...state,
        onlyActive: !state.onlyActive
      };
    }
    case types.GET_ACTIVE_JURISDICTION_FAILURE: {
      return {
        ...state,
        fetchingError: true,
        choosenJurisdictionsTemp: state.choosenJurisdictions.length === 0 ? state.choosenJurisdictionsTemp : state.choosenJurisdictions,
        choosenJurisdictions: []
      };
    }
    default: {
      return state;
    }
  }
}
