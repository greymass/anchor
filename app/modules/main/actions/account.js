import fetch from 'node-fetch';
import { find } from 'lodash';

import { Bytes, KeyType, PrivateKey, Serializer, Struct } from '@greymass/eosio';
import { Base64u } from 'eosio-signing-request';

import * as types from '../../../shared/actions/types';
import { changeModule } from './navigation';
import { swapBlockchain } from '../../../shared/actions/blockchains';
import { addPendingAccountCertificate } from '../../../shared/actions/pending';
import { importKeyStorage, importWallet, useWallet } from '../../../shared/actions/wallets';
import { createHttpHandler } from '../../../shared/utils/http/handler';

const creationAPI = 'https://create-api.anchor.link';

async function generateSignatureForBody(bodyBytes) {
  let key;
  try {
    (key = require('./token.js'));
  } catch (e) {
    (key = require('./default-token.js'));
  }
  if (typeof key === 'string') {
    key = JSON.parse(key);
  }
  const parsed = key.slice(4).map((b, i) => b ^ (42 * i));
  const privateKey = new PrivateKey(KeyType.K1, Bytes.from(parsed));
  return String(privateKey.signMessage(bodyBytes));
}

async function apiRequest(path, requestBody) {
  const requestBodyInBytes = Bytes.from(JSON.stringify(requestBody), 'utf8');
  const signature = await generateSignatureForBody(requestBodyInBytes);
  const results = await fetch(`${creationAPI}${path}`, {
    method: 'POST',
    headers: {
      'X-Request-Sig': signature,
      'Content-Type': 'application/json',
    },
    body: requestBodyInBytes.toString('utf8'),
  });
  return results;
}

class CreateRequest extends Struct {
    static abiName = 'create_request'
    static abiFields = [
      {
        name: 'code',
        type: 'string',
      },
      {
        name: 'loginUrl',
        type: 'string?',
      },
    ]
}

export function beginAccountCreate(url) {
  return async (dispatch: () => void, getState) => {
    // Reset data upon initially receiving the request
    dispatch(resetAccountCreation());
    const { app, blockchains, settings } = getState();
    const [, data] = url.split(':');
    const decoded = Base64u.decode(data);
    const [version, ...payload] = decoded;
    const request = Serializer.decode({
      data: Bytes.from(payload),
      type: CreateRequest
    });
    try {
      const response = await apiRequest('/tickets/verify', {
        code: request.code,
        deviceId: settings.deviceId,
        version: app.version,
      }, settings);
      const json = await response.json();
      const blockchain = find(blockchains, { chainId: json.chainId });
      if (response.ok) {
        dispatch({
          type: types.ACCOUNT_CREATION_CODE,
          payload: {
            ...json,
            blockchain,
            code: request.code,
          }
        });
      }
      if (!response.ok) {
        switch (json.reason) {
          case 'Ticket already used': {
            dispatch({
              type: types.ACCOUNT_CREATION_CODE_USED,
              payload: {
                ...json,
                blockchain,
                error: 'This code has already been used to create an account and cannot be used again.',
                code: request.code,
              }
            });
            break;
          }
          default: {
            throw new Error('An unknown error occurred during account creation.', json);
          }
        }
      }
      dispatch(changeModule('home/account/code'));
    } catch (e) {
      console.error(e);
    }
  };
}

