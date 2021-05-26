// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

class GlobalAccountFragmentTokenRefunding extends PureComponent<Props> {
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
  const { resource } = ownProps;
  const loaded = !isEmpty(get(state, `accounts.${account}`));
  const defaultValue = loaded ? 0 : false;
  let netRefunding = 0;
  let cpuRefunding = 0;
  const hasRefund = !isEmpty(get(state, `accounts.${account}.refund_request`));
  if (hasRefund) {
    netRefunding = get(state, `accounts.${account}.refund_request.net_amount`, defaultValue);
    cpuRefunding = get(state, `accounts.${account}.refund_request.cpu_amount`, defaultValue);
  }
  let refunding = 0;
  switch (resource) {
    case 'cpu':
      refunding = parseFloat(cpuRefunding);
      break;
    case 'net':
      refunding = parseFloat(netRefunding);
      break;
    default:
      refunding = parseFloat(netRefunding) + parseFloat(cpuRefunding);
      break;
  }
  return {
    balance: refunding,
    precision: get(state, `accounts.__contracts.${ownProps.token}.precision.${ownProps.token}`, 4),
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenRefunding);
