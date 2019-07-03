
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

export default {
  getJurisdictions
};
