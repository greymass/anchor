// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

import { Asset } from '@greymass/eosio';

class GlobalAccountFragmentPowerUpPrice extends PureComponent<Props> {
  render() {
    const {
      amount,
      pstate,
      sample,
      rentBoth,
      resource,
      symbol,
      unit,
    } = this.props;
    if (!pstate || !sample || !amount) return <Icon color="grey" name="clock outline" />;
    const cost = pstate[resource].price_per(sample, amount * 1000);
    return (
      <React.Fragment>
        <p>
          {'Renting '}
          {Number(amount)} {unit}
          {` of ${resource.toUpperCase()} `}
          {' will cost ~'}
          {String(Asset.from(cost, symbol))}.
        </p>
        {(rentBoth)
          ? (
            <p>
              An additional rental of {(resource === 'cpu') ? 'NET' : 'CPU'} will be added at a cost of 0.0001.
            </p>
          )
          : false
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const amount = parseFloat(ownProps.amount);
  const {
    pstate, rentBoth, resource, sample, unit
  } = ownProps;
  return {
    amount,
    pstate,
    rentBoth,
    resource,
    sample,
    unit,
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentPowerUpPrice);
