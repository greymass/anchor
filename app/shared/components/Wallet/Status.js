// @flow
import React, { Component } from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import WalletStatusBalances from './Status/Balances';
import WalletStatusResources from './Status/Resources';
import WalletStatusStaked from './Status/Staked';

export default class WalletStatus extends Component<Props> {
  render() {
    const {
      accounts,
      balances,
      settings
    } = this.props;
    const accountName = settings.account;
    const account = accounts[accountName];
    const server = settings.node;
    let element = (
      <Segment stacked>
        <Header textAlign="center">
          {`No account data loaded (connecting to: ${server})...`}
        </Header>
      </Segment>
    );
    if (account && account.account_name) {
      element = [(
        <WalletStatusResources
          accounts={accounts}
          settings={settings}
        />
      ), (
        <WalletStatusStaked
          accounts={accounts}
          settings={settings}
        />
      ), (
        <WalletStatusBalances
          balances={balances}
          settings={settings}
        />
      ), (
        <Divider />
      ), (
        <Header>
          {accountName}
          <Header.Subheader>
            {server}
          </Header.Subheader>
        </Header>
      ), (
        <ReactJson
          collapsed
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={account}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      )];
    }
    return element;
  }
}
