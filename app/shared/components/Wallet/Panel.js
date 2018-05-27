// @flow
import React, { Component } from 'react';
import { Button, Segment } from 'semantic-ui-react';

import WalletPanelForm from './Panel/Form';
import WalletPanelLocked from './Panel/Locked';
import WalletPanelUnlocked from './Panel/Unlocked';

export default class WalletPanel extends Component<Props> {
  render() {
    const {
      actions,
      keys,
      settings,
      validate,
      wallet
    } = this.props;
    const {
      clearSettingsCache
    } = actions;
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
        {panel}
        <Button
          onClick={clearSettingsCache}
          content="DEBUG: Reset Application"
          color="red"
        />
      </Segment>
    );
  }
}
