import { app, BrowserWindow } from 'electron'
import { scrypt } from 'crypto'
import fetch from 'electron-fetch'
import generatepdf from '@greymass/keycert-pdf'
import { decrypt as decryptKeyCert, generate, KeyCertificate } from '@greymass/keycert'
import { Action, APIClient, FetchProvider, Name, PublicKey, PrivateKey, SignedTransaction, Transaction } from '@greymass/eosio'
import { SigningRequest } from 'eosio-signing-request'
import { EncryptedPrivateKey } from 'eosio-key-encryption'

import { find, forEach, partition, pluck, uniq } from 'lodash'

import * as types from '../../actions/types'
import { addPendingAccountCertificate } from '../../actions/pending'
import { decrypt } from '../../actions/wallet'
import { importKeyStorage } from '../../actions/wallets'
import { fuelEndpoints } from '../../utils/EOS/Handler'
import * as ValidateFuel from '../../utils/EOS/ValidateFuel'
import EOSAccount from '../../utils/EOS/Account';

import templateBase64String from './keycert/template'
import fontBase64String from './keycert/font'

const CryptoJS = require('crypto-js')
const zlib = require('zlib')

const opts = {
  zlib: {
    deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
    inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
  }
}

const { dialog } = require('electron')
const fs = require('fs')

EncryptedPrivateKey.scrypt = (password, salt, N, r, p, dkLen) =>
    new Promise((resolve, reject) => {
        scrypt(
            password,
            salt,
            dkLen,
            {N, r, p, maxmem: 1024 * 1024 * 1024},
            (err, derivedKey) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(derivedKey)
                }
            }
        )
    })

function retrievePrivateKey(storage, password, publicKey) {
  const decrypted = JSON.parse(decrypt(storage.data, password).toString(CryptoJS.enc.Utf8))
  const privateKey = find(decrypted, { pubkey: publicKey})
  return privateKey
}

function generateNewAccountKeys(
  store,
  password,
  blockchain,
  accountName,
  ownerKey = false,
  activeKey = false
) {
  let ownerPublicKey = ownerKey
  let activePublicKey = activeKey

  // If no owner key was passed during creation, create
  if (!ownerPublicKey) {
    // Generate the owner key
    const ownerPrivate = PrivateKey.generate('K1')
    // Set the public key to this newly generated key
    ownerPublicKey = ownerPrivate.toPublic().toLegacyString(blockchain.keyPrefix)
    // Import the owner key temporarily until backup sheet is created
    store.dispatch(importKeyStorage(
      password,
      ownerPrivate.toWif(),
      ownerPublicKey
    ))
  }

  // If no owner key was passed during creation, create
  if (!activePublicKey) {
    // Generate the active key
    const activePrivate = PrivateKey.generate('K1')
    // Set the public key to this newly generated key
    activePublicKey = activePrivate.toPublic().toLegacyString(blockchain.keyPrefix)
    // Import the active key for normal usage
    store.dispatch(importKeyStorage(
      password,
      activePrivate.toWif(),
      activePublicKey
    ))
  }

  // If an owner key was generated and stored, add a pending notification of its required backup
  if (!ownerKey) {
    // Save notification that an owner key certificate needs to be created
    store.dispatch(addPendingAccountCertificate({
      chainId: blockchain.chainId,
      account: accountName,
      active: activePublicKey,
      owner: ownerPublicKey,
    }))
  }

  // Return the public keys
  return {
    active: activePublicKey,
    owner: ownerPublicKey,
  }
}

