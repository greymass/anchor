// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { get } from 'dot-prop-immutable';

import RexInterfaceLendAbout from '../../components/Rex/Lend/About';
import RexInterfaceFund from '../../components/Rex/shared/Fund';
import RexInterfaceLendManage from '../../components/Rex/Lend/Manage';
import RexInterfaceLendSavings from '../../components/Rex/Lend/Savings';
import WalletPanelLocked from '../../components/Wallet/Panel/Locked';

import RexActions from '../../actions/system/rexi';
import TableAction from '../../actions/table';
import SystemStateActions from '../../actions/system/systemstate';
import WalletActions from '../../actions/wallet';

type Props = {
  accounts: {},
  actions: {},
  balance: {},
  blockExplorers: {},
  connection: {},
  keys: {},
  settings: {},
  system: {},
  t: {},
  tables: {},
  validate: {},
  wallet: {},
};

class RexLend extends Component<Props> {
  props: Props;

  render() {
    const {
      accounts,
      actions,
      balance,
      blockExplorers,
      connection,
      keys,
      settings,
      system,
      t,
      tables,
      validate,
      wallet,
    } = this.props;

    const panes = [
      {
        menuItem: {
          key: 'about',
          icon: 'info',
          content: t('rex_interface_menu_about')
        },
        pane: {
          key: 'about',
          content: (
            <RexInterfaceLendAbout />
          )
        }
      },
      {
        menuItem: {
          key: 'fund',
          icon: 'arrow down',
          content: t('rex_interface_menu_fund')
        },
        pane: {
          key: 'fund',
          content: (
            <RexInterfaceFund
              actions={actions}
              balance={balance}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
              tables={tables}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'manage_rex',
          icon: 'arrow right',
          content: t('rex_interface_menu_lend_rex')
        },
        pane: {
          key: 'manage_rex',
          content: (
            <RexInterfaceLendManage
              accounts={accounts}
              actions={actions}
              balance={balance}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
              tables={tables}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'savings_rex',
          icon: 'square',
          content: t('rex_interface_menu_savings')
        },
        pane: {
          key: 'savings_rex',
          content: (
            <RexInterfaceLendSavings
              accounts={accounts}
              actions={actions}
              balance={balance}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
              tables={tables}
            />
          )
        }
      }
    ];

    const account = accounts[settings.account];
    if (!account) return false;

    const votingOrProxying = !!(
      account
      && account.voter_info
      && (
        get(account, 'voter_info.producers', []).length >= 21
        || account.voter_info.proxy
      )
    );

    const isNotVotingOrProxying = !votingOrProxying;
    const isUnlocked = (keys && keys.key) || ['watch', 'ledger'].includes(settings.walletMode);
    const isLocked = !isUnlocked;

    return (
      <React.Fragment>
        {isLocked ? (
          <WalletPanelLocked
            actions={actions}
            settings={settings}
            validate={validate}
            wallet={wallet}
          />
        ) : isNotVotingOrProxying ? (
          <Message
            header={t('rex_not_voting_or_proxying_header')}
            content={t('rex_not_voting_or_proxying_subheader')}
            warning
          />
        ) : (
          <Tab
            defaultActiveIndex={0}
            onTabChange={this.onTabChange}
            panes={panes}
            renderActiveOnly={false}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...RexActions,
      ...SystemStateActions,
      ...TableAction,
      ...WalletActions,
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balance: state.balances[state.settings.account],
    blockExplorers: (state.connection && state.blockexplorers[state.connection.chainKey]) || {},
    connection: state.connection,
    keys: state.keys,
    settings: state.settings,
    tables: state.tables,
    validate: state.validate,
    wallet: state.wallet,
  };
}

export default translate('rex')(connect(mapStateToProps, mapDispatchToProps)(RexLend));
