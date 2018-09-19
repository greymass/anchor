import { find } from 'lodash';

const api = require('./Ledger/Adapter').default;
const transport = require('@ledgerhq/hw-transport-node-hid').default;

export default class HardwareLedger {
  constructor(account = undefined) {
    this.account = account;
    this.api = api;
    this.transport = transport;
    return this;
  }

  getAuthorization(pubkey) {
    const { account } = this;
    if (account) {
      // Is this the owner key? If so, return authoritization
      const isOwner = find(account.permissions, (perm) =>
        find(perm.required_auth.keys, (key) =>
          (key.key === pubkey && perm.perm_name === 'owner')));
      if (isOwner) return `${account.account_name}@owner`;
      // Is this the active key? If so, return authoritization
      const isActive = find(account.permissions, (perm) =>
        find(perm.required_auth.keys, (key) =>
          (key.key === pubkey && perm.perm_name === 'active')));
      if (isActive) return `${account.account_name}@active`;
      // otherwise find the first non active/owner match
      const permission = find(account.permissions, (perm) =>
        find(perm.required_auth.keys, (key) => key.key === pubkey));
      if (permission) return `${account.account_name}@${permission.perm_name}`;
      // if no matches, return undefined
    }
    return undefined;
  }
}
