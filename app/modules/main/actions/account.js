import fetch from 'node-fetch';
import { find } from 'lodash';

import { Bytes, KeyType, PublicKey, PrivateKey } from '@greymass/eosio';
import { CreateRequest } from '@greymass/account-creation';

import EOSAccount from '../../../shared/utils/EOS/Account';
import * as types from '../../../shared/actions/types';
import { changeModule } from './navigation';
import { swapBlockchain } from '../../../shared/actions/blockchains';
import { addPendingAccountCertificate, removePendingAccountCertificate } from '../../../shared/actions/pending';
import { importKeyStorage, importWallet, useWallet } from '../../../shared/actions/wallets';
import { createHttpHandler } from '../../../shared/utils/http/handler';

const creationAPI = 'https://create-api.anchor.link';

const historyAPIs = {
  aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906: 'http://eos.greymass.com',
  '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840': 'http://jungle3.greymass.com',
  '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0': 'http://proton.greymass.com',
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': 'http://telos.greymass.com',
  '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': 'http://wax.greymass.com',
};

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

export function beginAccountCreate(url) {
  return async (dispatch: () => void, getState) => {
    // Reset data upon initially receiving the request
    dispatch(resetAccountCreation());
    const { app, blockchains, settings } = getState();
    const [, data] = url.split(':');

    const request = CreateRequest.from(data);

    try {
      const response = await apiRequest('/tickets/verify', {
        code: request.code,
        deviceId: settings.deviceId,
        version: app.version,
      });
      const json = await response.json();
      const blockchain = find(blockchains, { chainId: json.chainId });
      if (response.ok) {
        dispatch({
          type: types.ACCOUNT_CREATION_CODE,
          payload: {
            ...json,
            blockchain,
            code: request.code,
            loginRequest: request.loginRequest.toString(),
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
      // If the API fails, remove pending cert (keys are still saved)
      dispatch(removePendingAccountCertificate({
        chainId,
        account: accountName,
        active: activeKey,
        owner: ownerKey
      }));
      return dispatch({
        type: types.ACCOUNT_CREATION_CODE_FAILED,
        payload: {
          error: json
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function createWallet(chainId, accountName, activeKey, isLedger = false) {
  return async (dispatch: () => void, getState) => {
    const { ledger, settings, storage } = getState();
    // Determine the wallet mode (hot vs ledger)
    let mode = 'hot';
    let path;
    if (isLedger) {
      mode = 'ledger';
      ({ path } = ledger);
    }
    // Check to ensure we're using the right key
    const { blockchains } = getState();
    const blockchain = find(blockchains, { chainId });
    const { httpClient } = await createHttpHandler({});
    const result = await httpClient.post(`${blockchain.node}/v1/chain/get_account`, {
      account_name: accountName,
      cachebreak: Date.now()
    });
    const accountObj = new EOSAccount(result.data);
    const permission = accountObj.getPermission('active');
    let publicKey;
    permission.required_auth.keys.forEach((key) => {
      if (key.weight === 1) {
        const pubkey = PublicKey.from(key.key).toLegacyString(blockchain.chainSymbol);
        if (storage.keys.includes(pubkey)) {
          publicKey = pubkey;
        }
      }
    });
    if (publicKey !== activeKey) {
      console.error(`Specified active key doesn't equal public key. Public: ${publicKey}, Active: ${activeKey}`);
    }
    if (!publicKey) {
      console.error(`Couldn't automatically import key: ${activeKey}`);
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

export function checkAccountNameValid(code, name) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.ACCOUNT_CREATION_CHECK_NAME_INVALIDATE,
      payload: { code, name }
    });
    const { app, settings } = getState();
    const response = await apiRequest('/tickets/check', {
      code,
      deviceId: settings.deviceId,
      name,
      version: app.version,
    }, settings);
    if (response.status === 200) {
      dispatch({
        type: types.ACCOUNT_CREATION_CHECK_NAME_VALID,
        payload: { code, name }
      });
    } else {
      dispatch({
        type: types.ACCOUNT_CREATION_CHECK_NAME_INVALID,
        payload: { code, name }
      });
    }
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

export function returnKeyCertificateCode(code) {
  return async (dispatch: () => void) => {
    dispatch({
      type: types.ACCOUNT_CREATION_CERT_CODE_RECEIVED,
      payload: code
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

export function returnKeyCertificateDecrypted(cert) {
  return async (dispatch: () => void, getState) => {
    const { httpClient } = await createHttpHandler({});
    const result = await httpClient.post(`${cert.blockchain.node}/v1/chain/get_account`, {
      account_name: cert.account.actor,
    });
    if (result.status === 200) {
      const auth = new EOSAccount(result.data).getAuthorization(cert.publicKey);
      if (auth === `${cert.account.actor}@${cert.account.permission}`) {
        return dispatch({
          type: types.ACCOUNT_KEY_CERTIFICATE_DECRYPTED,
          payload: cert
        });
      }
      return dispatch({
        type: types.ACCOUNT_KEY_CERTIFICATE_DECRYPTED_MISMATCH,
        payload: {
          account: cert.account,
          auth,
          blockchain: cert.blockchain.chainId,
          data: result.data.permissions,
          message: 'The key certificate does not match the account specified.',
          publicKey: cert.publicKey,
          server: cert.blockchain.node,
        }
      });
    }
    return dispatch({
      type: types.ACCOUNT_KEY_CERTIFICATE_DECRYPTED,
      payload: undefined
    });
  };
}

export function returnKeyCertificateFailed(error) {
  return async (dispatch: () => void) => {
    dispatch({
      type: types.ACCOUNT_KEY_CERTIFICATE_FAILED,
      payload: error
    });
  };
}

export function accountUpdatedViaCertificate(status) {
  return async (dispatch: () => void) => {
    // Establish the local wallet in Anchor
    dispatch(createWallet(status.chainId, status.accountName, status.publicKey));
    // Dispatch event to notify the frontend
    return dispatch({
      type: types.ACCOUNT_UPDATED_BY_KEY_CERTIFICATE,
      payload: status
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
  return async (dispatch: () => void) => {
    const node = historyAPIs[chainId];
    if (!node) {
      throw new Error('Invalid ChainID');
    }
    const { httpClient } = await createHttpHandler({});
    const result = await httpClient.post(`${node}/v1/history/get_transaction`, {
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
  checkAccountNameValid,
  createAccount,
  resetAccountCreation,
  returnKeyCertificateCode,
  returnKeyCertificateFailed,
  returnKeyCertificateWords,
  returnNewAccountKeys,
  verifyAccountExists,
  verifyTransactionExists,
};
