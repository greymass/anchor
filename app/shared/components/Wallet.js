// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import SidebarConnection from '../containers/Sidebar/Connection';

import WalletPanel from './Wallet/Panel';
import WalletStatus from './Wallet/Status';

type Props = {
  actions: {},
  accounts: {},
  keys: {},
  settings: {},
  validate: {},
  wallet: {},
  balances: {},
  system: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      accounts,
      balances,
      keys,
      settings,
      system,
      validate,
      wallet
    } = this.props;
    return (
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <SidebarConnection />
            <WalletPanel
              actions={actions}
              accounts={accounts}
              balances={balances}
              keys={keys}
              settings={settings}
              system={system}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <WalletStatus
              actions={actions}
              accounts={accounts}
              balances={balances}
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
