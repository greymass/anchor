// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentSystemTokenBalance extends PureComponent<Props> {
  render() {
    let {
      balance
    } = this.props;
    if (!balance) {
      balance = 0;
    }
    return (
      <React.Fragment>
        {balance.toFixed(4)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const liquid = get(state, `balances.${ownProps.account}.${ownProps.token}`, 0);
  const cpu = parseFloat(get(state, `accounts.${ownProps.account}.self_delegated_bandwidth.cpu_weight`, '0.0000 TOKEN').split(' ')[0]);
  const net = parseFloat(get(state, `accounts.${ownProps.account}.self_delegated_bandwidth.net_weight`, '0.0000 TOKEN').split(' ')[0]);
  const delegated = get(state, `accounts.${ownProps.account}.delegated.total`, 0);
  return ({
    balance: liquid + cpu + net + delegated
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentSystemTokenBalance);
