// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import WalletConfig from './Wallet/Config';
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
      settings,
      validate,
      wallet
    } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <WalletConfig
              actions={actions}
              accounts={accounts}
              settings={settings}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <WalletStatus
              accounts={accounts}
              settings={settings}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
