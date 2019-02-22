// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentTokenStaked extends PureComponent<Props> {
  render() {
    const {
      balance
    } = this.props;
    return (
      <React.Fragment>
        {balance.toFixed(4)}
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const path = `accounts.${ownProps.account}.self_delegated_bandwidth`;
  const cpuWeight = String(get(state, `${path}.cpu_weight`, '0.0000 TOKEN'))
  const netWeight = String(get(state, `${path}.cpu_weight`, '0.0000 TOKEN'))
  const cpu = parseFloat(cpuWeight.split(' ')[0]);
  const net = parseFloat(netWeight.split(' ')[0]);
  return ({
    balance: cpu + net
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenStaked);
