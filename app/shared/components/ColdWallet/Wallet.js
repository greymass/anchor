// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import ColdWalletInfo from './Wallet/Info';
import ColdWalletTransaction from './Wallet/Transaction';

type Props = {
  actions: {},
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
      settings,
      transaction,
    } = this.props;
    return (transaction.data)
      ? (
        <ColdWalletTransaction
          actions={actions}
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
