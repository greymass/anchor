// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsAirgrabsComponent from '../../../../../shared/components/Tools/Airgrabs';

import * as AirgrabActions from '../../../../../shared/actions/system/claimairgrab';
import * as AppActions from '../../../../../shared/actions/app';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsAirgrabs extends Component<Props> {
  render = () => (
    <ToolsAirgrabsComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    app: state.app,
    accounts: state.accounts,
    balance: state.balance,
    blockExplorers: state.blockexplorers,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    validate: state.validate,
    wallet: state.wallet
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AirgrabActions,
      ...AppActions,
      ...SystemStateActions,
      ...TableActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsAirgrabs));
