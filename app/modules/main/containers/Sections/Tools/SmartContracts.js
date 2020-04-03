// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map, mapValues } from 'lodash';

import ToolsSmartContractComponent from '../../../../../shared/components/Contract/Interface/Component';

import * as ContractActions from '../../../../../shared/actions/contracts';
import * as TableActions from '../../../../../shared/actions/table';
import * as SettingsActions from '../../../../../shared/actions/settings';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TransactionActions from '../../../../../shared/actions/transaction';

import EOSContract from '../../../../../shared/utils/EOS/Contract';
import isUnlocked from '../../../../../shared/utils/Anchor/Unlocked';

import * as WalletActions from '../../../../../shared/actions/wallet';

class ToolsPermissions extends Component<Props> {
  render = () => (
    <ToolsSmartContractComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  // Wrap all contracts in the associated helper
  const contracts = mapValues(state.contracts, (contract) =>
    new EOSContract(contract.abi, contract.account_name));
  return {
    blockExplorers: state.blockexplorers[state.connection.chainKey],
    contracts,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction,
    unlocked: isUnlocked(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ContractActions,
      ...SettingsActions,
      ...SystemStateActions,
      ...TableActions,
      ...TransactionActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsPermissions));
