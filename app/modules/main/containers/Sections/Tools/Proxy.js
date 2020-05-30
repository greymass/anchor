// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsProxyComponent from '../../../../../shared/components/Tools/Proxy';

import * as TableActions from '../../../../../shared/actions/table';
import * as RegProxyActions from '../../../../../shared/actions/system/regproxy';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as UnregProxyActions from '../../../../../shared/actions/system/unregproxy';
import * as RegProxyInfoActions from '../../../../../shared/actions/system/community/regproxyinfo';
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsProxy extends Component<Props> {
  render = () => (
    <ToolsProxyComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    accounts: state.accounts,
    allBlockExplorers: state.blockexplorers,
    connection: state.connection,
    contracts: state.contracts,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
    tables: state.tables,
  });
  return mapStateToProps;
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...RegProxyActions,
      ...RegProxyInfoActions,
      ...SystemStateActions,
      ...TableActions,
      ...UnregProxyActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsProxy));
