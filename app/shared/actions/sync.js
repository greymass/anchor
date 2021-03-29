import { getInfo } from './chain';
import { getREXRates } from './rex';
import { syncAccounts } from './accounts';
import { getPriceFeed } from './blockchains/eos/delphioracle';
import { getConstants } from './app';
import { getGlobals } from './globals';

export function sync() {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();

    // Update global price feed (delphioracle)
    dispatch(getPriceFeed(settings.chainId));

    // Update application constants
    dispatch(getConstants());

    // Update blockchain globals
    dispatch(getGlobals());

    // Sync loaded accounts
    return dispatch(syncAccounts());
  };
}

export default {
  sync
};
