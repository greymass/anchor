// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ToolsAirgrabsComponent from '../../../../../shared/components/Tools/Airgrabs';

import * as AirgrabActions from '../../../../../shared/actions/system/claimairgrab';
import * as AppActions from '../../../../../shared/actions/app';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as WalletActions from '../../../../../shared/actions/wallet';

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
    balance: state.balance,
    blockExplorers: state.blockexplorers,
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
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
      ...TableActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsAirgrabs));
