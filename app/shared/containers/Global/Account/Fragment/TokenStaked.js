// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

class GlobalAccountFragmentTokenStaked extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
    } = this.props;
    if (balance === false) return <Icon color="grey" name="clock outline" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 4 });
    return (
      <span className={(parseFloat(balance, 10) === 0) ? 'nil' : false}>
        {formatter.format(balance.toFixed(4))}
      </span>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  const path = `accounts.${account}.self_delegated_bandwidth`;
  const cpuWeight = get(state, `${path}.cpu_weight`, false);
  const netWeight = get(state, `${path}.net_weight`, false);
  if (cpuWeight === false || netWeight === false) {
    return ({
      balance: false
    });
  }
  // console.log(account, cpuWeight, netWeight)
  const cpu = parseFloat(cpuWeight.split(' ')[0]);
  const net = parseFloat(netWeight.split(' ')[0]);
  // console.log(cpu, net)
  return ({
    balance: cpu + net
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenStaked);
