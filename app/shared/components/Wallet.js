// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import SidebarAccount from '../containers/Sidebar/Account';

import WalletPanel from './Wallet/Panel';
import WalletStatus from './Wallet/Status';

type Props = {
  accounts: {},
  actionHistories: {},
  actions: {},
  globals: {},
  keys: {},
  settings: {},
  validate: {},
  wallet: {},
  balances: {},
  system: {},
  transaction: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  render() {
    const {
      actionHistories,
      actions,
      accounts,
      balances,
      chain,
      globals,
      keys,
      settings,
      system,
      transaction,
      validate,
      wallet
    } = this.props;

    return (
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <SidebarAccount />
            <WalletPanel
              actions={actions}
              accounts={accounts}
              balances={balances}
              globals={globals}
              keys={keys}
              settings={settings}
              system={system}
              transaction={transaction}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <WalletStatus
              actions={actions}
              actionHistories={actionHistories}
              accounts={accounts}
              balances={balances}
              chain={chain}
              globals={globals}
              keys={keys}
              settings={settings}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
