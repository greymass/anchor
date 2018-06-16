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
      validate,
      wallet
    } = this.props;

    const {
      clearSettingsCache
    } = this.props.actions;

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
        <WalletPanelUnlocked
          accounts={accounts}
          balances={balances}
          actions={actions}
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