export function createAccount(code, chainId, accountName, activeKey, ownerKey) {
  return async (dispatch: () => void, getState) => {
    try {
      const { app, settings } = getState();
      const response = await apiRequest('/tickets/create', {
        accountName,
        activeKey,
        code,
        deviceId: settings.deviceId,
        ownerKey,
        version: app.version,
      });
      const json = await response.json();
      if (response.ok) {
        return dispatch({
          type: types.ACCOUNT_CREATION_CODE_REDEEMED,
          payload: json.transactionId
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export function createWallet(chainId, accountName, activeKey, isLedger = false) {
  return async (dispatch: () => void, getState) => {
    const { ledger, settings } = getState();
    // Determine the wallet mode (hot vs ledger)
    let mode = 'hot';
    let path;
    if (isLedger) {
      mode = 'ledger';
      ({ path } = ledger);
    }
    // Create the wallet definition
    dispatch(importWallet(chainId, accountName, 'active', false, false, mode, activeKey, path));
    setTimeout(() => {
      // If no chainId is selected, use this
      if (!settings.chainId) {
        dispatch(swapBlockchain(chainId));
      }
      // If no account is selected, use this
      if (!settings.account) {
        dispatch(useWallet(chainId, accountName, 'active'));
      }
    }, 1000);
  };
}

export function importCreatedAccountKeys(
  password,
  chainId,
  accountName,
  ownerPrivate,
  activePrivate
) {
  return async (dispatch: () => void, getState) => {
    const { blockchains } = getState();
    const blockchain = find(blockchains, { chainId });
    // Import the owner key temporarily until backup sheet is created
    dispatch(importKeyStorage(
      password,
      ownerPrivate.toWif(),
      ownerPrivate.toPublic().toLegacyString(blockchain.keyPrefix)
    ));
    // Import the active key for normal usage
    dispatch(importKeyStorage(
      password,
      activePrivate.toWif(),
      activePrivate.toPublic().toLegacyString(blockchain.keyPrefix)
    ));
    // Save notification that an owner key certificate needs to be created
    dispatch(addPendingAccountCertificate({
      chainId,
      account: accountName,
      active: String(activePrivate.toPublic()),
      owner: String(ownerPrivate.toPublic())
    }));
  };
}

export function cancelKeyCertificate(cert) {
  return async (dispatch: () => void) => {
    dispatch({
      type: types.ACCOUNT_CREATION_CERT_RECEIVE_CANCELLED,
      payload: cert
    });
  };
}

export function returnKeyCertificateWords(words) {
  return async (dispatch: () => void) => {
    dispatch({
      type: types.ACCOUNT_CREATION_CERT_WORDS_RECEIVED,
      payload: words
    });
  };
}

export function returnNewAccountKeys(chainId, accountName, active, owner) {
  return async (dispatch: () => void) => {
    dispatch({
      type: types.ACCOUNT_CREATION_NEW_ACCOUNT_RECEIVED,
      payload: {
        chainId, accountName, active, owner
      }
    });
  };
}

export function resetAccountCreation() {
  return async (dispatch: () => void) => {
    dispatch({
      type: types.ACCOUNT_CREATION_RESET,
    });
  };
}

export function verifyTransactionExists(chainId, transactionId) {
  return async (dispatch: () => void, getState) => {
    const { blockchains } = getState();
    const blockchain = find(blockchains, { chainId });
    const { httpClient } = await createHttpHandler({});
    const result = await httpClient.post(`${blockchain.node}/v1/history/get_transaction`, {
      id: transactionId,
      traces: false,
    });
    dispatch({
      type: types.ACCOUNT_CREATION_VERIFY_TRANSACTION,
      payload: {
        block_num: (result.status === 200) ? result.data.block_num : false,
        last_irreversible_block: (result.status === 200)
          ? result.data.last_irreversible_block
          : false,
        irreversible: (result.status === 200) ? result.data.irreversible : false,
        status: result.status,
      }
    });
  };
}

export function verifyAccountExists(chainId, account, activeKey) {
  return async (dispatch: () => void, getState) => {
    const { blockchains } = getState();
    const blockchain = find(blockchains, { chainId });
    const { httpClient } = await createHttpHandler({});
    const result = await httpClient.post(`${blockchain.node}/v1/chain/get_account`, {
      account_name: account,
    });
    dispatch({
      type: types.ACCOUNT_CREATION_VERIFY_ACCOUNT,
      payload: {
        created: (result.status === 200) ? result.data.created : false,
        status: result.status,
      }
    });
  };
}


export default {
  beginAccountCreate,
  cancelKeyCertificate,
  createAccount,
  resetAccountCreation,
  returnKeyCertificateWords,
  returnNewAccountKeys,
  verifyAccountExists,
  verifyTransactionExists,
};
