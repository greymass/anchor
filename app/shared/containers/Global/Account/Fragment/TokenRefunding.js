// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
      <React.Fragment>
        {formatter.format(balance.toFixed(precision))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const loaded = !isEmpty(get(state, `accounts.${ownProps.account}`));
  const defaultValue = loaded ? 0 : false;
  let netRefunding = 0;
  let cpuRefunding = 0;
  const hasRefund = !isEmpty(get(state, `accounts.${ownProps.account}.refund_request`));
  if (hasRefund) {
    netRefunding = get(state, `accounts.${ownProps.account}.refund_request.net_amount`, defaultValue);
    cpuRefunding = get(state, `accounts.${ownProps.account}.refund_request.cpu_amount`, defaultValue);
  }
  return {
    balance: parseFloat(netRefunding) + parseFloat(cpuRefunding),
    precision: get(state, `accounts.__contracts.${ownProps.token}.precision.${ownProps.token}`, 4),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenRefunding);
