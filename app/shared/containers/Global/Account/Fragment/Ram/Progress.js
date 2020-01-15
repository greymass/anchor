// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Progress } from 'semantic-ui-react';

class GlobalAccountFragmentResourceProgress extends PureComponent<Props> {
  render() {
    const {
      attached,
      label,
      max,
      size,
      style,
      used,
      settings,
    } = this.props;
    let percent = (((max - used) / max) * 100).toFixed(1);
    if (!settings.displayResourcesAvailable) {
      percent = (100 - percent).toFixed(1);
    }
    return (
      <Progress
        attached={attached}
        indicating={settings.displayResourcesAvailable}
        content={label}
        percent={percent}
        size={size}
        style={style}
      />
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
)(GlobalAccountFragmentResourceProgress);
