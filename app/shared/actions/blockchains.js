import { find, forEach, partition } from 'lodash';

import * as types from './types';
import { clearWallet } from './wallet';
import { setSettings, setSettingWithValidation } from './settings';

function swapBlockchain(chainId) {
  return (dispatch: () => void, getState) => {
    const { blockchains } = getState();
    const blockchain = find(blockchains, { chainId });
    dispatch(clearWallet());
    dispatch(setSettingWithValidation('node', blockchain.node));
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
