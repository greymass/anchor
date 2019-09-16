// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

class GlobalAccountFragmentTokenBalance extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
      precision,
    } = this.props;
    if (balance === false) return '...';
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: precision });
    return (
      <span className={(parseFloat(balance, 10) === 0) ? 'nil' : false}>
        {formatter.format(balance.toFixed(precision))}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  const loaded = !isEmpty(get(state, `balances.${account}.${ownProps.token}`));
  const defaultValue = loaded ? 0 : false;
  // Allow override as prop to use formatting
  let balance = get(state, `balances.${account}.${ownProps.token}`, defaultValue);
  if (ownProps.balance) {
    balance = ownProps.balance;
  }
  return {
    balance,
    precision: get(state, `balances.__contracts.${ownProps.token}.precision.${ownProps.token}`, 4),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenBalance);
