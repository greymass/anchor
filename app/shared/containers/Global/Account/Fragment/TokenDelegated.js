// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentTokenDelegated extends PureComponent<Props> {
  render() {
    const {
      balance
    } = this.props;
    return (
      <React.Fragment>
        {balance.toFixed(4)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  balance: get(state, `accounts.${ownProps.account}.delegated.total`, 0)
});

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenDelegated);
