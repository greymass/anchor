// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import RexInterfaceAbout from '../../components/Rex/Interface/About';
import RexInterfaceFund from '../../components/Rex/Interface/Fund';
import RexInterfaceManageRex from '../../components/Rex/Interface/ManageRex';
import RexInterfaceRentResources from '../../components/Rex/Interface/RentResources';

type Props = {
  actions: {},
  accounts: {},
  connection: {},
  settings: {},
  system: {},
  t: {}
};

class RexInterface extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
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
          content: t('rex_interface_menu_manage_rex')
        },
        pane: {
          key: 'manage_rex',
          content: (
            <RexInterfaceManageRex
              actions={actions}
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
          key: 'rent_resources',
          icon: 'arrow down',
          content: t('rex_interface_menu_rent_resources')
        },
        pane: {
          key: 'rent_resources',
          content: (
            <RexInterfaceRentResources
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

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balance: state.balances[state.settings.account],
    blockExplorers: (state.connection && state.blockexplorers[state.connection.chainKey]) || {},
    connection: state.connection,
    settings: state.settings
  };
}

export default translate('rex')(connect(mapStateToProps)(RexInterface));
