import { clone, find, keys, map, omit, pickBy } from 'lodash';
import eos from '../actions/helpers/eos';

const { screen } = require('electron');

const { SigningRequest } = require('eosio-signing-request');
const notifier = require('node-notifier');
const path = require('path');

const log = require('electron-log');
const util = require('util');
const zlib = require('zlib');

const textEncoder = new util.TextEncoder();
const textDecoder = new util.TextDecoder();

export default async function handleUri(resourcePath, store, mainWindow, pHandler, url) {
  // Create the prompt in the center of whichever screen is clicked on from.
  const cursor = screen.getCursorScreenPoint();
  const promptBounds = pHandler.getBounds();
  const currentScreen = screen.getDisplayNearestPoint({ x: cursor.x, y: cursor.y });
  const outOfBoundsX = promptBounds.x + promptBounds.width > currentScreen.bounds.x + currentScreen.bounds.width;
  const outOfBoundsY = promptBounds.y + promptBounds.height > currentScreen.bounds.y + currentScreen.bounds.height;
  const outOfBounds = outOfBoundsX || outOfBoundsY;
  if (outOfBounds) {
    const x = parseInt(currentScreen.workArea.x + ((currentScreen.workArea.width - promptBounds.width) / 2), 10);
    const y = parseInt(currentScreen.workArea.y + ((currentScreen.workArea.height - promptBounds.height) / 2), 10);
    pHandler.setBounds({
      x,
      y,
      width: promptBounds.width,
      height: promptBounds.height,
    });
  }

  if (url.startsWith('anchorcreate:')) {
    mainWindow.webContents.send('accountCreate', url);
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setVisibleOnAllWorkspaces(false);
  }

  if (url.startsWith('esr:') || url.startsWith('esr-anchor:')) {
    const modified = url.replace('esr-anchor:', 'esr:');
    pHandler.webContents.send('openUri', modified);
    pHandler.setVisibleOnAllWorkspaces(true);
    pHandler.show();
    pHandler.focus();
    pHandler.setVisibleOnAllWorkspaces(false);
  }

  // For the current version, just prompt and don't process whitelist (code above)
  // The code below the return is not yet production ready.
  // log.info('app: open-url', url);
  // const opts = {
  //   textEncoder,
  //   textDecoder,
  //   zlib: {
  //     deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
  //     inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
  //   },
  // };
  // // Interpret the Signing Request
  // const request = SigningRequest.from(url, opts);
  // // Extract relevant information
  // const {
  //   auths,
  //   blockchains,
  //   wallets,
  //   whitelist
  // } = store.getState();
  //
  // const chainId = request.getChainId().toLowerCase();
  // log.info('requested chainId');
  // log.info(chainId);
  //
  // const blockchain = find(blockchains, { chainId });
  // log.info('blockchain');
  // log.info(JSON.stringify(blockchain));
  //
  // let authorization;
  // let contractName;
  // switch (request.data.req[0]) {
  //   default:
  //   case 'action':
  //     authorization = request.data.req[1].authorization[0];
  //     contractName = request.data.req[1].account;
  //     break;
  //   case 'action[]':
  //     authorization = request.data.req[1][0].authorization[0];
  //     contractName = request.data.req[1][0].account;
  //     break;
  //   case 'transaction':
  //     authorization = request.data.req[1].actions[0].authorization[0];
  //     contractName = request.data.req[1].actions[0].account;
  //     break;
  // }
  //
  // log.info('authorization:');
  // log.info(JSON.stringify(authorization));
  //
  // const entry = find(whitelist, {
  //   auth: [authorization.actor, authorization.permission].join('@'),
  //   chainId,
  //   contract: contractName,
  // });
  //
  // log.info('detected whitelist entry:');
  // log.info(JSON.stringify(entry));
  //
  // if (entry) {
  //   const { actions, flexible } = entry;
  //   const EOS = eos({
  //     chainId: blockchain.chainId,
  //     httpEndpoint: blockchain.node,
  //   });
  //   const head = (await EOS.getInfo(true)).head_block_num;
  //   const block = await EOS.getBlock(head);
  //   request.abiProvider = {
  //     getAbi: async (account) => (await EOS.getAbi(account)).abi
  //   };
  //   const tx = await request.getTransaction(authorization, block);
  //
  //   const modifiedActions = map(actions, clone);
  //   const modifiedTransaction = map(tx.actions, clone);
  //   flexible.forEach((e, i) => {
  //     const flex = keys(pickBy(e));
  //     log.info(`flexible keys for ${i}`);
  //     log.info(flex);
  //     modifiedActions[i].data = omit(modifiedActions[i].data, flex);
  //     log.info('modified actions');
  //     log.info(modifiedActions[i].data);
  //     modifiedTransaction[i].data = omit(modifiedTransaction[i].data, flex);
  //     log.info('modified transaction actions');
  //     log.info(modifiedTransaction[i].data);
  //   });
  //
  //   log.info(JSON.stringify(tx));
  //   log.info('whitelist actions:');
  //   log.info(JSON.stringify(actions));
  //   log.info('tx actions:');
  //   log.info(JSON.stringify(actions));
  //   if (JSON.stringify(modifiedActions) === JSON.stringify(modifiedTransaction)) {
  //     log.info('whitelist match!!!!');
  //     const wallet = find(wallets, {
  //       account: authorization.actor,
  //       authorization: authorization.permission,
  //     });
  //     log.info('wallet found:');
  //     log.info(JSON.stringify(wallet));
  //     const auth = find(auths.keystore, { pubkey: wallet.pubkey });
  //     log.info('auth found:');
  //     log.info(JSON.stringify(auth));
  //     if (auth) {
  //       const signer = eos({
  //         broadcast: true,
  //         chainId: blockchain.chainId,
  //         httpEndpoint: blockchain.node,
  //         keyProviderObfuscated: {
  //           key: auth.key,
  //           hash: auth.hash,
  //         },
  //         sign: true,
  //       }, true);
  //       log.info('signing tx');
  //       log.info(JSON.stringify(tx));
  //       setTimeout(() => {
  //         signer
  //           .transaction(tx, {
  //             broadcast: true,
  //           })
  //           .then((signed) => {
  //             log.info(JSON.stringify(signed));
  //             // Object
  //             notifier.notify({
  //               icon: path.join(resourcePath, 'renderer/assets/icons/png/64x64.png'),
  //               title: 'Transaction Successful',
  //               message: signed.transaction_id
  //             });
  //             // store.dispatch({
  //             //   payload: { signed },
  //             //   type: types.SYSTEM_ESRURISIGN_SUCCESS
  //             // });
  //             // if (callback) {
  //             //   store.dispatch(callbackURIWithProcessed({
  //             //     bn: signed.processed.block_num,
  //             //     tx: signed.transaction_id,
  //             //     sig: signed.transaction.signatures
  //             //   }, callback));
  //             // }
  //             // store.dispatch({
  //             //   payload: { response: signed },
  //             //   type: types.SYSTEM_ESRURIBROADCAST_SUCCESS
  //             // });
  //           });
  //       }, 250);
  //     } else {
  //       log.info('no auth');
  //       pHandler.webContents.send('openUri', url);
  //       pHandler.show();
  //     }
  //   } else {
  //     log.info('not whitelisted');
  //     pHandler.webContents.send('openUri', url);
  //     pHandler.show();
  //   }
  // } else {
  //   pHandler.webContents.send('openUri', url);
  //   pHandler.show();
  // }
}
