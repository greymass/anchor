import axios from 'axios';
import * as types from './types';
import checkForBeos from '../components/helpers/checkCurrentBlockchain';

export function getJurisdictions() {
  return (dispatch, getState) => {
    const {
      connection
    } = getState();

    if (checkForBeos(connection)) {
      dispatch({
        type: types.GET_JURISDICTION_ALL_PENDING
      });
      const url = `${connection.httpEndpoint}/v1/jurisdiction/get_all_jurisdictions`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      axios({
        method: 'post',
        url: url,
        data: {},
        config: { headers: headers }
      }).then((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_SUCCESS,
          payload: {
            jurisdictions: response.data.jurisdictions
            // jurisdictions: [
            //   { code: 0, name: 'poland', description: 'EAST EUROPE' },
            //   { code: 2, name: 'germany', description: 'EAST EUROPE' },
            //   { code: 3, name: 'china', description: 'EAST EUROPE' },
            //   { code: 10, name: 'singapur', description: 'YO!' },
            //   { code: 13, name: 'Vatican', description: 'Waka waka' },
            //   { code: 15, name: 'notchina', description: 'who cares' },
            //   { code: 16, name: 'bytopia', description: 'outerplane' },
            //   { code: 17, name: 'sigil', description: 'cynosure' },
            //   { code: 18, name: 'elysium', description: 'outerplane' },
            //   { code: 20, name: 'cityofbrass', description: 'plane of fire' },
            //   { code: 22, name: 'baldurs gate', description: 'faerun toril' },
            //   { code: 23, name: 'galactic empire', description: 'the galaxy duh' },
            //   { code: 30, name: 'USA', description: 'Wyoming!' },
            //   { code: 40, name: 'Canada', description: 'Northern America' },
            //   { code: 41, name: 'Russia', description: 'EAST EUROPE' },
            //   { code: 50, name: 'Slovakia', description: 'EAST EUROPE' },
            // ]
          }
        });
      }).catch((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_FAILURE,
          payload: response
        });
      });
    }
  };
}

export function getActiveJurisdictions() {
  return (dispatch, getState) => {
    const {
      connection
    } = getState();

    if (checkForBeos(connection)) {
      dispatch({
        type: types.GET_ACTIVE_JURISDICTION_PENDING
      });

      const url = `${connection.httpEndpoint}/v1/jurisdiction/get_active_jurisdictions`;

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({}),
        headers
      }).then(result => result.json())
        .then((results) => {
          return dispatch({
            type: types.GET_ACTIVE_JURISDICTION_SUCCESS,
            payload: {
              jurisdictions: results.jurisdictions
            }
          });
        }).catch((err) => {
          console.log('error', err);
          dispatch({
            type: types.GET_ACTIVE_JURISDICTION_FAILURE,
            payload: err
          });
        });
    }
  };
}

export function getProducerJurisdiction(producer) {
  return (dispatch, getState) => {

    const params = { producer_names: [producer] };
    const {
      connection
    } = getState();

    if (checkForBeos(connection)) {
      dispatch({
        type: types.GET_JURISDICTION_PRODUCER_PENDING
      });

      const url = `${connection.httpEndpoint}/v1/jurisdiction/get_producer_jurisdiction`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      axios({
        method: 'post',
        url: url,
        data: params,
        config: { headers: headers }
      }).then((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_PRODUCER_SUCCESS,
          payload: {
            producer: producer,
            producer_jurisdictions: response.data.producer_jurisdictions[0]
              ? response.data.producer_jurisdictions[0].jurisdictions
              : []
            // producer_jurisdictions: [0, 40, 41, 50, 15, 18, 23]
          }
        });
      }).catch((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_PRODUCER_FAILURE,
          payload: {
            response,
            producer: producer,
          }
        });
      });
    }
  };
}

