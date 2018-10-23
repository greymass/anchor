import { filter, find, flatten } from 'lodash';

export default class EOSAccount {
  constructor(account = undefined) {
    this.account = account;
    return this;
  }

  getPermission(name) {
    const { account } = this;
    if (account) {
      return find(account.permissions, (perm) => (perm.perm_name === name));
    }
    return {};
  }

  getAuthorization(pubkey, returnObject = false) {
    const { account } = this;
    if (account) {
      // Is this the owner key? If so, return authoritization
      const isOwner = find(account.permissions, (perm) =>
        find(perm.required_auth.keys, (key) =>
          (key.key === pubkey && perm.perm_name === 'owner')));
      if (isOwner) {
        if (returnObject) return isOwner;
        return `${account.account_name}@owner`;
      }
      // Is this the active key? If so, return authoritization
      const isActive = find(account.permissions, (perm) =>
        find(perm.required_auth.keys, (key) =>
          (key.key === pubkey && perm.perm_name === 'active')));
      if (isActive) {
        if (returnObject) return isActive;
        return `${account.account_name}@active`;
      }
      // otherwise find the first non active/owner match
      const permission = find(account.permissions, (perm) =>
        find(perm.required_auth.keys, (key) => key.key === pubkey));
      if (permission) {
        if (returnObject) return permission;
        return `${account.account_name}@${permission.perm_name}`;
      }
      // if no matches, return undefined
    }
    return undefined;
  }

  getAuthorizations(pubkey) {
    const { account } = this;
    if (account) {
      // Return all authorizations which this key matches
      return filter(account.permissions, (perm) =>
        !!filter(perm.required_auth.keys, { key: pubkey }).length);
    }
    return [];
  }

  getAuthorizationOptions() {
    const { account } = this;
    if (account) {
      return flatten(account.permissions.map(perm => {
        const { keys } = perm.required_auth;
        return keys.map(key => ({
          type: perm.perm_name,
          pubkey: key.key
        }));
      }));
    }
    return [];
  }

  getKeysForAuthorization(authorization) {
    const { account } = this;
    if (account) {
      const permissions = filter(account.permissions, {
        perm_name: authorization
      });
      return flatten(permissions.map(perm => {
        const { keys } = perm.required_auth;
        return keys.map(key => ({
          type: perm.perm_name,
          pubkey: key.key
        }));
      }));
    }
  }
}
