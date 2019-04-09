// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsAirgrabsComponent from '../../../../../shared/components/Tools/Airgrabs';

import * as AirgrabActions from '../../../../../shared/actions/system/claimairgrab';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as AppActions from '../../../../../shared/actions/app';

class ToolsAirgrabs extends Component<Props> {
  render = () => (
    <ToolsAirgrabsComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    app: state.app,
    accounts: state.accounts,
    blockExplorers: state.blockexplorers,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AirgrabActions,
      ...AppActions,
      ...SystemStateActions,
      ...TableActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsAirgrabs));
