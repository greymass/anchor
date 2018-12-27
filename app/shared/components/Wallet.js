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
  allBlockExplorers: {},
  balances: {},
  chain: {},
  connection: {},
  globals: {},
  keys: {},
  settings: {},
  system: {},
  tables: {},
  transaction: {},
  validate: {},
  wallet: {}
};

export default class Wallet extends Component<Props> {
  props: Props;

  render() {
    const {
      actionHistories,
      actions,
      accounts,
      allBlockExplorers,
      blockchains,
      balances,
      chain,
      connection,
      globals,
      keys,
      settings,
      system,
      tables,
      transaction,
      validate,
      wallet
    } = this.props;

    return (
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <WalletPanel
              actions={actions}
              accounts={accounts}
              balances={balances}
              blockchains={blockchains}
              blockExplorers={allBlockExplorers[connection.chainKey]}
              connection={connection}
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
              blockExplorers={allBlockExplorers[connection.chainKey]}
              chain={chain}
              connection={connection}
              globals={globals}
              keys={keys}
              settings={settings}
              system={system}
              tables={tables}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
