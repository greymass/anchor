import * as types from '../actions/types';

const initialState = {
  acceptedConstitution: false,
  account: '',
  lang: 'en',
  node: ''
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.WALLET_REMOVE: {
      return Object.assign({}, state, { account: '' });
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    case types.RESET_INVALID_SETTINGS: {
      return Object.assign({}, {
        acceptedConstitution: state.acceptedConstitution,
        account: state.account,
        lang: state.lang,
        node: state.node,
        setupData: state.setupData
      });
    }
    default: {
      return state;
    }
  }
}
