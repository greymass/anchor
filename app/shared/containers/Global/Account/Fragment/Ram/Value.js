// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');
const humanizeDuration = require('humanize-duration')

class GlobalAccountFragmentRamValue extends PureComponent<Props> {
  render() {
    const {
      lng,
      max,
      price,
      settings,
      used,
      precision,
    } = this.props;
    if (!max || !used) return false;
    const percent = (((max - used) / max) * 100).toFixed(1);
    const value = max * price;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: precision });
    const el = (
      <span className={(parseFloat(price, 10) === 0) ? 'nil' : false}>
        {formatter.format(value.toFixed(precision))}
      </span>
    );
    return (
      <React.Fragment>
        {(percent < 5)
          ? (
            <Popup
              content="This resource is running low. Consider buying more RAM in order to increase the capacity of this account."
              trigger={el}
            />
          )
          : el
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace(/\./g, '\\.');
  const { ram } = state.globals;
  if (!ram || Object.keys(ram).length === 0) {
    return {};
  }
  const quoteBalance = get(ram, 'quote_balance', '0');
  const baseBalance = get(ram, 'base_balance', '0');
  if (quoteBalance === null || baseBalance === null) {
    return {};
  }
  const quote = parseFloat(quoteBalance.split(' ')[0]);
  const base = parseFloat(baseBalance.split(' ')[0]);
  return {
    max: get(state.accounts, `${account}.ram_quota`),
    price: (quote / base),
    used: get(state.accounts, `${account}.ram_usage`),
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamValue);
