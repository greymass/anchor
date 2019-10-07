import { getInfo } from './chain';
import { getREXRates } from './rex';
import { syncAccounts } from './accounts';

export function sync() {
  return (dispatch: () => void) => {
    // Fetch current chain information
    dispatch(getInfo());
    // Fetch REX information
    dispatch(getREXRates());
    // Sync loaded accounts
    return dispatch(syncAccounts());
  };
}

export default {
  sync
};
