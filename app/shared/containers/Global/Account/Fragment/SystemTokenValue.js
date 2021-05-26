// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty, isObject, sum, sumBy } from 'lodash';

class GlobalAccountFragmentSystemTokenValue extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
    } = this.props;
    if (balance === false) return <Icon color="grey" name="clock outline" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 2 });
    return (
      <span className={(parseFloat(balance, 10) === 0) ? 'nil' : false}>
        ${formatter.format(balance.toFixed(2))}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace(/\./g, '\\.');
  const loaded = isObject(get(state, `balances.${account}`));
  const defaultValue = loaded ? 0 : false;
  const liquid = get(state, `balances.${account}.${ownProps.token}`, defaultValue);
  const path = `accounts.${account}.self_delegated_bandwidth`;
  const cpuWeight = String(get(state, `${path}.cpu_weight`, defaultValue));
  const netWeight = String(get(state, `${path}.net_weight`, defaultValue));
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
  // Sum all tokens
  const tokens = sum([
    parseFloat(liquid),
    parseFloat(delegated),
    parseFloat((cpuWeight) || 0),
    parseFloat((netWeight) || 0),
    parseFloat(netRefunding),
    parseFloat(cpuRefunding),
    parseFloat(sumBy(rows, 'vote_stake')),
  ]);
  // Retrieve price from oracle
  const { settings } = state;
  let pair = 'eosusd';
  switch (settings.chainId) {
    case '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': {
      pair = 'waxpusd';
      break;
    }
    default: {
      break;
    }
  }
  const price = get(state, `globals.pricefeed.${pair}`);
  const balance = (price) ? (price / 10000) * tokens : false;
  return ({
    balance,
  });
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentSystemTokenValue);
