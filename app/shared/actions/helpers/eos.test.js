import { Api, JsonRpc } from 'eosjs2';
import eos from './eos';

jest.mock('eosjs2');


const connection = {
  authorization: 'teamgreymass@active',
  broadcast: false,
  chain: 'EOS',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  chainKey: 'eos-mainnet',
  chainSymbol: 'EOS',
  expireSeconds: 120,
  historyPluginEnabled: true,
  httpEndpoint: 'https://eos.greymass.com',
  keyPrefix: 'EOS',
  keyProviderObfuscated: {
    hash: '52885451c673baf444cada12d3dd74a595a8aed6bb7cef09496e390dd422eeafM7U6x+aiwIBDa/KuJaiTDA==',
    key: 'ce58dfca2b20a4bebcc68b41ce1162dcb1593ea761874db7640a1b0f3a18e552JAlvNqRXdI69Ps7G/rr/KanZe1kkUHlHNzmXQd1Jd9zXmTOb4Tdq6BI3ve+EK6/dB/9EbJr+sTX71XRcTf1V6A=='
  },
  sign: false,
  signMethod: 'hot',
  signPath: false,
};

describe('eos()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns an eosjs object with key decrypted', () => {
    expect(typeof eos(connection, true, true)).toBe('object');
  });

  it('calls the API class with proper arguments', async done => {
    Api.mockImplementation(() => {
      return {
        transact: () => new Promise((resolve) => {
          resolve();
        })
      };
    });

    const eosobj = eos(connection, true, true);
    const method = 'transact';
    const params = {
      blocksBehind: 3,
      expireSeconds: 30,
    };
    eosobj[method]({
      actions: [{
        account: 'eosio',
        name: 'bidname',
        authorization: [{
          actor: 'teamgreymass',
          permission: 'active',
        }],
        data: {
          newname: 'test',
          bid: '1.0000 EOS',
          bidder: 'testfrm11111',
        },
      }]
    }, params).then(() => {
      expect(JsonRpc).toHaveBeenCalled();
      const apiArgument = Api.mock.calls[0][0];
      expect(typeof apiArgument.rpc).toBe('object');
      expect(apiArgument.signatureProvider.availableKeys).toEqual([
        'PUB_K1_7svSMLg8fQg9vbz5BeFKPdaCd6QUqKP6KDSXW6puWTK7TLMR4V'
      ]);
      expect(Array.from(apiArgument.signatureProvider.keys)).toEqual([
        [
          'PUB_K1_7svSMLg8fQg9vbz5BeFKPdaCd6QUqKP6KDSXW6puWTK7TLMR4V',
          '5J9VQCYbwBTCnRxbXJqck3hLYuxJzYXYZ9a23htMV2bXFJJo6xU'
        ]
      ]);
      expect(typeof apiArgument.textDecoder).toBe('object');
      expect(typeof apiArgument.textEncoder).toBe('object');

      done();
    });
  });
});
