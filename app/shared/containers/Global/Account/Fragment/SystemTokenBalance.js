// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

class GlobalAccountFragmentSystemTokenBalance extends PureComponent<Props> {
  render() {
    const {
      lng
    } = this.props;
    let {
      balance,
    } = this.props;
    if (balance === false) return <Icon name="clock" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 4 });
    return (
      <React.Fragment>
        {formatter.format(balance.toFixed(4))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const liquid = get(state, `balances.${ownProps.account}.${ownProps.token}`, false);
  const path = `accounts.${ownProps.account}.self_delegated_bandwidth`;
  const cpuWeight = String(get(state, `${path}.cpu_weight`, false));
  const netWeight = String(get(state, `${path}.net_weight`, false));
  if (liquid === false || cpuWeight === false || netWeight === false) {
    return ({
      balance: false
    });
  }
  const cpu = parseFloat(cpuWeight.split(' ')[0]);
  const net = parseFloat(netWeight.split(' ')[0]);
  const delegated = get(state, `accounts.${ownProps.account}.delegated.total`, 0);
  return ({
    balance: liquid + cpu + net + delegated
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentSystemTokenBalance);
