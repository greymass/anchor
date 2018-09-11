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
  balances: {},
  blockExplorers: {},
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
      blockExplorers,
      chain,
      globals,
      keys,
      settings,
      system,
      transaction,
      validate,
      wallet,
      connection
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
              blockExplorers={blockExplorers}
              globals={globals}
              keys={keys}
              settings={settings}
              system={system}
              transaction={transaction}
              validate={validate}
              wallet={wallet}
              connection={connection}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <WalletStatus
              actions={actions}
              actionHistories={actionHistories}
              accounts={accounts}
              balances={balances}
              blockExplorers={blockExplorers}
              chain={chain}
              globals={globals}
              keys={keys}
              settings={settings}
              validate={validate}
              wallet={wallet}
              connection={connection}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
