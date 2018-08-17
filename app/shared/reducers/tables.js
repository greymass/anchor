import { set } from 'dot-prop-immutable';
import * as types from '../actions/types';

const initialState = {};

export default function tables(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.SYSTEM_GETTABLE_SUCCESS: {
      const {
        code,
        more,
        rows,
        scope,
        table,
      } = action.payload;

      // overwrite state to only store one table at a time
      return set({}, `${code}.${scope}.${table}`, { more, rows });
    }
    default: {
      return state;
    }
  }
}
