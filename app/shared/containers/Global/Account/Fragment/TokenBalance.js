// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountTokenBalance extends PureComponent<Props> {
  render() {
    let {
      balance
    } = this.props;
    const {
      precision,
      token
    } = this.props;
    if (!balance) {
      balance = 0;
    }
    return (
      <React.Fragment>
        {balance.toFixed(precision)} {token}
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  balance: get(state, `balances.${ownProps.account}.${ownProps.token}`),
  contract: get(state, `balances.__contracts.${ownProps.token}.contract`),
  precision: get(state, `balances.__contracts.${ownProps.token}.precision.${ownProps.token}`),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // ...WalletActions,
      // ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountTokenBalance);
