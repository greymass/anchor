// @flow
import React, { Component } from 'react';

import WalletPanelLocked from './Panel/Locked';
import WalletPanelUnlocked from './Panel/Unlocked';
import WalletPanelWaiting from './Panel/Waiting';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  blockExplorers: {},
  globals: {},
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
      blockExplorers,
      globals,
      keys,
      settings,
      system,
      transaction,
      validate,
      wallet
    } = this.props;

    let panel = false;

    if (settings.walletMode === 'wait') {
      return (
        <WalletPanelWaiting />
      );
    }


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
          actions={actions}
          balances={balances}
          blockExplorers={blockExplorers}
          globals={globals}
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
