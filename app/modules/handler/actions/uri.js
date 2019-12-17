import { find } from 'lodash';
import { get } from 'dot-prop-immutable';
import { Serialize } from 'eosjs2';

import * as types from '../../../shared/actions/types';
import eos from '../../../shared/actions/helpers/eos';
import { httpClient } from '../../../shared/utils/httpClient';

const { ipcRenderer } = require('electron');
const transactionAbi = require('eosjs2/node_modules/eosjs/src/transaction.abi.json');
const { SigningRequest } = require('eosio-signing-request');
const zlib = require('zlib');
const util = require('util');

const textEncoder = new util.TextEncoder();
const textDecoder = new util.TextDecoder();

const transactionTypes: Map<string, Serialize.Type> = Serialize.getTypesFromAbi(Serialize.createInitialTypes(), transactionAbi);
const esrParams = ['bn', 'ex', 'rbn', 'req', 'rid', 'sa', 'sig', 'sp', 'tx']

export function broadcastURI(tx, blockchain, callback = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ESRURIBROADCAST_PENDING
    });
    const {
      connection,
      prompt,
    } = getState();
    if (!blockchain) {
      return dispatch({
        payload: { err: 'no_blockchain' },
        type: types.SYSTEM_ESRURIBROADCAST_FAILURE
      });
    }
    // If the prompt itself disables the broadcast, only issue callback
    if (!prompt.broadcast) {
      if (callback) {
        const callbackParams = prompt.resolved.getCallback(tx.transaction.signatures);
        return dispatch(callbackURIWithProcessed(callbackParams));
      }
    }
    const modified = Object.assign({}, connection, {
      broadcast: false,
      chainId: blockchain.chainId,
      httpEndpoint: blockchain.node
    });
    eos(modified, false, true)
      .pushTransaction(tx.transaction).then((response) => {
        if (callback) {
          const callbackParams = prompt.resolved.getCallback(tx.transaction.signatures, response.processed.block_num);
          dispatch(callbackURIWithProcessed(callbackParams));
        }
        return dispatch({
          payload: {
            endpoint: modified.httpEndpoint,
            response
          },
          type: types.SYSTEM_ESRURIBROADCAST_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_ESRURIBROADCAST_FAILURE
      }));
  };
}

export function callbackURI(tx, blockchain, callback = false) {
  return async (dispatch: () => void, getState) => {
    const { connection } = getState();
    dispatch({
      type: types.SYSTEM_ESRURIBROADCAST_PENDING
    });
    const account = get(tx, 'transaction.transaction.actions.0.authorization.1.actor');
    const authorization = get(tx, 'transaction.transaction.actions.0.authorization.1.permission');
    const opts = {
      zlib: {
        deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
        inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
      }
    };
    const req = await SigningRequest.create({
      transaction: tx.transaction.transaction,
      callback,
      chainId: blockchain.chainId,
    }, opts);
    const uri = req.encode();
    const response = {
      broadcast: true,
      transaction: tx.transaction,
      transaction_id: tx.transaction_id,
    };
    const callbackParams = prompt.resolved.getCallback(tx.transaction.signatures);
    dispatch(callbackURIWithProcessed(callbackParams));
    return dispatch({
      payload: { response },
      type: types.SYSTEM_ESRURIBROADCAST_SUCCESS
    });
  };
}

export function callbackURIWithProcessed(callback) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_ESRURICALLBACK_PENDING
    });
    const {
      background,
      payload,
      url,
    } = callback;

    let s = url;
    esrParams.forEach((param) => {
      s = s.replace(`{{${param}}}`, payload[param]);
    });
    // If it's not a background call, return to state
    if (!background) {
      return dispatch({
        type: types.SYSTEM_ESRURICALLBACK_SUCCESS,
        payload: {
          background,
          s
        }
      });
    }
    // Otherwise execute background call
    httpClient
      .post(s, payload)
      .then(() => dispatch({
        type: types.SYSTEM_ESRURICALLBACK_SUCCESS,
        payload: {
          background,
          s
        }
      }))
      .catch((error) => dispatch({
        type: types.SYSTEM_ESRURICALLBACK_FAILURE,
        payload: {
          s,
          error,
        }
      }));
  };
}

export function clearURI() {
  return (dispatch: () => void) => dispatch({
    type: types.SYSTEM_ESRURI_RESET
  });
}

export function setURI(uri) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_ESRURI_PENDING
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
        type: types.SYSTEM_ESRURI_SUCCESS,
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
        type: types.SYSTEM_ESRURI_FAILURE,
        payload: {
          err,
          uri
        }
      });
    }
  };
}

const forbiddenActions = [
  {
    action: 'updateauth',
    contract: 'eosio',
    error: 'ESRURI_UPDATEAUTH_ACTIVE_FORBIDDEN',
    forbiddenData: {
      permission: 'active'
    }
  },
  {
    action: 'updateauth',
    contract: 'eosio',
    error: 'ESRURI_UPDATEAUTH_OWNER_FORBIDDEN',
    forbiddenData: {
      permission: 'owner'
    }
  },
  {
    action: 'linkauth',
    contract: 'eosio',
    error: 'ESRURI_LINKAUTH_UPDATEAUTH_FORBIDDEN',
    forbiddenData: {
      type: 'updateauth'
    }
  },
];

