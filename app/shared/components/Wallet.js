// @flow
import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';

import WalletPanel from './Wallet/Panel';
import WalletStatus from './Wallet/Status';

type Props = {
  actions: {},
  accounts: {},
  settings: {},
  validate: {},
  wallet: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      accounts,
      keys,
      settings,
      validate,
      wallet
    } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <WalletPanel
              actions={actions}
              accounts={accounts}
              keys={keys}
              settings={settings}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <WalletStatus
              accounts={accounts}
              keys={keys}
              settings={settings}
              wallet={wallet}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
