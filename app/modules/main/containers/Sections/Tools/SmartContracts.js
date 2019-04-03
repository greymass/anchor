// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsSmartContractComponent from '../../../../../shared/components/Contract/Interface/Component';

import * as ContractActions from '../../../../../shared/actions/contracts';
import * as TableActions from '../../../../../shared/actions/table';

class ToolsPermissions extends Component<Props> {
  render = () => (
    <ToolsSmartContractComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    blockExplorers: state.blockExplorers,
    contracts: state.contracts,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ContractActions,
      ...TableActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsPermissions));
