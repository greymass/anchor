// @flow
import React, { Component } from 'react';
import { Button, Segment } from 'semantic-ui-react';

import WalletPanelForm from './Panel/Form';
import WalletPanelFormNode from './Panel/Form/Node';
import WalletPanelLocked from './Panel/Locked';
import WalletPanelUnlocked from './Panel/Unlocked';

import Stake from './Panel/Stake';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  settings: {},
  validate: {},
  keys: {},
  wallet: {}
};

export default class WalletPanel extends Component<Props> {
  props: Props;

  onSettingChange = (e, {name, value}) => {
    console.log(name, value)
    // Determine if field should be saved in persistent settings
    if (['account', 'node'].indexOf(name) > -1) {
      const {
        actions
      } = this.props;
      const { setSettingWithValidation } = actions;
      setSettingWithValidation(name, value);
    }
  }

  render() {
    const {
      actions,
      keys,
      settings,
      validate,
      wallet,
      accounts,
      balances
    } = this.props;

    const {
      clearSettingsCache
    } = this.props.actions;

    let panel = (
      <WalletPanelForm
        actions={actions}
        keys={keys}
        onSettingChange={this.onSettingChange}
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
        <WalletPanelUnlocked
          actions={actions}
          keys={keys}
          settings={settings}
          validate={validate}
        />
      );
    }
    return (
      <Segment basic>
        <WalletPanelFormNode
          onChange={this.onSettingChange}
          validate={validate}
          value={settings.node}
        />
        {panel}

        <Stake
          actions={actions}
          accounts={accounts}
          balances={balances}
          validate={validate}
          settings={settings}
        />
        <Button
          onClick={clearSettingsCache}
          content="DEBUG: Reset Application"
          color="red"
        />
      </Segment>
    );
  }
}
