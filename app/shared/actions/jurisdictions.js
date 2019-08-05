
import * as types from './types';

export function getJurisdictions() {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_JURISDICTION_ALL_PENDING
    });
    const {
      connection
    } = getState();

    const url = `${connection.httpEndpoint}/v1/jurisdiction/get_all_jurisdictions`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({}),
      headers
    }).then(result => result.json())
      .then((results) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_SUCCESS,
          payload: {
            jurisdictions: results.jurisdictions
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
      }).catch((err) => {
        console.log('error', err);
        dispatch({
          type: types.GET_JURISDICTION_ALL_FAILURE,
          payload: err
        });
      });
  };
}

export function getProducerJurisdiction(producer) {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_JURISDICTION_PRODUCER_PENDING
    });

    const params = { producer_names: [producer] };
    const {
      connection
    } = getState();

    const url = `${connection.httpEndpoint}/v1/jurisdiction/get_producer_jurisdiction`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers
    }).then(result => result.json())
      .then((results) => {
        return dispatch({
          type: types.GET_JURISDICTION_PRODUCER_SUCCESS,
          payload: {
            producer: producer,
            producer_jurisdictions: results.producer_jurisdictions[0]
              ? results.producer_jurisdictions[0].jurisdictions
              : []
            // producer_jurisdictions: [0, 40, 41, 50, 15, 18, 23]
          }
        });
      }).catch((err) => {
        console.log('error', err);
        dispatch({
          type: types.GET_JURISDICTION_PRODUCER_FAILURE,
          payload: err
        });
      });
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

export function getAllProducerJurisdictionForBlock(blockNumber, sequence) {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_JURISDICTION_ALL_FOR_BLOCK_PENDING
    });

    const params = { block_number: blockNumber };
    const {
      connection
    } = getState();

    const url = `${connection.httpEndpoint}/v1/jurisdiction_history/get_all_producer_jurisdiction_for_block`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers
    }).then(result => result.json())
      .then((results) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_BLOCK_SUCCESS,
          payload: {
            sequenceBlock: sequence,
            blockJurisdictions: results
          }
        });
      }).catch((err) => {
        console.log('error', err);
        dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_BLOCK_FAILURE,
          payload: err
        });
      });
  };
}

export function getAllTransactionJurisdictions(blockNumberOrID, sequence) {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_JURISDICTION_ALL_FOR_TRANSACTION_PENDING
    });

    const params = { block_num_or_id: blockNumberOrID };
    const {
      connection
    } = getState();

    const url = `${connection.httpEndpoint}/v1/chain/get_block`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers
    }).then(result => result.json())
      .then((results) => {
        return dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_TRANSACTION_SUCCESS,
          payload: {
            sequenceTransaction: sequence,
            transactionExtensions: results.transactions[0].trx.transaction.transaction_extensions.length === 0 ? '' : results.transactions[0].trx.transaction.transaction_extensions[0].data
            // transactionExtensions: results
          }
        });
      }).catch((err) => {
        console.log('error', err);
        dispatch({
          type: types.GET_JURISDICTION_ALL_FOR_TRANSACTION_FAILURE,
          payload: err
        });
      });
  };
}

export default {
  saveChoosenJurisdictions,
  getJurisdictions,
  getProducerJurisdiction,
  getAllProducerJurisdictionForBlock,
  getAllTransactionJurisdictions
};
