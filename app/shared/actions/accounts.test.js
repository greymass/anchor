import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  clearAccountCache,
  clearActionsCache,
  clearBalanceCache,
  getAccountBalances,
} from './accounts';
import * as getAccountJSON from './__mocks__/getAccount';
import * as getBalanceJSON from './__mocks__/getBalance';
import * as types from './types';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('accounts actions', () => {
  const asset = {
    assetName: 'name1',
    description: 'desc1',
    file: null,
    files: 'File(32293)',
    lastModified: 1546617476359,
    lastModifiedDate: 'Fri Jan 04 2019 11:57:56 GMT-0400 (Atlantic Standard Time)',
    name: 'model-edit.png',
    size: 32293,
    type: 'image/png',
    webkitRelativePath: '',
    ownerId: '',
  };

  beforeEach(() => {
    store.clearActions();
    fetch.resetMocks();
  });

  it('clearAccountCache() dispatches the correct action and payload', () => {
    store.dispatch(clearAccountCache());
    const expectedPayload = [{ payload: {}, type: CLEAR_ACCOUNT_CACHE }];
    expect(store.getActions()).toEqual(expectedPayload);
  });

  it('clearActionsCache() dispatches the correct action and payload', () => {
    store.dispatch(clearActionsCache());
    const expectedPayload = [{ payload: {}, type: CLEAR_ACCOUNT_ACTIONS_CACHE }];
    expect(store.getActions()).toEqual(expectedPayload);
  });

  it('clearBalanceCache() dispatches the correct action and payload', () => {
    store.dispatch(clearBalanceCache());
    const expectedPayload = [{ payload: {}, type: CLEAR_BALANCE_CACHE }];
    expect(store.getActions()).toEqual(expectedPayload);
  });

  it('getAccountBalances() fetches balancves from api', () => {
    // Error action triggered after loading
    const expectedResult = [
      { type: types.GET_ACCOUNT_BALANCE_REQUEST },
      {
        type: types.GET_ACCOUNT_BALANCE_SUCCESS,
        payload: {
          account_name: 'teamgreymass',
          contract: '',
          precision: '0.0000',
          symbol: 'EOS',
          tokens: '0.0000 EOS'
        }
      }
    ];
    fetch.mockReject(new Error('error'));
    fetch.mockResponseOnce(JSON.stringify(getBalanceJSON))

    return store.dispatch(getAccountBalances()).then(() => {
      expect(store.getActions()).toEqual(expectedResult);
    });
  });
});
