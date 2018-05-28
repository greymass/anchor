// @flow
import React, { Component } from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import WalletPanel from './Wallet/Panel';
import StakeStats from './Stake/Stats';
import StakeForm from './Stake/Form';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  keys: {},
  settings: {},
  validate: {},
  wallet: {}
};

export default class Stake extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      accounts,
      balances,
      keys,
      settings,
      validate,
      wallet
    } = this.props;

    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        keys={keys}
        settings={settings}
        validate={validate}
        wallet={wallet}
      />
    )];

    const validUser = (keys.key);

    if (validUser) {
      sidebar = [
        (
          <StakeForm
            account={accounts[settings.account]}
            key="StakeForm"
            settings={settings}
            actions={actions}
            validate={validate}
            balance={balances[settings.account]}
          />
        )
      ];
    }
    return (
      <Grid>
        <Grid.Row>
          <Transition.Group
            as={Grid.Column}
            duration={200}
            width={6}
          >
            {sidebar}
          </Transition.Group>
          <Grid.Column width={10}>
            <StakeStats
              account={accounts[settings.account]}
              key="StakeStats"
              settings={settings}
              balance={balances[settings.account]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
