// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Header, Menu, Segment } from 'semantic-ui-react';

import WalletStatusBalances from './Status/Balances';
import WalletStatusResources from './Status/Resources';
import WalletStatusStaked from './Status/Staked';

class WalletStatus extends Component<Props> {
  state = {
    activeItem: 'balances',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      accounts,
      balances,
      settings,
      t
    } = this.props;
    const {
      activeItem
    } = this.state;
    const accountName = settings.account;
    const account = accounts[accountName];
    let activeTab = (
      <Segment stacked>
        <Header textAlign="center">
          {t('no_account_data')}
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
        <Segment>
          <Menu
            pointing
            size="large"
            secondary
          >
            <Menu.Item
              name="balances"
              icon="list"
              content={t('wallet_status_tab_token_balances')}
              active={activeItem === 'balances'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="staked"
              icon="power cord"
              content={t('wallet_status_tab_staked')}
              active={activeItem === 'staked'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="data"
              icon="dna"
              content={t('wallet_status_tab_account_data')}
              active={activeItem === 'data'}
              onClick={this.handleItemClick}
            />
          </Menu>
          {activeTab}
        </Segment>

      </div>
    );
  }
}

export default translate('wallet')(WalletStatus);
