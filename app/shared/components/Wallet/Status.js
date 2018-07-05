// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Header, Menu, Segment } from 'semantic-ui-react';

import WalletStatusBalances from './Status/Balances';
import WalletStatusResources from './Status/Resources';
import WalletStatusStaked from './Status/Staked';
import WalletStatusActions from './Status/Actions';

import StatsFetcher from '../../utils/StatsFetcher';

class WalletStatus extends Component<Props> {
  state = {
    activeItem: 'balances',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      accounts,
      actionHistories,
      actions,
      balances,
      chain,
      globals,
      settings,
      t,
      validate
    } = this.props;

    const {
      activeItem
    } = this.state;

    const account = accounts[settings.account] || {};
    const balance = balances[settings.account] || {};

    const statsFetcher = new StatsFetcher(account, balance);

    let activeTab = (
      <Segment stacked>
        <Header textAlign="center">
          {t('no_account_data')}
        </Header>
      </Segment>
    );

    if (account && account.account_name) {
      switch (activeItem) {
        case 'balances': {
          activeTab = (
            <WalletStatusBalances
              actions={actions}
              balances={balances}
              globals={globals}
              statsFetcher={statsFetcher}
              settings={settings}
            />
          );
          break;
        }
        case 'staked': {
          activeTab = (
            <WalletStatusStaked
              account={account}
              statsFetcher={statsFetcher}
            />
          );
          break;
        }
        case 'actions': {
          activeTab = (
            <WalletStatusActions
              actionHistory={actionHistories[settings.account]}
              actions={actions}
              chain={chain}
              settings={settings}
              validate={validate}
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
          statsFetcher={statsFetcher}
        />
        <Segment>
          <Menu
            pointing
            size="small"
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
              name="actions"
              icon="book"
              content={t('wallet_status_tab_account_history')}
              active={activeItem === 'actions'}
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