export function saveChoosenJurisdictions(jurisdictions) {
  return (dispatch) => {
    dispatch({
      type: types.SET_CHOOSEN_JURISDICTIONS,
      payload: {
        choosenJurisdictions: jurisdictions
      }
    });
  };
}

export function getProducerJurisdictionForBlock(blockNumber, producer, sequence) {
  return (dispatch, getState) => {

    const params = { producer: producer, block_number: blockNumber };
    const {
      connection
    } = getState();

    if (checkForBeos(connection)) {
      dispatch({
        type: types.GET_JURISDICTION_FOR_BLOCK_PENDING
      });

      const url = `${connection.httpEndpoint}/v1/jurisdiction_history/get_producer_jurisdiction_for_block`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      axios({
        method: 'post',
        url: url,
        data: params,
        config: { headers: headers }
      }).then((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_FOR_BLOCK_SUCCESS,
          payload: {
            sequenceBlock: sequence,
            blockJurisdictions: response.data.producer_jurisdiction_for_block.length ? response.data.producer_jurisdiction_for_block[0].new_jurisdictions : []
          }
        });
      }).catch((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_FOR_BLOCK_FAILURE,
          sequenceBlock: sequence,
          payload: response
        });
      });
    }
  };
}

export function getAllProducerJurisdictionForBlock(blockNumber, sequence) {
  return (dispatch, getState) => {

    const params = { block_number: blockNumber };
    const {
      connection
    } = getState();

    if (checkForBeos(connection)) {
      dispatch({
        type: types.GET_JURISDICTION_ALL_FOR_BLOCK_PENDING
      });

      const url = `${connection.httpEndpoint}/v1/jurisdiction_history/get_all_producer_jurisdiction_for_block`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      axios({
        method: 'post',
        url: url,
        data: params,
        config: { headers: headers }
      }).then((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_BLOCK_SUCCESS,
          payload: {
            sequenceBlock: sequence,
            allBlockJurisdictions: response.data
          }
        });
      }).catch((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_BLOCK_FAILURE,
          payload: response
        });
      });
    }
  };
}

export function getAllTransactionJurisdictions(blockNumberOrID, sequence) {
  return (dispatch, getState) => {

    const params = { block_num_or_id: blockNumberOrID };
    const {
      connection
    } = getState();

    if (checkForBeos(connection)) {
      dispatch({
        type: types.GET_JURISDICTION_ALL_FOR_TRANSACTION_PENDING
      });
      dispatch({
        type: types.GET_JURISDICTION_FOR_BLOCK_PENDING
      });

      const url = `${connection.httpEndpoint}/v1/chain/get_block`;

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      axios({
        method: 'post',
        url: url,
        data: params,
        config: { headers: headers }
      }).then((response) => {
        dispatch(getProducerJurisdictionForBlock(blockNumberOrID, response.data.producer, sequence));
        return dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_TRANSACTION_SUCCESS,
          payload: {
            sequenceTransaction: sequence,
            transactionExtensions: typeof response.data.transactions[0].trx !== 'object' || response.data.transactions[0].trx.transaction.transaction_extensions.length === 0 ? '' : response.data.transactions[0].trx.transaction.transaction_extensions[0].data
          }
        });
      }).catch((response) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_TRANSACTION_FAILURE,
          sequenceTransaction: sequence,
          payload: response
        });
      });

    }
  };
}

export function saveOnlyActive() {
  return (dispatch) => {
    dispatch({
      type: types.SAVE_ONLY_ACTIVE
    });
  };
}

export function clearJurisdictionsSequence() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_JURISDICTIONS_SEQUENCE
    });
  };
}

export default {
  getJurisdictions,
  getActiveJurisdictions,
  getProducerJurisdiction,
  saveChoosenJurisdictions,
  getProducerJurisdictionForBlock,
  getAllProducerJurisdictionForBlock,
  getAllTransactionJurisdictions,
  saveOnlyActive,
  clearJurisdictionsSequence
};
