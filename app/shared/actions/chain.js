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
      if ((chain.chain_id === 'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4') ||
          (chain.chain_id === 'cbef47b0b26d2b8407ec6a6f91284100ec32d288a39d4b4bbd49655f7c484112')) {
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
