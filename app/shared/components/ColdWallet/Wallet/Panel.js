// @flow
import React, { Component } from 'react';

import WalletPanelLocked from '../../Wallet/Panel/Locked';
import ColdWalletPanelUnlocked from './Panel/Unlocked';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  settings: {},
  system: {},
  validate: {},
  keys: {},
  wallet: {}
};

export default class ColdWalletPanel extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      balances,
      keys,
      settings,
      system,
      validate,
      wallet
    } = this.props;

    let panel = false;
    if ((!keys || !keys.key) && wallet.data) {
      panel = (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
    }
    if (keys && keys.key) {
      panel = (
        <ColdWalletPanelUnlocked
          accounts={accounts}
          actions={actions}
          balances={balances}
          keys={keys}
          settings={settings}
          system={system}
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
