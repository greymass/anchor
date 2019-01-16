import * as types from './types';

import eos from './helpers/eos';

export function getInfo() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CHAIN_INFO_REQUEST
    });
    const { connection, chain: previousChain } = getState();

    eos(connection).getInfo(true).then((chain) => {
      /* Get distribution period info if we are in BEOS blockchain */
      if (chain.chain_id === '50f1cee2e3750f473e673049c1b828ec10e10eb96c7211a91cc2bd29ae94c6dd') {
        dispatch(getDistributionInfo());
      } else if (previousChain && previousChain.hasOwnProperty('distributionPeriodInfo')) {
        dispatch({ type: types.REMOVE_DISTRIBUTION_PERIOD_INFO })
      }

      return dispatch({
        type: types.GET_CHAIN_INFO_SUCCESS,
        payload: { chain }
      })
    }).catch((err) => dispatch({
      type: types.GET_CHAIN_INFO_FAILURE,
      payload: { err },
    }));
  };
}

/**
 * Method to get distribution info
 * Currently only for BEOS
 */
export function getDistributionInfo() {
  return (dispatch: () => void, getState) => {
    const { connection, chain: { head_block_num } } = getState();

    const query = {
      json: true,
      code: 'beos.distrib',
      scope: 'beos.distrib',
      table: 'distribstate',
      limit: 1000,
    };

    eos(connection).getTableRows(query).then(({ rows: [data] }) => {
      dispatch({
        type: types.GET_DISTRIBUTION_PERIOD_INFO,
        payload: {
          distributionPeriodInfo: {
            ramDistribution: head_block_num < data['ram'].ending_block,
            beosDistribution: head_block_num < data['beos'].ending_block
          }
        }
      })
    }).catch((err) => dispatch({
      type: types.GET_DISTRIBUTION_PERIOD_INFO_FAILURE,
      payload: { err }
    }));
  }
}

export default {
  getInfo
};
