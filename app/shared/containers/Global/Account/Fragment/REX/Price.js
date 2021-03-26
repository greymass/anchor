// @flow
import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

import { Asset } from '@greymass/eosio';

class GlobalAccountFragmentREXPrice extends PureComponent<Props> {
  render() {
    const {
      amount,
      resource,
      rstate,
      sample,
      symbol,
      unit
    } = this.props;
    if (!rstate || !sample) return <Icon color="grey" name="clock outline" />;
    const cost = rstate.price_per(sample, amount * 1000);
    return (
      <span className={(!cost) ? 'nil' : false}>
        {'Renting '}
        {Number(amount)} {unit}
        {` of ${resource.toUpperCase()} `}
        {(resource === 'cpu') ? 'ms' : 'kb'}
        {' will cost '}
        {String(Asset.from(cost, symbol))}.
      </span>
    );
  }
}

export default compose(withTranslation('global'))(GlobalAccountFragmentREXPrice);
