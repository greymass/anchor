// @flow
import React, { Component } from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import WalletStatusBalances from './Status/Balances';
import StakeStats from './Stake/Stats';

export default class WalletStatus extends Component<Props> {
  render() {
    const {
      accounts,
      balances,
      keys,
      settings,
      wallet
    } = this.props;
    const accountName = settings.account;
    const account = accounts[accountName];
    const server = settings.node;
    let element = `No account data loaded yet (connected to: ${server})...`;
    if (account && account.account_name) {
      element = (
        <div>
          <WalletStatusBalances
            balances={balances}
            settings={settings}
          />
          <StakeStats
            account={accounts[settings.account]}
            key="StakeStats"
            settings={settings}
            balance={balances[settings.account]}
          />
          <Divider />
          <Header>
            {accountName}
            <Header.Subheader>
              {server}
            </Header.Subheader>
          </Header>
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
        </div>
      );
    }
    return (
      <Segment basic>
        {element}
      </Segment>
    );
  }
}
