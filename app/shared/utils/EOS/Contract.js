import { find, map, pick } from 'lodash';

const Eos = require('eosjs');

export default class EOSContract {
  constructor(abi, account = undefined) {
    this.account = account;
    this.abi = abi;
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

  getFields(name) {
    return this.getStruct(name).fields;
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
