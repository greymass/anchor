// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { mapValues } from 'lodash';

import * as ContractsActions from '../../actions/contracts';
import * as SettingsActions from '../../actions/settings';
import * as SystemStateActions from '../../actions/system/systemstate';
import * as TableActions from '../../actions/table';
import * as TransactionActions from '../../actions/transaction';

import ContractInterfaceComponent from '../../components/Contract/Interface/Component';

import EOSContract from '../../utils/EOS/Contract';

class ContractInterfaceContainer extends Component<Props> {
  render = () => <ContractInterfaceComponent {...this.props} />;
}

function mapStateToProps(state) {
  // Wrap all contracts in the associated helper
  const contracts = mapValues(state.contracts, (contract) =>
    new EOSContract(contract.abi, contract.account_name));
  return {
    blockExplorers: state.blockexplorers,
    contracts,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ContractsActions,
      ...SettingsActions,
      ...SystemStateActions,
      ...TableActions,
      ...TransactionActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ContractInterfaceContainer);
