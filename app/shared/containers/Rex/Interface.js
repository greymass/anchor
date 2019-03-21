// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Tab } from '../../components/Contract/Interface/Component';
import RexInterfaceAbout from '../../components/Rex/Interface/About';
import RexInterfaceFund from '../../components/Rex/Interface/Fund';


type Props = {
  actions: {},
  accounts: {},
  settings: {},
  t: {}
};

class RexInterface extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      t
    } = this.props;

    const panes = [
      {
        menuItem: {
          key: 'about',
          icon: 'info',
          content: t('rex_interface_about')
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
          content: t('rex_interface_fund')
        },
        pane: {
          key: 'fund',
          content: (
            <RexInterfaceFund
              actions={actions}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'manage_rex',
          icon: 'arrow right',
          content: t('rex_interface_manage_rex')
        },
        pane: {
          key: 'manage_rex',
          content: (
            <RexInterfaceFund
              actions={actions}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'rent_resources',
          icon: 'arrow down',
          content: t('rex_interface_rent_resources')
        },
        pane: {
          key: 'rent_resources',
          content: (
            <RexInterfaceFund
              actions={actions}
            />
          )
        }
      }]
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
    settings: state.settings
  };
}

export default withRouter(connect(mapStateToProps)(RexInterface));
