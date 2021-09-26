import { app } from 'electron'
import { scrypt } from 'crypto'
import fetch from 'electron-fetch'
import generatepdf from '@greymass/keycert-pdf'
import { generate } from '@greymass/keycert'
import { APIClient, FetchProvider, PrivateKey } from '@greymass/eosio'
import { EncryptedPrivateKey } from 'eosio-key-encryption'
import ptp from "pdf-to-printer";

import { find, forEach, partition, pluck, uniq } from 'lodash'

import * as types from '../../actions/types'
import { addPendingAccountCertificate } from '../../actions/pending'
import { decrypt } from '../../actions/wallet'
import { importKeyStorage } from '../../actions/wallets'

const CryptoJS = require('crypto-js')

import templateBase64String from './keycert/template'
import fontBase64String from './keycert/font'

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

function getKeycertParams(store, password, chainId, accountName, ownerPublicKey) {
  const { storage } = store.getState()
  const privateKey = retrievePrivateKey(storage, password, ownerPublicKey)
  return {
    privateKey: privateKey.key,
    account: {
      actor: accountName,
      permission: 'owner'
    },
    chainId,
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
  const params = getKeycertParams(
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

async function getKeyCertificatePdf(
  store,
  cert,
  chainId,
) {
  // Determin the blockchain and setup an API client
  const { blockchains } = store.getState()
  const blockchain = find(blockchains, { chainId })
  // Setup APIClient to call get_info with
  const provider = new FetchProvider(blockchain.node, {fetch})
  const client = new APIClient({
    provider
  })
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
let cachedWords;
let cachedPdf;

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
  printer,
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
  const filePath = `${app.getPath('documents')}/temporary-certificate.pdf`
  // Save the file to the specified path
  fs.writeFileSync(filePath, cachedPdf)
  // Print the PDF
  ptp.print(filePath, { printer }).then(() => {
    // Return the encryption keywords to the frontend
    event.sender.send('returnKeyCertificateWords', cachedWords)
    // Remove the temporary file
    fs.rmSync(filePath)
  });
}

export function resetKeyCertificateCache() {
  cachedPdf = undefined
  cachedWords = undefined
}
