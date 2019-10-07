// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

class GlobalAccountFragmentREXPrice extends PureComponent<Props> {
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
    return (
      <span className={(!rate) ? 'nil' : false}>
        {'In current REX conditions '}
        {formatter.format(amount.toFixed(4))} {symbol}
        {' will rent '}
        {formatter.format(rate.toFixed(4))} {symbol}
        {' worth of '}
        {resource.toUpperCase()}
        {' resources to your account for 30 days.'}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const loaded = !isEmpty(get(state, 'tables.eosio.eosio.rexpool.rows.0'));
  if (!loaded) {
    return ({
      rate: false
    });
  }
  const rows = get(state.tables, 'eosio.eosio.rexpool.rows.0', {});
  const {
    total_rent,
    total_unlent,
  } = rows;
  const amount = parseFloat(ownProps.amount);
  const { resource, symbol } = ownProps;
  const price = parseFloat(total_rent.split(' ')[0]) / parseFloat(total_unlent.split(' ')[0]);
  const rate = amount / price;
  return ({
    amount,
    price,
    rate,
    resource,
    symbol,
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentREXPrice);
