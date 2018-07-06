// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Tab } from 'semantic-ui-react';

import * as WalletsActions from '../actions/wallets';

import Tools from '../components/Tools';
import ToolsKeys from '../components/Tools/Keys';
import ToolsState from '../components/Tools/State';
import ToolsWallets from '../components/Tools/Wallets';

class ToolsContainer extends Component<Props> {
  props: Props;
  render() {
    const { t } = this.props;
    const panes = [
      {
        menuItem: t('tools_menu_index'),
        render: () => <Tab.Pane><Tools {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_wallets'),
        render: () => <Tab.Pane><ToolsWallets {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_keys'),
        render: () => <Tab.Pane><ToolsKeys {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_state'),
        render: () => <Tab.Pane><ToolsState {...this.props} /></Tab.Pane>,
      }
    ];
    return (
      <Tab
        menu={{
          fluid: true,
          vertical: true,
          secondary: true,
          pointing: true
        }}
        panes={panes}
        defaultActiveIndex={0}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    keys: state.keys,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('tools'),
  connect(mapStateToProps, mapDispatchToProps)
)(ToolsContainer);
