import { find } from 'lodash';
import { get } from 'dot-prop-immutable';
import { Serialize } from 'eosjs2';
import { PrivateKey, PublicKey, Signature } from '@greymass/eosio';

import * as types from '../../../shared/actions/types';
import eos from '../../../shared/actions/helpers/eos';
import { createHttpHandler } from '../../../shared/utils/http/handler';

const { ipcRenderer } = require('electron');
const transactionAbi = require('eosjs2/node_modules/eosjs/src/transaction.abi.json');
const { SigningRequest, PlaceholderName, PlaceholderPermission } = require('eosio-signing-request');
const zlib = require('zlib');
const util = require('util');

const textEncoder = new util.TextEncoder();
const textDecoder = new util.TextDecoder();

const transactionTypes: Map<string, Serialize.Type> = Serialize.getTypesFromAbi(Serialize.createInitialTypes(), transactionAbi);
const esrParams = ['bn', 'ex', 'rbn', 'req', 'rid', 'sa', 'sig', 'sp', 'tx'];

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
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ESRURICALLBACK_PENDING
    });
    const { connection } = getState();
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
    const { httpClient } = await createHttpHandler(connection);
    httpClient
      .post(s, payload)
      .then(() => dispatch({
        type: types.SYSTEM_ESRURICALLBACK_SUCCESS,
        payload: {
          background,
          payload,
          s,
        }
      }))
      .catch((err) => dispatch({
        type: types.SYSTEM_ESRURICALLBACK_FAILURE,
        payload: {
          err,
          payload,
          s,
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
  return (dispatch: () => void, getState) => {
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
      // Catch old signing requests during v1 -> v2 spec upgrade
      let modified = uri.replace('eosio:', 'esr:');
      modified = uri.replace('esr-anchor:', 'esr:');
      // Interpret the Signing Request
      const request = SigningRequest.from(modified, opts);
      const req = JSON.parse(JSON.stringify(request.data.req));
      const placeholders = detectPlaceholders(req);
      // Extract relevant information
      const {
        data,
        version,
      } = request;
      const {
        broadcast,
        callback,
      } = data;
      // Get the requested chain(s)
      let chainId;
      if (request.isMultiChain()) {
        const { wallets } = getState();
        const chainIds = request.getChainIds();
        const accountChains = wallets.map(w => w.chainId);
        // Find the first chainId matching the request that is enabled
        const matchingRequest = chainIds && chainIds.filter((chain) =>
          accountChains.includes(chain.toString()));
        chainId = (matchingRequest || accountChains)[0];
      } else {
        chainId = request.getChainId();
      }
      return dispatch({
        type: types.SYSTEM_ESRURI_SUCCESS,
        payload: {
          broadcast,
          chainId: chainId.toString().toLowerCase(),
          callback,
          placeholders,
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

function detectPlaceholders(req) {
  const [reqType, reqData] = req;
  switch (reqType) {
    case 'action': {
      const matching = reqData.authorization.filter((auth) =>
        (auth.actor === PlaceholderName || auth.permission === PlaceholderPermission));
      return matching.length > 0;
    }
    case 'action[]': {
      const matching = reqData.filter((r) => r.authorization.filter((auth) =>
        (auth.actor === PlaceholderName || auth.permission === PlaceholderPermission)).length > 0);
      return matching.length > 0;
    }
    case 'transaction': {
      const matching = reqData.actions.filter((r) => r.authorization.filter((auth) =>
        (auth.actor === PlaceholderName || auth.permission === PlaceholderPermission)).length > 0);
      return matching.length > 0;
    }
    case 'identity': {
      // for now, always allow placeholders for identity
      return true;
    }
    default: {
      throw new Error('unrecognized request type');
    }
  }
}

const forbiddenActions = [
  // Prevent any eosio::updateauth commands
  {
    action: 'updateauth',
    contract: 'eosio',
    error: 'ESRURI_UPDATEAUTH_FORBIDDEN',
  },
  // Prevent any eosio::linkauth commands
  {
    action: 'linkauth',
    contract: 'eosio',
    error: 'ESRURI_LINKAUTH_FORBIDDEN',
  },
  // Prevent any eosio::updateauth commands involving active
  {
    action: 'updateauth',
    contract: 'eosio',
    error: 'ESRURI_UPDATEAUTH_ACTIVE_FORBIDDEN',
    forbiddenData: {
      permission: 'active'
    }
  },
  // Prevent any eosio::updateauth commands involving owner
  {
    action: 'updateauth',
    contract: 'eosio',
    error: 'ESRURI_UPDATEAUTH_OWNER_FORBIDDEN',
    forbiddenData: {
      permission: 'owner'
    }
  },
];

function checkRequest(data) {
  const errors = forbiddenActions.map((prevent) => {
    const { action, contract, error } = prevent;
    const actions = JSON.parse(JSON.stringify(data.transaction.actions));
    const matches = find(actions, { name: action, account: contract });
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
    result += (`00${x.toString(16)}`).slice(-2);
  }
  return result;
}

function unpackTransaction(bytes) {
  const buffer = new Serialize.SerialBuffer({
    array: bytes,
    textDecoder,
    textEncoder,
  });
  const type = transactionTypes.get('transaction');
  if (type) {
    return type.deserialize(buffer);
  }
  return {};
}

export function signIdentityRequest(
  prompt,
  blockchain,
  wallet,
) {
  return (dispatch: () => void, getState) => {
    const {
      auths,
      connection,
      settings,
      sessions,
    } = getState();
    const { enableSessions } = settings;
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
    const signer = eos(networkConfig, true, true);
    setTimeout(async () => {
      try {
        const requiredKeys = [String(PublicKey.from(wallet.pubkey))]
        const signed = await signer.sign({
          chainId: blockchain.chainId,
          requiredKeys,
          serializedTransaction: prompt.resolved.serializedTransaction,
        });
        const callbackParams = prompt.resolved.getCallback(signed.signatures, 0);
        if (enableSessions && prompt.resolved.request.isIdentity()) {
          const { info } = prompt.resolved.request.data;
          const isLinkSession = info.some((i) => i.key === 'link');
          if (isLinkSession) {
            callbackParams.payload = {
              ...callbackParams.payload,
              link_ch: `https://${sessions.linkUrl}/${sessions.linkId}`,
              link_key: PrivateKey.fromString(sessions.requestKey, true).toPublic().toString(),
              link_name: 'Anchor Desktop',
            };
            const session = {
              network: blockchain.chainId,
              actor: callbackParams.payload.sa,
              permission: callbackParams.payload.sp,
              payload: prompt.resolved.request.toString(),
            };
            ipcRenderer.send('addSession', session);
          }
        }
        dispatch({
          payload: {
            callbackParams,
            response: signed,
            signed: {
              signatures: signed.signatures,
              transaction: unpackTransaction(signed.serializedTransaction),
            }
          },
          type: types.SYSTEM_ESRURISIGN_SUCCESS
        });
        dispatch(callbackURIWithProcessed(callbackParams));
      } catch (err) {
        return dispatch({
          type: types.SYSTEM_ESRURISIGN_FAILURE,
          payload: { err },
        });
      }
    }, 250);
  };
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
    const [esrReqType] = prompt.req;
    setTimeout(async () => {
      signer
        .transact(tx, {
          broadcast: false,
          esrReqType,
          expireSeconds: (broadcast) ? connection.expireSeconds : 3600,
          sign: true,
        })
        .then(async (signed) => {
          let broadcasted;
          const shouldBroadcast = (
            prompt
            && prompt.resolved
            && prompt.resolved.request
            && prompt.resolved.request.shouldBroadcast
            && prompt.resolved.request.shouldBroadcast()
            && broadcast
          );
          if (shouldBroadcast) {
            const cosignerSig = prompt.resolved.request.getInfoKey('cosig', {
              type: Signature,
              array: true,
            });
            if (cosignerSig) {
              signed.transaction.signatures.unshift(...cosignerSig);
            }
            broadcasted = await signer.push(signed);
          }
          let callbackParams;
          if (
            (callback && broadcast)
            || (callback && !callback.broadcast)
          ) {
            const blockNum = (broadcasted) ? broadcasted.processed.block_num : null;
            callbackParams =
              prompt.resolved.getCallback &&
              prompt.resolved.getCallback(signed.transaction.signatures, blockNum);
            callbackParams && dispatch(callbackURIWithProcessed(callbackParams));
          }
          dispatch({
            payload: {
              callbackParams,
              response: broadcasted,
              signed: (broadcasted)
                ? {
                  signatures: signed.transaction.signatures,
                  ...broadcasted
                }
                : {
                  signatures: signed.transaction.signatures,
                  transaction: signed.transaction,
                }
            },
            type: types.SYSTEM_ESRURISIGN_SUCCESS
          });
          if (broadcasted) {
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

export function templateURI(blockchain, wallet, chainId = false) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ESRURIBUILD_PENDING,
    });
    const { connection, prompt, settings } = getState();
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
    try {
      // Setup decompression
      const opts = {
        zlib: {
          deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
          inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
        },
        abiProvider: {
          getAbi: async (account) => (await EOS.getAbi(account.toString())).abi
        }
      };
      // Interpret the Signing Request
      const request = SigningRequest.from(uri, opts);
      const costs = {
        cpu: request.getInfoKey('txfeecpu'),
        net: request.getInfoKey('txfeenet'),
        ram: request.getInfoKey('txfeeram'),
      };
      // Retrieve ABIs for this request
      const abis = await request.fetchAbis();
      // Resolve the transaction
      let header = {};
      if (!request.isIdentity()) {
        header = await EOS.getTransactionHeader(connection.expireSeconds);
      }
      if (request.isMultiChain()) {
        header.chainId = blockchain.chainId;
      }
      const resolved = request.resolve(abis, authorization, header);
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
      const contracts = Array.from(abis);
      let contract;
      if (contracts.length) {
        contract = {
          account_name: contracts[0][0],
          abi: contracts[0][1],
        };
      }
      return dispatch({
        type: types.SYSTEM_ESRURIBUILD_SUCCESS,
        payload: {
          costs,
          chainId: header.chainId || blockchain.chainId,
          contract,
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

export function mockDispatch(typeName, payload = {}) {
  return (dispatch: () => void) => {
    dispatch({
      type: types[typeName],
      payload
    });
  };
}

export default {
  broadcastURI,
  callbackURI,
  callbackURIWithProcessed,
  clearURI,
  mockDispatch,
  setURI,
  signURI,
  signIdentityRequest,
  templateURI
};
