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
      settings,
    } = this.props;
    if (!max) return false;
    let percent = (((max - used) / max) * 100).toFixed(1);
    if (!settings.displayResourcesAvailable) {
      percent = (100 - percent).toFixed(1);
    }
    return (
      <React.Fragment>
        {percent}%
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  return {
    used: get(state.accounts, `${account}.ram_usage`),
    max: get(state.accounts, `${account}.ram_quota`),
    settings: state.settings,
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentRamPercent);
