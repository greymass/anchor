// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty, sum, sumBy } from 'lodash';

class GlobalAccountFragmentSystemTokenBalance extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
      precision,
    } = this.props;
    if (balance === false) return <Icon color="grey" name="clock outline" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: precision });
    return (
      <span className={(parseFloat(balance, 10) === 0) ? 'nil' : false}>
        {formatter.format(balance.toFixed(precision))}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace(/\./g, '\\.');
  const loaded = !isEmpty(get(state, `balances.${account}`));
  const defaultValue = loaded ? 0 : false;
  const balances = get(state, `balances.${account}`, defaultValue);
  if (!balances) {
    return ({
      balance: false
    });
  }
  const liquid = balances[ownProps.token] || 0;
  const path = `accounts.${account}.self_delegated_bandwidth`;
  const cpuWeight = get(state, `${path}.cpu_weight`, defaultValue);
  const netWeight = get(state, `${path}.net_weight`, defaultValue);
  if (liquid === false && (cpuWeight === false || netWeight === false)) {
    return ({
      balance: false
    });
  }
  const delegated = get(state, `accounts.${account}.delegated.total`, 0);
  // Get refunding balances for total
  let netRefunding = 0;
  let cpuRefunding = 0;
  const hasRefund = !isEmpty(get(state, `accounts.${account}.refund_request`));
  if (hasRefund) {
    netRefunding = get(state, `accounts.${account}.refund_request.net_amount`, 0);
    cpuRefunding = get(state, `accounts.${account}.refund_request.cpu_amount`, 0);
  }
  const rows = get(state, `tables.eosio.eosio.rexbal.${account}.rows`, defaultValue);
  return ({
    balance: sum([
      parseFloat(liquid),
      parseFloat(delegated),
      parseFloat(sumBy(rows, 'vote_stake')),
      parseFloat((cpuWeight) || 0),
      parseFloat((netWeight) || 0),
      parseFloat(netRefunding),
      parseFloat(cpuRefunding),
    ]),
    precision: get(state, `balances.__contracts.${ownProps.token}.precision.${ownProps.token}`, 4),
  });
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentSystemTokenBalance);
