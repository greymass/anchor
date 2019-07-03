
import * as types from './types';

export function getJurisdictions() {
  return (dispatch) => {
    dispatch({
      type: types.GET_JURISDICTION_PENDING
    });

    // TODOJUR Get api address depends on devel or prod
    // const url = 'https://api.testnet.beos.world/v1/jurisdiction/get_all_jurisdictions';

    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify({}),
    //   headers
    // }).then(result => result.json())
    //   .then((results) => {
    //     return dispatch({
    //       type: types.GET_JURISDICTION_SUCCESS,
    //       payload: {
    //         jurisdictions: results.jurisdictions
    //       }
    //     });
    //   }).catch((err) => {
    //     console.log('error', err);
    //     dispatch({
    //       type: types.GET_JURISDICTION_FAILURE,
    //       payload: err
    //     });
    //   });

    return dispatch({
      type: types.GET_JURISDICTION_SUCCESS,
      payload: {
        jurisdictions: [
          { code: 0, name: 'poland', description: 'EAST EUROPE' },
          { code: 1, name: 'germany', description: 'EAST EUROPE' }
        ]
      }
    });
  };
}

export function getProducerJurisdiction(producer) {
  console.log('#### 2', producer);
  return [0, 40, 41, 50, 15, 18, 23];

  // return (dispatch) => {
  //   dispatch({
  //     type: types.GET_JURISDICTION_PRODUCER_PENDING
  //   });

  //   const params = { producer_names: [producer] };

  //   // const result =
  //   // {
  //   //   "producer_jurisdictions": [
  //   //     {"producer":"eosio","jurisdictions":[0]}
  //   //   ]
  //   // };

  //   const url = 'https://api.testnet.beos.world/v1/jurisdiction/get_producer_jurisdiction';

  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(params),
  //     headers
  //   }).then(result => result.json())
  //     .then((results) => {
  //       return dispatch({
  //         type: types.GET_JURISDICTION_PRODUCER_SUCCESS,
  //         // payload: {
  //         //   producer_jurisdictions: results.producer_jurisdictions[0].jurisdictions
  //         // }
  //         payload: {
  //           producer_jurisdictions: [0, 1, 3]
  //         }
  //       });
  //     }).catch((err) => {
  //       console.log('error', err);
  //       dispatch({
  //         type: types.GET_JURISDICTION_PRODUCER_FAILURE,
  //         payload: err
  //       });
  //     });
  // };
}

export default {
  getJurisdictions,
  getProducerJurisdiction
};
