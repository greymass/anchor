import * as types from '../../../shared/actions/types';
import eos from '../../../shared/actions/helpers/eos';

const { SigningRequest } = require('eosio-uri');

// opts for the signing request
const util = require('util');
const zlib = require('zlib');

export function setURI(uri) {
  return (dispatch: () => void, getState) => {
    const { connection } = getState();
    dispatch({
      type: types.SYSTEM_EOSIOURI_PENDING
    });
    const EOS = eos(connection);
    console.log(EOS, connection)
    const opts = {
      zlib: {
        deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
        inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
      },
      abiProvider: {
        getAbi: async (account) => (await EOS.getAbi(account)).abi
      }
    };
    const request = SigningRequest.from(uri, opts);
    return request
      .getActions()
      .then((actions) => dispatch({
        type: types.SYSTEM_EOSIOURI_SUCCESS,
        payload: {
          actions,
          request,
          uri
        }
      }));
  };
}

export function templateURI() {
  return async (dispatch: () => void, getState) => {
    const { connection, prompt, settings } = getState();
    const authorization = {
      actor: settings.account,
      permission: settings.authorization
    };
    dispatch({
      type: types.SYSTEM_EOSIOURI_TEMPLATEURI_PENDING,
    });
    const EOS = eos(Object.assign(connection, {

    }));
    const head = (await EOS.getInfo(true)).head_block_num;
    const block = await EOS.getBlock(head);
    block.expire_seconds = 600;
    try {
      const data = await prompt.request.getTransaction(authorization, block);
      return EOS.transaction(data, {
        broadcast: false,
        expireInSeconds: (60 * 10),
        sign: false,
      }).then((tx) => {
        return dispatch({
          type: types.SYSTEM_EOSIOURI_TEMPLATEURI_SUCCESS,
          payload: {
            tx
          }
        });
      }).catch((err) => {
        return dispatch({
          type: types.SYSTEM_EOSIOURI_TEMPLATEURI_FAILURE,
          payload: { err },
        })
      });
    } catch (err) {
      return dispatch({
        type: types.SYSTEM_EOSIOURI_TEMPLATEURI_FAILURE,
        payload: { err },
      });
    }
  };
}

export default {
  setURI,
  templateURI
};
