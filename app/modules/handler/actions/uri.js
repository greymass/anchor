import { find } from 'lodash';

import * as types from '../../../shared/actions/types';
import eos from '../../../shared/actions/helpers/eos';
import { httpClient } from '../../../shared/utils/httpClient';

const { ipcRenderer } = require('electron');

const { SigningRequest } = require('eosio-uri');
const zlib = require('zlib');

export function broadcastURI(tx, blockchain, callback = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_EOSIOURIBROADCAST_PENDING
    });
    const {
      connection
    } = getState();
    if (!blockchain) {
      return dispatch({
        payload: { err: 'no_blockchain' },
        type: types.SYSTEM_EOSIOURIBROADCAST_FAILURE
      });
    }
    const modified = Object.assign({}, connection, {
      broadcast: false,
      chainId: blockchain.chainId,
      httpEndpoint: blockchain.node
    });
    eos(modified)
      .pushTransaction(tx.transaction).then((response) => {
        if (callback) {
          dispatch(callbackURIWithProcessed({
            bn: response.processed.block_num,
            tx: response.transaction_id,
            sig: tx.transaction.signatures
          }, callback));
        }
        return dispatch({
          payload: { response },
          type: types.SYSTEM_EOSIOURIBROADCAST_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_EOSIOURIBROADCAST_FAILURE
      }));
  };
}

export function callbackURIWithProcessed({
  bn,
  tx,
  sig
}, callback) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_EOSIOURICALLBACK_PENDING
    });
    const {
      background,
      url
    } = callback;

    let s = url;
    s = s.replace('{{bn}}', bn);
    s = s.replace('{{tx}}', tx);
    s = s.replace('{{sig}}', sig[0]);
    s = s.replace('{{sig[0]}}', sig[0]);

    // If it's not a background call, return to state
    if (!background) {
      return dispatch({
        type: types.SYSTEM_EOSIOURICALLBACK_SUCCESS,
        payload: {
          background,
          s
        }
      });
    }

    // Otherwise execute background call
    httpClient
      .post(s, {
        bn,
        tx,
        sig: sig[0],
      })
      .then(() => dispatch({
        type: types.SYSTEM_EOSIOURICALLBACK_SUCCESS,
        payload: {
          background,
          s
        }
      }))
      .catch((error) => dispatch({
        type: types.SYSTEM_EOSIOURICALLBACK_FAILURE,
        payload: {
          s,
          error,
        }
      }));
  };
}

export function clearURI() {
  return (dispatch: () => void) => dispatch({
    type: types.SYSTEM_EOSIOURI_RESET
  });
}

export function setURI(uri) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_EOSIOURI_PENDING
    });
    try {
      // Setup decompression
      const opts = {
        zlib: {
          deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
          inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
        }
      };
      // Interpret the Signing Request
      const request = SigningRequest.from(uri, opts);
      // Extract relevant information
      const {
        data,
        version,
      } = request;
      const {
        broadcast,
        callback,
        req,
      } = data;
      // Pull chainId requested
      const chainId = request.getChainId().toLowerCase();
      return dispatch({
        type: types.SYSTEM_EOSIOURI_SUCCESS,
        payload: {
          broadcast,
          chainId,
          callback,
          req,
          uri,
          version,
        }
      });
    } catch (err) {
      return dispatch({
        type: types.SYSTEM_EOSIOURI_FAILURE,
        payload: {
          err,
          uri
        }
      });
    }
  };
}

