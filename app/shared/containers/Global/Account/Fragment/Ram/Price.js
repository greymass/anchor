// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

class GlobalAccountFragmentRamPrice extends PureComponent<Props> {
  render() {
    const {
      lng,
      precision,
      price,
    } = this.props;
    if (!price) return false;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: precision });
    return (
      <span className={(parseFloat(price, 10) === 0) ? 'nil' : false}>
        {formatter.format(price.toFixed(precision))}
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  const { ram } = state.globals;
  try {
    const {
      base_balance,
      quote_balance,
    } = ram
    const quote = parseFloat(quote_balance.split(' ')[0]);
    const base = parseFloat(base_balance.split(' ')[0]);
    return {
      price: (quote / base),
    };
  } catch (e) {
    return {
      price: false
    };
  }
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamPrice);
