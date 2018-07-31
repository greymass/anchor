import { find, map, pick } from 'lodash';

const Eos = require('eosjs');

export const typeMap = {
  uint64: 'int',
  uint32: 'int',
  bool: 'bool'
};

export default class EOSContract {
  constructor(abi, account = undefined) {
    this.account = account;
    this.abi = abi;
    this.typeMap = typeMap;
  }

  tx(actionName, account, data) {
    const eos = Eos({
      broadcast: false,
      expireInSeconds: 3600,
      forceActionDataHex: false,
      httpEndpoint: null,
      sign: false
    });
    return eos.transaction({
      actions: [
        {
          account: this.account,
          name: actionName,
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data
        }
      ]
    }, {
      broadcast: false,
      sign: false
    });
  }

  getAction(name) {
    return find(this.abi.actions, { name });
  }

  getActions() {
    return this.abi.actions;
  }

  getField(struct, name) {
    return find(this.getStruct(struct).fields, { name });
  }

  getFields(name) {
    const struct = this.getStruct(name);
    if (struct && struct.fields) return struct.fields;
    return [];
  }

  getFieldType(struct, name) {
    const field = this.getField(struct, name);
    if (field && field.type in this.typeMap) {
      return this.typeMap[field.type];
    }
    return 'string';
  }

  getStruct(name) {
    return find(this.abi.structs, { name });
  }

  getTable(name) {
    return find(this.abi.tables, { name });
  }

  getTables() {
    return this.abi.tables;
  }

  json() {
    const fields = ['abi', 'account'];
    const data = map(this, (o) => pick(o, fields));
    return JSON.stringify(data, null, 2);
  }
}
