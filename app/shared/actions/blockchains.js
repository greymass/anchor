import { find } from 'lodash';

import { clearWallet } from './wallet';
import { setSettings, setSettingWithValidation } from './settings';
import { clearActionsCache } from './accounts';
import { clearProducerInfo } from './producers';

function swapBlockchain(chainId) {
  return (dispatch: () => void, getState) => {
    const { blockchains, settings } = getState();
    const blockchain = find(blockchains, { chainId });
    // only swap if the entry exists
    if (blockchain) {
      // clear the existing wallet
      dispatch(clearWallet());
      // clear all data caches
      dispatch(clearActionsCache());
      dispatch(clearProducerInfo());
      // prevent changing nodes when using a cold wallet
      if (settings.walletMode !== 'cold') {
        dispatch(setSettingWithValidation('node', blockchain.node));
      }
      // update the settings to match this new configuration
      return dispatch(setSettings({
        // Remove the current account/authorization
        account: undefined,
        authorization: undefined,
        // Set the new chainId
        chainId,
        // If this is a cold wallet, remain in cold, else unset.
        walletMode: (settings.walletMode === 'cold' ? 'cold' : undefined),
      }));
    }
  };
}

function importBlockchainFromBackup(blockchain) {

}

export default {
  // addBlockchain,
  // setNode,
  importBlockchainFromBackup,
  swapBlockchain,
};
