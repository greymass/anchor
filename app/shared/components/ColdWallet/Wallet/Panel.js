// @flow
import React, { Component } from 'react';

import WalletPanelLocked from '../../Wallet/Panel/Locked';
import ColdWalletPanelUnlocked from './Panel/Unlocked';

type Props = {
  actions: {},
  settings: {},
  system: {},
  keys: {},
  validate: {},
  wallet: {}
};

export default class ColdWalletPanel extends Component<Props> {
  render() {
    const {
      actions,
      keys,
      settings,
      system,
      validate,
      wallet
    } = this.props;
    let panel = false;
    if (keys && keys.key) {
      panel = (
        <ColdWalletPanelUnlocked
          actions={actions}
          keys={keys}
          settings={settings}
          system={system}
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
