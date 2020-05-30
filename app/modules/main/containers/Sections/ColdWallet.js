// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ColdWallet from '../../../../shared/components/ColdWallet/Wallet';
import * as TransactionActions from '../../../../shared/actions/transaction';
import makeGetKeysUnlocked from '../../../../shared/selectors/getKeysUnlocked';

class ColdWalletContainer extends Component<Props> {
  render() {
    return (
      <ColdWallet {...this.props} />
    );
  }
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet,
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...TransactionActions,
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ColdWalletContainer));
