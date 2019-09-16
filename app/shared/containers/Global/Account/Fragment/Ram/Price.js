// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');
const humanizeDuration = require('humanize-duration')

class GlobalAccountFragmentRamPrice extends PureComponent<Props> {
  render() {
    const {
      lng,
      precision,
      price,
      settings,
    } = this.props;
    if (!price) return false;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: precision });
    return (
      <span className={(parseFloat(price, 10) === 0) ? 'nil' : false}>
        {formatter.format(price.toFixed(precision))}
      </span>
    );
    const el = (
      <span>
        {prettyBytes(used)}
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
  const { ram } = state.globals;
  const quote = parseFloat(get(ram, 'quote_balance', '0').split(' ')[0]);
  const base = parseFloat(get(ram, 'base_balance', '0').split(' ')[0]);
  return {
    price: (quote / base),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamPrice);