export function signURI(tx, blockchain, wallet, broadcast = false, callback = false) {
  return (dispatch: () => void, getState) => {
    const {
      auths,
      connection
    } = getState();
    dispatch({
      type: types.SYSTEM_EOSIOURISIGN_PENDING
    });
    const networkConfig = Object.assign({}, connection, {
      chainId: blockchain.chainId,
      httpEndpoint: blockchain.node,
      signMethod: (wallet.mode === 'ledger') ? 'ledger' : false,
      signPath: (wallet.mode === 'ledger') ? wallet.path : false,
    });
    // Logic to pull unlocked auths from storage
    if (!networkConfig.signMethod && wallet.mode === 'hot') {
      const auth = find(auths, { pubkey: wallet.pubkey });
      if (auth) {
        networkConfig.keyProviderObfuscated = {
          key: auth.key,
          hash: auth.hash,
        };
      }
    }
    // Establish Signer
    const signer = eos(networkConfig, true);
    setTimeout(() => {
      signer
        .transaction(tx, {
          broadcast,
          expireInSeconds: (broadcast) ? undefined : connection.expireInSeconds,
          sign: true,
        })
        .then((signed) => {
          dispatch({
            payload: { signed },
            type: types.SYSTEM_EOSIOURISIGN_SUCCESS
          });
          if (broadcast) {
            if (callback) {
              dispatch(callbackURIWithProcessed({
                bn: signed.processed.block_num,
                tx: signed.transaction_id,
                sig: signed.transaction.signatures
              }, callback));
            }
            dispatch({
              payload: { response: signed },
              type: types.SYSTEM_EOSIOURIBROADCAST_SUCCESS
            });
          }
        })
        .catch((err) => {
          // If the transaction failed with the Ledger, reset the device connection
          if (wallet.mode === 'ledger') {
            const shouldReset = (
              // (err && err.statusCode && err.statusCode === 27013)
              (err && err.id === 'TransportLocked')
              || (err && err.message && err.message.startsWith('Cannot write to HID device'))
            );
            if (shouldReset) {
              const { ledger } = getState();
              if (global && global.initHardwareLedger) {
                global.initHardwareLedger(false, wallet.path, ledger.devicePath);
              }
              if (ipcRenderer) {
                ipcRenderer.send('connectHardwareLedger', wallet.path, ledger.devicePath);
              }
            }
          }
          return dispatch({
            payload: { err, tx },
            type: types.SYSTEM_EOSIOURISIGN_FAILURE
          });
        });
    }, 250);
  };
}

export function templateURI(blockchain, wallet) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_EOSIOURIBUILD_PENDING,
    });
    const { prompt } = getState();
    const { uri } = prompt;
    const authorization = {
      actor: wallet.account,
      permission: wallet.authorization
    };
    const EOS = eos({
      broadcast: false,
      chainId: blockchain.chainId,
      httpEndpoint: blockchain.node,
      sign: false,
    });
    const head = (await EOS.getInfo(true)).head_block_num;
    const block = await EOS.getBlock(head);
    // Force 1hr expiration of txs, shouldn't hit
    block.expire_seconds = 60 * 60 * 1;
    try {
      // Setup decompression
      const opts = {
        zlib: {
          deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
          inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
        },
        abiProvider: {
          getAbi: async (account) => (await EOS.getAbi(account)).abi
        }
      };
      // Interpret the Signing Request
      const request = SigningRequest.from(uri, opts);
      // Determine the contract name
      let contractName;
      switch (request.data.req[0]) {
        case 'action':
        default:
          contractName = request.data.req[1].account;
          break;
        case 'action[]':
          contractName = request.data.req[1][0].account;
          break;
        case 'transaction':
          contractName = request.data.req[1].actions[0].account;
          break;
      }
      // Form the transaction
      const data = await request.getTransaction(authorization, block);
      // Retrieve the ABI
      const contract = await EOS.getAbi(contractName);
      return dispatch({
        type: types.SYSTEM_EOSIOURIBUILD_SUCCESS,
        payload: {
          contract,
          tx: data
        }
      });
    } catch (err) {
      return dispatch({
        type: types.SYSTEM_EOSIOURIBUILD_FAILURE,
        payload: { err },
      });
    }
  };
}

export default {
  broadcastURI,
  callbackURIWithProcessed,
  clearURI,
  setURI,
  signURI,
  templateURI
};
