
import * as types from '../actions/types';

import reducer from './accounts';

describe('accounts reducer', () => {
  it('CLEAR_ACCOUNT_CACHE returns initial state', () => {
    const initialState = { __lookups: [{ account: 'teamgreymass' }] };
    const expectedNewState = { __lookups: [], __map: {} };
    const action = { type: types.CLEAR_ACCOUNT_CACHE };

    expect(reducer(initialState, action)).toEqual(expectedNewState);
  });

  it('RESET_ALL_STATES returns initial state', () => {
    const initialState = { __lookups: [{ account: 'teamgreymass' }] };
    const expectedNewState = { __lookups: [], __map: {} };
    const action = { type: types.RESET_ALL_STATES };

    expect(reducer(initialState, action)).toEqual(expectedNewState);
  });

  it('SYSTEM_GETTABLE_SUCCESS returns initial state', () => {
    const initialState = { __lookups: [] };
    const expectedNewState = {
      __lookups: [],
      teamgreymass: {
        delegated: {
          rows: [
            {
              from: 'teamgreymass',
              to: 'testaccount1',
              cpu_weight: 0.1000,
              net_weight: 0.0500
            }
          ],
          total: 0.1500,
        }
      }
    };
    const action = {
      type: types.SYSTEM_GETTABLE_SUCCESS,
      payload: {
        code: 'eosio',
        table: 'delband',
        scope: 'teamgreymass',
        rows: [
          {
            from: 'teamgreymass',
            to: 'testaccount1',
            cpu_weight: 0.1,
            net_weight: 0.05
          }
        ]
      }
    };

    expect(reducer(initialState, action)).toEqual(expectedNewState);
  });
});
