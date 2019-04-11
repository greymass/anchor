import type Transport from '@ledgerhq/hw-transport-node-hid';

const bippath = require('bip32-path');

const CLA = 0xD4;
const INS_GET_PUBLIC_KEY = 0x02;
const INS_SIGN = 0x04;
const INS_GET_APP_CONFIGURATION = 0x06;
const P1_CONFIRM = 0x01;
const P1_NON_CONFIRM = 0x00;
const P2_NO_CHAINCODE = 0x00;
const P2_CHAINCODE = 0x01;
const P1_FIRST = 0x00;
const P1_MORE = 0x80;

export function foreach<T, A>(
  arr: T[],
  callback: (T, number) => Promise<A>
): Promise<A[]> {
  function iterate(index, array, result) {
    if (index >= array.length) {
      return result;
    } return callback(array[index], index).then((res) => {
      result.push(res);
      return iterate(index + 1, array, result);
    });
  }
  return Promise.resolve().then(() => iterate(0, arr, []));
}

/**
* EOS API
*
* @example
* import Eos from "@ledgerhq/hw-app-eos";
* const eos = new Eos(transport)
*/
export default class Eos {
  transport;

  constructor(transport) {
    this.transport = transport;
    transport.decorateAppAPIMethods(
      this,
      [
        'getPublicKey',
        'signTransaction',
        'getAppConfiguration'
      ],
      'e0s'
    );
  }

  /**
  * get EOS public key for a given BIP 32 path.
  * @param path a path in BIP 32 format
  * @option boolDisplay optionally enable or not the display
  * @option boolChaincode optionally enable or not the chaincode request
  * @return an object with a publicKey, address and (optionally) chainCode
  * @example
  * eos.getPublicKey("44'/194'/0'/0'/0").then(o => o.address)
  */
  getPublicKey(
    path: string,
    boolDisplay?: boolean,
    boolChaincode?: boolean
  ): Promise<{
    publicKey: string,
    wif: string,
    chainCode?: string
  }> {
    const paths = bippath.fromString(path).toPathArray();
    const buffer = Buffer.alloc(1 + (paths.length * 4));
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
      buffer.writeUInt32BE(element, 1 + (4 * index));
    });
    return this.transport
      .send(
        CLA,
        INS_GET_PUBLIC_KEY,
        boolDisplay ? P1_CONFIRM : P1_NON_CONFIRM,
        boolChaincode ? P2_CHAINCODE : P2_NO_CHAINCODE,
        buffer
      )
      .then(response => {
        const result = {};
        const publicKeyLength = response[0];
        const addressLength = response[1 + publicKeyLength];
        result.publicKey = response
          .slice(1, 1 + publicKeyLength)
          .toString('hex');
        result.wif =
        response
          .slice(
            1 + publicKeyLength + 1,
            1 + publicKeyLength + 1 + addressLength
          )
          .toString('ascii');
        if (boolChaincode) {
          result.chainCode = response
            .slice(
              1 + publicKeyLength + 1 + addressLength,
              1 + publicKeyLength + 1 + addressLength + 32
            )
            .toString('hex');
        }
        return result;
      });
  }

  /**
  * You can sign a transaction and retrieve v, r, s given the raw transaction
  * and the BIP 32 path of the account to sign
  * @example
  eth.signTransaction("44'/194'/0'/0'/0", "....").then(result => ...)
  */
  signTransaction(
    path: string,
    rawTxHex: string
  ): Promise<{
    s: string,
    v: string,
    r: string
  }> {
    const paths = bippath.fromString(path).toPathArray();
    let offset = 0;
    const rawTx = Buffer.from(rawTxHex, 'hex');
    const toSend = [];
    let response;
    while (offset !== rawTx.length) {
      const maxChunkSize = offset === 0 ? 150 - 1 - (paths.length * 4) : 150;
      const chunkSize =
      offset + maxChunkSize > rawTx.length
        ? rawTx.length - offset
        : maxChunkSize;
      const buffer = Buffer.alloc(offset === 0 ? 1 + (paths.length * 4) + chunkSize : chunkSize);
      if (offset === 0) {
        buffer[0] = paths.length;
        paths.forEach((element, index) => {
          buffer.writeUInt32BE(element, 1 + (4 * index));
        });
        rawTx.copy(buffer, 1 + (4 * paths.length), offset, offset + chunkSize);
      } else {
        rawTx.copy(buffer, 0, offset, offset + chunkSize);
      }
      toSend.push(buffer);
      offset += chunkSize;
    }
    return foreach(toSend, (data, i) =>
      this.transport
        .send(CLA, INS_SIGN, i === 0 ? P1_FIRST : P1_MORE, 0x00, data)
        .then(apduResponse => {
          response = apduResponse;
          return response;
        }))
      .then(() => {
        const v = response.slice(0, 1).toString('hex');
        const r = response.slice(1, 1 + 32).toString('hex');
        const s = response.slice(1 + 32, 1 + 32 + 32).toString('hex');
        return { v, r, s };
      });
  }

  getAppConfiguration(): Promise<{ version: string }> {
    return this.transport.send(CLA, INS_GET_APP_CONFIGURATION, 0x00, 0x00).then(response => {
      const result = {};
      result.version = `${response[1]}.${response[2]}.${response[3]}`;
      return result;
    });
  }
}
