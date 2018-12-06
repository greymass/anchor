export default class EOSWallet {
  constructor(wallet = {}) {
    this.wallet = wallet;
  }

  importProps(wallet, chainId = undefined) {
    this.wallet = {
      schema: 'anchor.v1',
      account: wallet.account,
      authority: wallet.authorization,
      chainId: wallet.chainId || chainId,
      data: wallet.data || undefined,
      path: wallet.path || undefined,
      pubkey: wallet.pubkey,
      type: (wallet.path) ? 'ledger' : 'key',
    };
  }

  exportProps(mode = 'hot') {
    const { wallet } = this;
    switch (wallet.schema) {
      case 'anchor.v1': {
        return {
          account: wallet.account,
          authorization: wallet.authority,
          chainId: wallet.chainId,
          data: wallet.data,
          mode: (wallet.path) ? 'ledger' : mode,
          path: wallet.path,
          pubkey: wallet.pubkey,
        };
      }
      default: {
        console.log(`undefined schema: ${wallet.schema}`, wallet);
      }
    }
  }

  json() {
    return JSON.stringify(this.wallet, null, 2);
  }
}
