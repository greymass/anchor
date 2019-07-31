// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

class GlobalAccountFragmentTokenDelegated extends PureComponent<Props> {
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
  return {
    balance: get(state, `accounts.${account}.delegated.total`, false)
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenDelegated);