async function getKeycertParams(store, password, chainId, accountName, expectedPublicKey) {
  const { storage } = store.getState()
  const client = getAPIClient(store, chainId)
  const account = await client.v1.chain.get_account(accountName)
  const accountObj = new EOSAccount(JSON.parse(JSON.stringify(account)))
  const permission = accountObj.getPermission('owner')
  if(!permission) {
    throw new Error('Could not find owner permission.')
  }
  if(!permission.required_auth) {
    throw new Error('Invalid permission, no required auths.')
  }
  if(!permission.required_auth.keys.length) {
    throw new Error('Invalid owner permission, no key auths to reference.')
  }
  let privateKey
  permission.required_auth.keys.forEach((key) => {
    if (key.weight === 1) {
      const pubkey = PublicKey.from(key.key)
      const attemptedKey = retrievePrivateKey(storage, password, String(pubkey))
      if (attemptedKey) {
        privateKey = attemptedKey
      } else {
        const attemptedKey2 = retrievePrivateKey(storage, password, String(pubkey.toLegacyString()))
        if (attemptedKey2) {
          privateKey = attemptedKey2
        }
      }
    }
  })
  if (!privateKey) {
    throw new Error('Owner permission not found in keystore.')
  }
  if (privateKey.pubkey !== expectedPublicKey) {
    console.log(`The expected pubkey didn't match the key in storage, expected: ${expectedPublicKey}, received: ${privateKey.pubkey}. Automatically corrected and exported correct key based on chain results.`)
  }
  return {
    privateKey: privateKey.key,
    account: {
      actor: accountName,
      permission: 'owner'
    },
    chainId,
    deterministicWords: true
  }
}

export async function generateKeyCert(
  store,
  password,
  publicKey,
  chainId,
  accountName,
) {
  // Generate the keycert and keys (if required)
  const params = await getKeycertParams(
    store,
    password,
    chainId,
    accountName,
    publicKey,
  )
  // Generate key certificate
  const keycert = await generate(params)
  return keycert
}

export function generateNewAccount(
  event,
  store,
  password,
  chainId,
  accountName,
  ownerKey = false,
  activeKey = false,
) {
  // Find the appropriate blockchain information
  const { blockchains } = store.getState()
  const blockchain = find(blockchains, { chainId })
  // Generate keys and save keys for new account
  const {
    active,
    owner
  } = generateNewAccountKeys(store, password, blockchain, accountName, ownerKey, activeKey)
  // Return public keys back to renderer
  event.sender.send('returnNewAccountKeys', chainId, accountName, active, owner)
}

function getAPIClient(store, chainId) {
  // Determin the blockchain and setup an API client
  const { blockchains } = store.getState()
  const blockchain = find(blockchains, { chainId })
  // Setup APIClient to call get_info with
  const provider = new FetchProvider(blockchain.node, {fetch})
  const client = new APIClient({
    provider
  })
  return client
}

async function getKeyCertificatePdf(
  store,
  cert,
  chainId,
) {
  const client = getAPIClient(store, chainId)
  // Load state from the chain to populate the PDF with
  const state = await client.v1.chain.get_info()
  // Generate and return PDF
  const pdfBytes = await generatepdf({
    cert,
    font: Buffer.from(fontBase64String, 'base64').buffer,
    state,
    template: Buffer.from(templateBase64String, 'base64').buffer,
  })
  return pdfBytes
}

// Cached versions allowing user to print and save
let cachedWords
let cachedPdf

export async function saveKeyCertificate(
  event,
  store,
  password,
  publicKey,
  chainId,
  accountName,
) {
  if (!cachedPdf) {
    // Generate the certificate based on the account information provided
    const {cert, encryptionWords} = await generateKeyCert(store, password, publicKey, chainId, accountName)
    // Cache the words in the event the user wants to print after saving
    cachedWords = encryptionWords
    // Generate the PDF the user is to backup
    cachedPdf = await getKeyCertificatePdf(store, cert, chainId)
  }
  // Save the file
  const defaultPath = app.getPath('documents')
  const ext = 'pdf'
  const defaultFilename = `certificate.${ext}`
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save your owner key certificate',
    defaultPath: `${defaultPath}/${defaultFilename}`,
    filters: [
      { name: ext, extensions: [ext] }
    ]
  })
  // If the user cancels or this fails, emit an event to the renderer
  if (canceled || !filePath) {
    event.sender.send('cancelKeyCertificate')
  } else {
    // Save the file to the specified path
    fs.writeFileSync(filePath, cachedPdf)
    // Return the encryption keywords to the frontend
    event.sender.send('returnKeyCertificateWords', cachedWords)
  }
}


