// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import ColdWalletInfo from './Wallet/Info';
import ColdWalletPanel from './Wallet/Panel';
import ColdWalletTransaction from './Wallet/Transaction';

type Props = {
  actions: {},
  keys: {},
  settings: {},
  transaction: {},
  wallet: {},
  system: {}
};

export default class ColdWallet extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      keys,
      settings,
      system,
      transaction,
      validate,
      wallet
    } = this.props;
    return (transaction.data)
      ? (
        <ColdWalletTransaction
          actions={actions}
          keys={keys}
          settings={settings}
          transaction={transaction}
        />
      )
      : (
        <ColdWalletInfo
          actions={actions}
        />
      );
  }
}
