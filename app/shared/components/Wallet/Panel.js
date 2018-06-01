// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import WalletPanelForm from './Panel/Form';
import WalletPanelLocked from './Panel/Locked';
import WalletPanelUnlocked from './Panel/Unlocked';

import Stake from './Stake';

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
      actions,
      keys,
      settings,
      validate,
      wallet,
      accounts,
      balances,
      system
    } = this.props;

    const {
      clearSettingsCache
    } = this.props.actions;

    let panel = (
      <WalletPanelForm
        actions={actions}
        keys={keys}
        settings={settings}
        validate={validate}
        wallet={wallet}
      />
    );
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
        <div>
          <WalletPanelUnlocked
            actions={actions}
            keys={keys}
            settings={settings}
            validate={validate}
          />
          <Stake
            actions={actions}
            accounts={accounts}
            balances={balances}
            validate={validate}
            settings={settings}
            system={system}
          />
        </div>
      );
    }
    return (
      <div>
        {panel}
      </div>
    );
  }
}