export async function printKeyCertificate(
  event,
  store,
  password,
  publicKey,
  chainId,
  accountName,
) {
  if (!cachedPdf) {
    // Generate the certificate based on the account information provided
    const {cert, encryptionWords} = await generateKeyCert(store, password, publicKey, chainId, accountName)
    // Cache the words in the event the user wants to print after saving
    cachedWords = encryptionWords
    // Generate the PDF the user is to backup
    cachedPdf = await getKeyCertificatePdf(store, cert, chainId)
  }
  // Save the file
  const filePath = `${app.getPath('documents')}/owner-key-certificate.pdf`
  // Save the file to the specified path
  fs.writeFileSync(filePath, cachedPdf)
  // Open a new BrowserWindow with the PDF allowing the user to print
  const printerWindow = new BrowserWindow({
    autoHideMenuBar: true,
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // Load the PDF into the BrowserWindow
  printerWindow.loadFile(filePath)
  // When the window closes, return the certificate keywords
  printerWindow.on('closed', () => {
    try {
      // Remove the temporary file
      fs.rmSync(filePath)
    } catch (e) {
      // No catch
    } finally {
      // Return the encryption keywords to the frontend
      event.sender.send('returnKeyCertificateWords', cachedWords)
    }
  })
}

export function resetKeyCertificateCache() {
  cachedPdf = undefined
  cachedWords = undefined
}

async function decryptCertificate(certificate, encryptionWords) {
  const cert = KeyCertificate.from(certificate)
  const decrypted = await decryptKeyCert(cert, encryptionWords)
  return decrypted
}

export async function decryptKeyCertificate(event, store, certificate, encryptionWords) {
  // Decrypt the key certificate
  try {
    const decrypted = await decryptCertificate(certificate, encryptionWords)
    // Find the appropriate blockchain information
    const chainId = String(decrypted.chainId)
    const { blockchains } = store.getState()
    const blockchain = find(blockchains, { chainId })
    event.sender.send('returnKeyCertificateDecrypted', {
      publicKey: decrypted.privateKey.toPublic().toLegacyString(blockchain.keyPrefix),
      account: JSON.parse(JSON.stringify(decrypted.account)),
      blockchain,
      chainId,
    })
  } catch (e) {
    console.log(e)
    event.sender.send('returnKeyCertificateFailed', {
      message: 'Failed to decrypt key certificate',
      error: e
    })
  }
}

export async function updateKeyWithCertificate(event, store, password, certificate, encryptionWords, reset = false) {
  // Decrypt the key certificate
  const decrypted = await decryptCertificate(certificate, encryptionWords)
  // Find the appropriate blockchain information
  const chainId = String(decrypted.chainId)
  const { blockchains } = store.getState()
  const blockchain = find(blockchains, { chainId })
  // Generate the new key
  const newPrivateKey = PrivateKey.generate('K1')
  // Get the public key to this newly generated key
  const newPublicKey = newPrivateKey.toPublic()
  // Import the new key into Anchor
  store.dispatch(importKeyStorage(
    password,
    newPrivateKey.toWif(),
    newPublicKey.toLegacyString(blockchain.keyPrefix)
  ))
  // API Client for use
  const client = getAPIClient(store, chainId)
  // Generate the update auth transaction with or without Fuel
  const updateauth = await generateUpdateAuthTransaction(
    client,
    chainId,
    decrypted.account,
    newPublicKey,
    reset
  )
  // Assemble/sign the transaction with the owner key
  const transaction = Transaction.from(updateauth.transaction)
  const signature = decrypted.privateKey.signDigest(transaction.signingDigest(chainId))
  const signedTransaction = SignedTransaction.from({
      ...transaction,
      signatures: [...updateauth.signatures, signature],
  })
  // Broadcast
  const response = await client.v1.chain.push_transaction(signedTransaction)
  if (response.transaction_id) {
    // notify renderer
    event.sender.send('accountUpdatedViaCertificate',   {
      accountName: String(decrypted.account.actor),
      chainId,
      publicKey: newPublicKey.toLegacyString(blockchain.keyPrefix),
      transactionId: response.transaction_id,
    })
  }
}

async function generateUpdateAuthTransaction(client, chainId, signer, publicKey, reset = false) {
  // Load required info
  const info = await client.v1.chain.get_info()
  const {abi} = await client.v1.chain.get_abi('eosio')
  // Load existing account data to base permissions upon
  const accountData = await client.v1.chain.get_account(signer.actor)
  const permissions = JSON.parse(JSON.stringify(accountData.permissions))
  const activePermission = find(permissions, {
    perm_name: 'active'
  })
  // Set auth defaults
  const auth = {
    threshold: 1,
    keys: activePermission.required_auth.keys,
    accounts: activePermission.required_auth.accounts,
    waits: activePermission.required_auth.waits,
  }
  // Define the new auth using the public key
  const newAuth = {
    key: publicKey,
    weight: 1,
  }
  // If we are resetting, remove other keys and add this new one
  if (reset) {
    auth.keys = [newAuth]
  } else {
    // else append this key to the array of existing keys
    auth.keys = [
      ...auth.keys,
      newAuth
    ].sort((k1, k2) => (k1.key < k2.key ? -1 : 1)) // sort keys
  }
  // Create transaction
  const action = Action.from({
    account: 'eosio',
    name: 'updateauth',
    authorization: [signer],
    data: {
      account: signer.actor,
      auth,
      parent: 'owner',
      permission: 'active',
    }
  }, abi)
  const transaction = Transaction.from({
    ...info.getTransactionHeader(),
    actions: [action]
  })
  // Attempt to load signature from Fuel
  try {
    const response = await getFuelSignature(chainId, transaction, signer)
    if (response) {
      // If Fuel responded, use the new transaction
      return response
    }
  } catch(e) {
    console.log(e)
  }
  // else use the original transaction without Fuel
  return {
    signatures: [],
    transaction
  }
}

async function getFuelSignature(chainId, tx, signer) {
  // Retrieve appropriate endpoint
  const endpoint = fuelEndpoints[chainId]
  // If no endpoint, not applicable
  if (!endpoint) return null
  // Create an ESR payload to make the request with
  const request = await SigningRequest.create({
    transaction: tx,
    chainId,
  }, opts)
  // Call the API and get the signature
  const response = await fetch(`${endpoint}/v1/resource_provider/request_transaction`, {
    method: 'POST',
    body: JSON.stringify({
      request,
      signer,
    })
  })
  const { status } = response
  // If the response was valid, return the signature and modified transaction
  if (status === 200 ) {
    const json = await response.json()
    const { request, signatures } = json.data
    const [, requestData] = request
    // Validate the returned data against the requested data
    await ValidateFuel.validateTransaction(
      signer,
      requestData,
      JSON.parse(JSON.stringify(tx))
    )
    // So long as the validation doesn't throw an exception, return signature and new transaction
    return {
      signatures,
      transaction: requestData,
    }
  }
  return null
}

export function getKeyCertificateCode(event, chainId, accountName, mnemonicWords) {
  const cert = KeyCertificate.from({
    chainId,
    account: {
      actor: accountName,
      permission: 'owner',
    },
    key: mnemonicWords,
  });
  event.sender.send('returnKeyCertificateCode', String(cert))
}
