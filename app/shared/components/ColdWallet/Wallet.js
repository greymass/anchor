// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import ColdWalletInfo from './Wallet/Info';
import ColdWalletPanel from './Wallet/Panel';
import ColdWalletTransaction from './Wallet/Transaction';

type Props = {
  actions: {},
  keys: {},
  settings: {},
  transaction: {},
  wallet: {},
  system: {}
};

export default class ColdWallet extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
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
            <ColdWalletPanel
              actions={actions}
              keys={keys}
              settings={settings}
              system={system}
              validate={validate}
              wallet={wallet}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            {(transaction.data)
              ? (
                <ColdWalletTransaction
                  actions={actions}
                  keys={keys}
                  transaction={transaction}
                />
              )
              : (
                <ColdWalletInfo />
              )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
