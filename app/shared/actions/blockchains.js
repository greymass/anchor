import { find, forEach, partition } from 'lodash';

import * as types from './types';
import { clearWallet } from './wallet';
import { setSettings, setSettingWithValidation } from './settings';
import { clearActionsCache } from './accounts';
import { clearProducerInfo } from './producers'

function swapBlockchain(chainId) {
  return (dispatch: () => void, getState) => {
    const { blockchains } = getState();
    const blockchain = find(blockchains, { chainId });
    dispatch({ type: types.SYSTEM_GETABI_FAILURE })
    dispatch(clearWallet());
    dispatch(setSettingWithValidation('node', blockchain.node));
    dispatch(clearActionsCache());
    dispatch(clearProducerInfo());
    return dispatch(setSettings({
      account: undefined,
      authorization: undefined,
      chainId,
      walletHash: undefined,
      walletMode: undefined,
    }));
  }
}

export default {
  // addBlockchain,
  // setNode,
  swapBlockchain,
};
