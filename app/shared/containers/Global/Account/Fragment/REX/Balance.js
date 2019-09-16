// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty, sum, sumBy } from 'lodash';

class GlobalAccountFragmentREXBalance extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
    } = this.props;
    if (balance === false) return <Icon color="grey" name="clock outline" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 4 });
    return (
      <span className={(parseFloat(balance, 10) === 0) ? 'nil' : false}>
        {formatter.format(balance.toFixed(4))}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  const loaded = !isEmpty(get(state, `tables.eosio.eosio.rexbal.${account}`));
  const defaultValue = loaded ? 0 : false;
  const rows = get(state, `tables.eosio.eosio.rexbal.${account}.rows`, defaultValue);
  return ({
    balance: parseFloat(sumBy(rows, 'vote_stake'))
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentREXBalance);
