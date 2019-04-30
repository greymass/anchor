// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty, sum } from 'lodash';

class GlobalAccountFragmentSystemTokenBalance extends PureComponent<Props> {
  render() {
    const {
      lng
    } = this.props;
    let {
      balance,
    } = this.props;
    if (balance === false) return <Icon color="grey" name="clock outline" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 4 });
    return (
      <React.Fragment>
        {formatter.format(balance.toFixed(4))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const loaded = !isEmpty(get(state, `balances.${ownProps.account}`));
  const defaultValue = loaded ? 0 : false;
  const liquid = get(state, `balances.${ownProps.account}.${ownProps.token}`, defaultValue);
  const path = `accounts.${ownProps.account}.self_delegated_bandwidth`;
  const cpuWeight = String(get(state, `${path}.cpu_weight`, defaultValue));
  const netWeight = String(get(state, `${path}.net_weight`, defaultValue));
  if (liquid === false || cpuWeight === false || netWeight === false) {
    return ({
      balance: false
    });
  }
  const delegated = get(state, `accounts.${ownProps.account}.delegated.total`, 0);
  // Get refunding balances for total
  let netRefunding = 0;
  let cpuRefunding = 0;
  const hasRefund = !isEmpty(get(state, `accounts.${ownProps.account}.refund_request`));
  if (hasRefund) {
    netRefunding = get(state, `accounts.${ownProps.account}.refund_request.net_amount`, 0);
    cpuRefunding = get(state, `accounts.${ownProps.account}.refund_request.cpu_amount`, 0);
  }
  return ({
    balance: sum([
      parseFloat(liquid),
      parseFloat(delegated),
      parseFloat(cpuWeight),
      parseFloat(netWeight),
      parseFloat(netRefunding),
      parseFloat(cpuRefunding),
    ])
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentSystemTokenBalance);
