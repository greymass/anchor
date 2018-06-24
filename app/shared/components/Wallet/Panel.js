// @flow
import React, { Component } from 'react';

import WalletPanelLocked from './Panel/Locked';
import WalletPanelUnlocked from './Panel/Unlocked';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  settings: {},
  system: {},
  transaction: {},
  validate: {},
  keys: {},
  wallet: {}
};

export default class WalletPanel extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      balances,
      keys,
      settings,
      system,
      transaction,
      validate,
      wallet
    } = this.props;

    let panel = false;
    if (wallet.data) {
      panel = (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
    }
    if ((keys && keys.key) || settings.walletMode === 'watch') {
      panel = (
        <WalletPanelUnlocked
          accounts={accounts}
          balances={balances}
          actions={actions}
          settings={settings}
          system={system}
          transaction={transaction}
          validate={validate}
        />
      );
    }
    return (
      <div>
        {panel}
      </div>
    );
  }
}
