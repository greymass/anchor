import { find } from 'lodash';
import { get } from 'dot-prop-immutable';
import { Serialize } from 'eosjs2';

import * as types from '../../../shared/actions/types';
import eos from '../../../shared/actions/helpers/eos';
import { httpClient } from '../../../shared/utils/httpClient';

const { ipcRenderer } = require('electron');
const transactionAbi = require('eosjs2/node_modules/eosjs/src/transaction.abi.json');
const { SigningRequest } = require('eosio-uri');
const zlib = require('zlib');
const util = require('util');

const textEncoder = new util.TextEncoder();
const textDecoder = new util.TextDecoder();

const transactionTypes: Map<string, Serialize.Type> = Serialize.getTypesFromAbi(Serialize.createInitialTypes(), transactionAbi);
const esrParams = ['bn', 'ex', 'rbn', 'req', 'rid', 'sa', 'sig', 'sp', 'tx']

export function broadcastURI(tx, blockchain, callback = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_EOSIOURIBROADCAST_PENDING
    });
    const {
      connection,
      prompt,
    } = getState();
    if (!blockchain) {
      return dispatch({
        payload: { err: 'no_blockchain' },
        type: types.SYSTEM_EOSIOURIBROADCAST_FAILURE
      });
    }
    // If the prompt itself disables the broadcast, only issue callback
    if (!prompt.broadcast) {
      if (callback) {
        const account = get(tx, 'transaction.transaction.actions.0.authorization.0.actor');
        const authorization = get(tx, 'transaction.transaction.actions.0.authorization.0.permission');
        return dispatch(callbackURIWithProcessed({
          bn: null,
          ex: connection.expireInSeconds,
          rbn: tx.transaction.transaction.ref_block_num,
          req: prompt.uri,
          rid: tx.transaction.transaction.ref_block_prefix,
          sa: account,
          sig: tx.transaction.signatures[0],
          sp: authorization,
          tx: tx.transaction_id,
        }, callback));
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
          const account = get(tx, 'transaction.transaction.actions.0.authorization.0.actor');
          const authorization = get(tx, 'transaction.transaction.actions.0.authorization.0.permission');
          dispatch(callbackURIWithProcessed({
            bn: response.processed.block_num,
            ex: connection.expireInSeconds,
            rbn: tx.transaction.transaction.ref_block_num,
            req: prompt.uri,
            rid: tx.transaction.transaction.ref_block_prefix,
            sa: account,
            sig: tx.transaction.signatures[0],
            sp: authorization,
            tx: tx.transaction_id,
          }, callback));
        }
        return dispatch({
          payload: {
            endpoint: modified.httpEndpoint,
            response
          },
          type: types.SYSTEM_EOSIOURIBROADCAST_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_EOSIOURIBROADCAST_FAILURE
      }));
  };
}

export function callbackURI(tx, blockchain, callback = false) {
  return async (dispatch: () => void, getState) => {
    const { connection } = getState();
    dispatch({
      type: types.SYSTEM_EOSIOURIBROADCAST_PENDING
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
    dispatch(callbackURIWithProcessed({
      bn: null,
      ex: connection.expireInSeconds,
      rbn: tx.transaction.transaction.ref_block_num,
      req: prompt.uri,
      rid: tx.transaction.transaction.ref_block_prefix,
      sa: account,
      sig: tx.transaction.signatures[0],
      sp: authorization,
      tx: tx.transaction_id,
    }, callback));
    return dispatch({
      payload: { response },
      type: types.SYSTEM_EOSIOURIBROADCAST_SUCCESS
    });
  };
}

export function callbackURIWithProcessed(values, callback) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_EOSIOURICALLBACK_PENDING
    });
    const {
      background,
      url
    } = callback;

    let s = url;
    esrParams.forEach((param) => {
      s = s.replace(`{{${param}}}`, values[param]);
    });
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
      .post(s, values)
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

const forbiddenActions = [
  {
    action: 'updateauth',
    contract: 'eosio',
    error: 'EOSIOURI_UPDATEAUTH_ACTIVE_FORBIDDEN',
    forbiddenData: {
      permission: 'active'
    }
  },
  {
    action: 'updateauth',
    contract: 'eosio',
    error: 'EOSIOURI_UPDATEAUTH_OWNER_FORBIDDEN',
    forbiddenData: {
      permission: 'owner'
    }
  },
  {
    action: 'linkauth',
    contract: 'eosio',
    error: 'EOSIOURI_LINKAUTH_UPDATEAUTH_FORBIDDEN',
    forbiddenData: {
      type: 'updateauth'
    }
  },
];

function checkRequest(data) {
  const errors = forbiddenActions.map((prevent) => {
    const { action, contract, error } = prevent;
    const matches = find(data.actions, { name: action, account: contract });
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
          expireInSeconds: (broadcast) ? connection.expireInSeconds : 3600,
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
            type: types.SYSTEM_EOSIOURISIGN_SUCCESS
          });
          const hasCallback = (callback && callback.url)
          if (
            (callback && broadcast)
            || (callback && !callback.broadcast)
          ) {
            dispatch(callbackURIWithProcessed({
              bn: (broadcast) ? broadcasted.processed.block_num : null,
              ex: connection.expireInSeconds,
              rbn: tx.ref_block_num,
              req: prompt.uri,
              rid: tx.ref_block_prefix,
              sa: wallet.account,
              sig: signed.signatures[0],
              sp: wallet.authorization,
              tx: signed.transaction_id,
            }, callback));
          }
          if (broadcast) {
            dispatch({
              payload: {
                endpoint: networkConfig.httpEndpoint,
                response: broadcasted,
              },
              type: types.SYSTEM_EOSIOURIBROADCAST_SUCCESS
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
      const detectedForbiddenActions = checkRequest(data);
      if (detectedForbiddenActions && detectedForbiddenActions.length > 0) {
        if (settings.allowDangerousTransactions) {
          dispatch({
            type: types.SYSTEM_EOSIOURIBUILD_WARNING,
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
            type: types.SYSTEM_EOSIOURIBUILD_FAILURE,
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
  callbackURI,
  callbackURIWithProcessed,
  clearURI,
  setURI,
  signURI,
  templateURI
};
