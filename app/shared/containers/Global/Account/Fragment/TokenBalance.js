// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentTokenBalance extends PureComponent<Props> {
  render() {
    const {
      balance,
      precision,
    } = this.props;
    return (
      <React.Fragment>
        {balance && balance.toFixed(precision)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  balance: get(state, `balances.${ownProps.account}.${ownProps.token}`, 0),
  precision: get(state, `balances.__contracts.${ownProps.token}.precision.${ownProps.token}`, 4),
});

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenBalance);
