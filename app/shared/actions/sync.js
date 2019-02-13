import { getInfo } from './chain';
import { syncAccounts } from './accounts';

export function sync() {
  return (dispatch: () => void) => {
    // Fetch current chain information
    dispatch(getInfo());
    // Sync loaded accounts
    return dispatch(syncAccounts());
  };
}

export default {
  sync
};
