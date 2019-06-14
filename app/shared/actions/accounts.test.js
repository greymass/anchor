import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  clearAccountCache,
  clearActionsCache,
  clearBalanceCache,
  getCurrencyBalance,
} from './accounts';

import * as types from './types';

import eos from 'eosjs';
jest.mock('eosjs');

const mockStore = configureStore([thunk]);

const flushPromises = () => new Promise(setImmediate);

const state = {
  connection: {
    chainId: 'EOS_CHAIN_ID'
  },
  features: { endpoints: [] },
  settings: {
    node: ['node'],
    customTokens: [],
  },
};

const store = mockStore(() => state);

describe('accounts actions', () => {
  beforeEach(() => {
    store.clearActions();
    fetch.resetMocks();
  });

  it('clearAccountCache() dispatches the correct action and payload', () => {
    store.dispatch(clearAccountCache());
    const expectedPayload = [{ type: types.CLEAR_ACCOUNT_CACHE }];
    expect(store.getActions()).toEqual(expectedPayload);
  });

  it('clearActionsCache() dispatches the correct action and payload', () => {
    store.dispatch(clearActionsCache());
    const expectedPayload = [{ type: types.CLEAR_ACCOUNT_ACTIONS_CACHE }];
    expect(store.getActions()).toEqual(expectedPayload);
  });

  it('clearBalanceCache() dispatches the correct action and payload', () => {
    store.dispatch(clearBalanceCache());
    const expectedPayload = [{ type: types.CLEAR_BALANCE_CACHE }];
    expect(store.getActions()).toEqual(expectedPayload);
  });

  it('getCurrencyBalance() fetches balances from api', async () => {
    // Error action triggered after loading
    const expectedResult = [
      {
        payload: {
          account_name: 'teamgreymass',
          tokens: ['EOS_CHAIN_ID:eosio.token:EOS']
        },
        type: 'GET_ACCOUNT_BALANCE_REQUEST'
      },
      {
        type: types.GET_ACCOUNT_BALANCE_SUCCESS,
        payload: {
          account_name: 'teamgreymass',
          contract: 'eosio.token',
          precision: {
            EOS: 4
          },
          symbol: 'EOS',
          tokens: {
            EOS: 10
          }
        }
      }
    ];

    eos.mockImplementation(() => ({
      getCurrencyBalance: () => new Promise((resolve) => {
        resolve(['10.0000 EOS']);
      })
    }));

    store.dispatch(getCurrencyBalance('teamgreymass'));

    await flushPromises();

    expect(store.getActions()).toEqual(expectedResult);
  });
});