function checkRequest(data) {
  const errors = forbiddenActions.map((prevent) => {
    const { action, contract, error } = prevent;
    const matches = find(data.transaction.actions, { name: action, account: contract });
    if (matches) {
      if (prevent.forbiddenData) {
        const act = matches.data;
        const { forbiddenData } = prevent;
        const forbiddenExists = Object.keys(forbiddenData).map((field) =>
          (act[field] && act[field] === forbiddenData[field]));
        return (forbiddenExists.includes(true)) ? error : false;
      }
      return error;
    }
    return false;
  });
  return errors.filter(item => item !== false);
}

function arrayToHex(data) {
  let result = '';
  for (const x of data) {
    result += ('00' + x.toString(16)).slice(-2);
  }
  return result;
}

function unpackTransaction(bytes) {
  const buffer = new Serialize.SerialBuffer({
    array: bytes,
    textDecoder,
    textEncoder,
  })
  const type = transactionTypes.get('transaction');
  if (type) {
    return type.deserialize(buffer);
  }
  return {};
}

export function signURI(tx, blockchain, wallet, broadcast = false, callback = false) {
  return (dispatch: () => void, getState) => {
    const {
      auths,
      connection,
      prompt,
    } = getState();
    dispatch({
      type: types.SYSTEM_ESRURISIGN_PENDING
    });
    const networkConfig = Object.assign({}, connection, {
      chainId: blockchain.chainId,
      httpEndpoint: blockchain.node,
      signMethod: (wallet.mode === 'ledger') ? 'ledger' : false,
      signPath: (wallet.mode === 'ledger') ? wallet.path : false,
    });
    // Logic to pull unlocked auths from storage
    if (!networkConfig.signMethod && wallet.mode === 'hot') {
      const auth = find(auths.keystore, { pubkey: wallet.pubkey });
      if (auth) {
        networkConfig.keyProviderObfuscated = {
          key: auth.key,
          hash: auth.hash,
        };
      }
    }
    // Establish Signer
    const signer = eos(networkConfig, true, true);
    setTimeout(async () => {
      signer
        .transact(tx, {
          broadcast: false,
          expireSeconds: (broadcast) ? connection.expireSeconds : 3600,
          sign: true,
        })
        .then(async (signed) => {
          let broadcasted;
          if (broadcast) {
            broadcasted = await signer.pushSignedTransaction(signed);
          }
          dispatch({
            payload: {
              signed: (broadcasted)
                ? {
                  signatures: signed.signatures,
                  ...broadcasted
                }
                : {
                  signatures: signed.signatures,
                  transaction: unpackTransaction(signed.serializedTransaction),
                }
            },
            type: types.SYSTEM_ESRURISIGN_SUCCESS
          });
          if (
            (callback && broadcast)
            || (callback && !callback.broadcast)
          ) {
            const blockNum = (broadcasted) ? broadcasted.processed.block_num : null;
            const callbackParams = prompt.resolved.getCallback(signed.signatures, blockNum)
            dispatch(callbackURIWithProcessed(callbackParams));
          }
          if (broadcast) {
            dispatch({
              payload: {
                endpoint: networkConfig.httpEndpoint,
                response: broadcasted,
              },
              type: types.SYSTEM_ESRURIBROADCAST_SUCCESS
            });
          }
          return true;
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
            type: types.SYSTEM_ESRURISIGN_FAILURE
          });
        });
    }, 250);
  };
}

export function templateURI(blockchain, wallet) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ESRURIBUILD_PENDING,
    });
    const { prompt, settings } = getState();
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
    }, false, true);
    const head = (await EOS.getInfo(true)).head_block_num;
    const block = await EOS.getBlock(head);
    // Force 1hr expiration of txs, shouldn't hit
    block.expire_seconds = 60 * 60 * 1;
    if (wallet.mode === 'watch') {
      // Increase to 2hr for watch wallets
      block.expire_seconds = 60 * 60 * 2;
    }
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
      // Form the transaction
      const abis = await request.fetchAbis();
      const resolved = request.resolve(abis, authorization, block);
      const detectedForbiddenActions = checkRequest(resolved);
      if (detectedForbiddenActions && detectedForbiddenActions.length > 0) {
        if (settings.allowDangerousTransactions) {
          dispatch({
            type: types.SYSTEM_ESRURIBUILD_WARNING,
            payload: {
              warning: {
                message: detectedForbiddenActions[0],
                type: 'forbidden',
              },
              uri
            }
          });
        } else {
          return dispatch({
            type: types.SYSTEM_ESRURIBUILD_FAILURE,
            payload: {
              err: {
                message: detectedForbiddenActions[0],
                type: 'forbidden',
              },
              uri
            }
          });
        }
      }
      return dispatch({
        type: types.SYSTEM_ESRURIBUILD_SUCCESS,
        payload: {
          resolved,
        }
      });
    } catch (err) {
      return dispatch({
        type: types.SYSTEM_ESRURIBUILD_FAILURE,
        payload: { err },
      });
    }
  };
}

export default {
  broadcastURI,
  callbackURI,
  callbackURIWithProcessed,
  clearURI,
  setURI,
  signURI,
  templateURI
};
