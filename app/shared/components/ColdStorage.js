// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

// import SidebarConnection from '../containers/Sidebar/Connection';
//
// import WalletPanel from './Wallet/Panel';
// import WalletStatus from './Wallet/Status';

type Props = {
  // actions: {},
  // accounts: {},
  // keys: {},
  // settings: {},
  // validate: {},
  // wallet: {},
  // balances: {},
  // system: {}
};

class ColdStorage extends Component<Props> {
  props: Props;

  render() {
    const {

    } = this.props;
    return (
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={6}>
            sidebar
          </Grid.Column>
          <Grid.Column width={10}>
            content
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
