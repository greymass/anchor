// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Header, Menu, Segment } from 'semantic-ui-react';

import WalletStatusBalances from './Status/Balances';
import WalletStatusResources from './Status/Resources';
import WalletStatusStaked from './Status/Staked';
import WalletStatusActions from './Status/Actions';
import WalletStatusWaiting from './Status/Waiting';

import EOSAccount from '../../utils/EOS/Account';

class WalletStatus extends Component<Props> {
  state = {
    activeItem: 'balances',
  };

  componentDidMount = () => {
    const {
      actions,
      settings,
    } = this.props;

    actions.getTable('eosio', settings.account, 'delband');
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      accounts,
      actionHistories,
      actions,
      balances,
      blockExplorers,
      chain,
      connection,
      globals,
      settings,
      system,
      t,
      tables,
      validate,
      jurisdictions
    } = this.props;

    const {
      activeItem
    } = this.state;

    if (settings.walletMode === 'wait') {
      return <WalletStatusWaiting />;
    }

    const account = accounts[settings.account] || {};
    const balance = balances[settings.account] || {};

    const delegations = tables &&
                        tables.eosio &&
                        tables.eosio[settings.account] &&
                        tables.eosio[settings.account].delband &&
                        tables.eosio[settings.account].delband.rows;
    const eosAccount = new EOSAccount(account, balance, delegations, connection.chainSymbol);

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
              account={account}
              actions={actions}
              balances={balances}
              blockExplorers={blockExplorers}
              connection={connection}
              globals={globals}
              eosAccount={eosAccount}
              settings={settings}
              system={system}
            />
          );
          break;
        }
        case 'staked': {
          activeTab = (
            <WalletStatusStaked
              account={account}
              eosAccount={eosAccount}
              settings={settings}
            />
          );
          break;
        }
        case 'actions': {
          activeTab = (
            <WalletStatusActions
              actionHistory={actionHistories[settings.account]}
              actions={actions}
              blockExplorers={blockExplorers}
              chain={chain}
              connection={connection}
              settings={settings}
              validate={validate}
              jurisdictions={jurisdictions}
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
          displayResourcesAvailableSetting={settings.displayResourcesAvailable}
          eosAccount={eosAccount}
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
              content={t('wallet_status_tab_staked_amount', { chainSymbol: connection.chainSymbol })}
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
