// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentRamPercent extends PureComponent<Props> {
  render() {
    const {
      used,
      max,
    } = this.props;
    if (!max) return false;
    return (
      <React.Fragment>
        {(((max - used) / max) * 100).toFixed(1)}%
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  return {
    used: get(state.accounts, `${account}.ram_usage`),
    max: get(state.accounts, `${account}.ram_quota`),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamPercent);
