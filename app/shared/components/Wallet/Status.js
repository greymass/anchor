// @flow
import React, { Component } from 'react';
import { Divider, Header, Menu, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import WalletStatusBalances from './Status/Balances';
import WalletStatusResources from './Status/Resources';
import WalletStatusStaked from './Status/Staked';

export default class WalletStatus extends Component<Props> {
  state = {
    activeItem: 'balances',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      accounts,
      balances,
      settings
    } = this.props;
    const {
      activeItem
    } = this.state;
    const accountName = settings.account;
    const account = accounts[accountName];
    const server = settings.node;
    let activeTab = (
      <Segment stacked>
        <Header textAlign="center">
          {`No account data loaded (connecting to: ${server})...`}
        </Header>
      </Segment>
    );
    if (account) {
      switch (activeItem) {
        case 'balances': {
          activeTab = (
            <WalletStatusBalances
              balances={balances}
              settings={settings}
            />
          );
          break;
        }
        case 'staked': {
          activeTab = (
            <WalletStatusStaked
              accounts={accounts}
              settings={settings}
            />
          );
          break;
        }
        case 'data': {
          activeTab = (
            <ReactJson
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name={null}
              src={account}
              style={{ padding: '1em' }}
              theme="harmonic"
            />
          );
          break;
        }
        default: {
          break;
        }
      }
    }
    return (
      <div>
        <WalletStatusResources
          accounts={accounts}
          settings={settings}
        />
        <Menu
          pointing
          size="large"
          secondary
        >
          <Menu.Item
            name="balances"
            icon="list"
            content="Token Balances"
            active={activeItem === 'balances'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="staked"
            icon="power cord"
            content="Staked EOS"
            active={activeItem === 'staked'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="data"
            icon="dna"
            content="Account Data"
            active={activeItem === 'data'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {activeTab}
      </div>
    );
  }
}
