// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Tab } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';

import RexInterfaceAbout from '../../components/Rex/Rent/About';
import RexInterfaceFund from '../../components/Rex/shared/Fund';
import RexInterfaceRentManage from '../../components/Rex/Rent/Manage';

import RexActions from '../../actions/system/rex';
import TableAction from '../../actions/table';
import SystemStateActions from '../../actions/system/systemstate';

type Props = {
  actions: {},
  accounts: {},
  balance: {},
  blockExplorers: {},
  connection: {},
  settings: {},
  system: {},
  t: {}
};

class RexRent extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      accounts,
      balance,
      blockExplorers,
      connection,
      settings,
      system,
      t
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
            <RexInterfaceAbout />
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
            />
          )
        }
      },
      {
        menuItem: {
          key: 'manage_rex',
          icon: 'arrow right',
          content: t('rex_interface_menu_rent_rex')
        },
        pane: {
          key: 'manage_rex',
          content: (
            <RexInterfaceRentManage
              actions={actions}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
            />
          )
        }
      }
    ];

    return (
      <React.Fragment>
        <Tab
          defaultActiveIndex={0}
          onTabChange={this.onTabChange}
          panes={panes}
          renderActiveOnly={false}
        />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...RexActions,
      ...TableAction,
      ...SystemStateActions,
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balance: state.balances[state.settings.account],
    blockExplorers: (state.connection && state.blockexplorers[state.connection.chainKey]) || {},
    connection: state.connection,
    settings: state.settings,
    tables: state.tables,
  };
}

export default translate('rex')(connect(mapStateToProps, mapDispatchToProps)(RexRent));
