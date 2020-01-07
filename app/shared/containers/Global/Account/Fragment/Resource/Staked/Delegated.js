// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

class GlobalAccountFragmentResourceDelegated extends PureComponent<Props> {
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
  const staked = get(state, `accounts.${account}.self_delegated_bandwidth`, {});
  const total = get(state, `accounts.${account}.total_resources`, {});
  let balance = 0;

  if (Object.keys(staked).length === 0) {
    return {
      balance,
    };
  }
  switch (ownProps.type) {
    case 'cpu': {
      const stakedCPU = parseFloat(get(staked, 'cpu_weight', '0').split(' ')[0]);
      const totalCPU = parseFloat(get(total, 'cpu_weight', '0').split(' ')[0]);
      balance = totalCPU - stakedCPU;
      break;
    }
    case 'net': {
      const stakedNET = parseFloat(get(staked, 'net_weight', '0').split(' ')[0]);
      const totalNET = parseFloat(get(total, 'net_weight', '0').split(' ')[0]);
      balance = totalNET - stakedNET;
      break;
    }
    default: {
      break;
    }
  }
  return {
    balance,
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourceDelegated);
