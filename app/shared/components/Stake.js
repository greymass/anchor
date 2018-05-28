// @flow
import React, { Component } from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import WalletPanel from './Wallet/Panel';
import StakeStats from './Stake/Stats';
import StakeForm from './Stake/Form';

type Props = {
  actions: {},
  accounts: {},
  settings: {},
  validate: {},
  wallet: {}
};

export default class Stake extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      original: [],
      modified: false,
      selected: [],
      selected_loaded: false,
      submitting: false
    };
  }

  render() {
    const {
      actions,
      accounts,
      keys,
      settings,
      validate,
      balances,
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
