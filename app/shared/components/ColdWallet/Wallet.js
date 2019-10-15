// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import ColdWalletInfo from './Wallet/Info';
import ColdWalletTransaction from './Wallet/Transaction';

type Props = {
  actions: {},
  pubkeys: {},
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
      pubkeys,
      settings,
      transaction,
      wallet,
    } = this.props;
    return (transaction.data)
      ? (
        <ColdWalletTransaction
          actions={actions}
          pubkeys={pubkeys}
          settings={settings}
          transaction={transaction}
          wallet={wallet}
        />
      )
      : (
        <ColdWalletInfo
          actions={actions}
        />
      );
  }
}
