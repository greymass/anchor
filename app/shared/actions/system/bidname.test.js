import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import eos from 'eosjs';

import * as types from '../types';

import { bidname } from './bidname';

jest.mock('eosjs');

const mockStore = configureStore([thunk]);

const flushPromises = () => new Promise(setImmediate);

const state = {
  connection: {
    authorization: 'teamgreymass@active'
  },
  settings: {
    account: 'teamgreymass',
    chainId: 'chainId',
    recentBids: {
      chainId: {
        teamgreymass: [
          {
            bid: '1.0000 EOS',
            newname: 'test',
          }
        ]
      }
    },
  },
};

const store = mockStore(() => state);

describe('bidname()', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('updates state properly on success response', async () => {
    const expectedResult = [
      { type: types.SYSTEM_BIDNAME_PENDING },
      {
        payload: {
          recentBids: {
            chainId: {
              teamgreymass: [
                {
                  bid: '1.0000 EOS',
                  newname: 'test',
                },
                {
                  bid: '2.0000 EOS',
                  newname: 'othertest',
                }
              ]
            }
          }
        },
        type: types.SET_SETTING
      },
      {
        type: types.SYSTEM_BIDNAME_SUCCESS,
        payload: {
          tx: 'tx-id'
        }
      }
    ];

    eos.mockImplementation(() => ({
      transaction: () => new Promise((resolve) => {
        resolve('tx-id');
      })
    }));

    store.dispatch(bidname({ newname: 'othertest', bid: '2.0000 EOS' }));

    await flushPromises();

    expect(store.getActions()).toEqual(expectedResult);
  });

  it('updates the state on failure response', async () => {
    const expectedResult = [
      { type: types.SYSTEM_BIDNAME_PENDING },
      {
        type: types.SYSTEM_BIDNAME_FAILURE,
        payload: {
          err: '400 - you cannot bid on this name for reason X'
        },
      },
    ];

    eos.mockImplementation(() => ({
      transaction: () => new Promise(() => {
        throw '400 - you cannot bid on this name for reason X';
      })
    }));

    store.dispatch(bidname({ newname: 'othertest', bid: '2.0000 EOS' }));

    await flushPromises();

    expect(store.getActions()).toEqual(expectedResult);
  });
});
