// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
    console.log(percent, max)
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
              content="This specific resource is currently running low. Consider staking more in order to increase the account resources to avoid any potential interruptions in its actions."
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
  const account = ownProps.account.replace('.', '\\.');
  const { ram } = state.globals;
  const quote = parseFloat(get(ram, 'quote_balance', '0').split(' ')[0]);
  const base = parseFloat(get(ram, 'base_balance', '0').split(' ')[0]);
  return {
    max: get(state.accounts, `${account}.ram_quota`),
    price: (quote / base),
    used: get(state.accounts, `${account}.ram_usage`),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamValue);
