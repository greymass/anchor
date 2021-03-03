// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

class GlobalAccountFragmentPowerUpPrice extends PureComponent<Props> {
  render() {
    const {
      amount,
      rate,
      lng,
      resource,
      symbol,
    } = this.props;
    if (rate === false) return <Icon color="grey" name="clock outline" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 4 });
    const formatter2 = new Intl.NumberFormat(lng, { minimumFractionDigits: 2 });
    return (
      <span className={(!rate) ? 'nil' : false}>
        {'Spending '}
        {formatter.format(amount.toFixed(4))} {symbol}
        {' will rent approximately '}
        {formatter2.format(rate)}{(resource === 'cpu') ? 'ms' : 'kb'}
        {' worth of '}
        {resource.toUpperCase()}
        {' resources to your account for 24 hours.'}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const amount = parseFloat(ownProps.amount);
  const { powerup, resource, symbol } = ownProps;
  const rate = amount / powerup.value;
  return ({
    amount,
    price: powerup,
    rate,
    resource,
    symbol,
  });
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentPowerUpPrice);
