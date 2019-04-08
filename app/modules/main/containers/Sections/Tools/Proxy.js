// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsProxyComponent from '../../../../../shared/components/Tools/Proxy';

import * as TableActions from '../../../../../shared/actions/table';
import * as RegProxyActions from '../../../../../shared/actions/system/regproxy';
import * as UnregProxyActions from '../../../../../shared/actions/system/unregproxy';
import * as NavigationActions from '../../../actions/navigation';

class ToolsProxy extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

  render = () => (
    <ToolsProxyComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    allBlockExplorers: state.blockexplorers,
    connection: state.connection,
    contracts: state.contracts,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
    tables: state.tables
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...RegProxyActions,
      ...TableActions,
      ...UnregProxyActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsProxy));
